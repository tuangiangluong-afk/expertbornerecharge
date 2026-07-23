
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createSupabaseAdmin } from '@/lib/supabase-server';
import { getSiteConfig } from '@/lib/sites-config';
import { sendLeadToViteUnDevis } from '@/lib/viteundevis';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "127.0.0.1";
        const refererUrl = request.headers.get("referer") || "";
        const consentText = body.consentText || "J'accepte d'être contacté(e) par téléphone par ViteUnDevis.com et ses partenaires certifiés pour la qualification de ma demande de devis et la réalisation d'une étude technique.";
        const consentDate = body.consentDate || new Date().toISOString();
        const consentIp = clientIp;
        const consentUrl = body.consentUrl || refererUrl || "https://" + (body.domain || "expertbornerecharge");
        console.log("📥 [API/LEADS] Received body:", body);
        const {
            name, email, phone, city, postalCode, domain,
            projectType, ownerStatus, vehicleStatus, meterDistance, solarInterest,
            // B2B fields
            role, parkingSize, timeline, company, leadSegment, leadScore, leadValue,
            attribution // Extract attribution object
        } = body;

        // Validation basique
        if (!name || !email || !phone) {
            return NextResponse.json(
                { error: 'Champs obligatoires manquants' },
                { status: 400 }
            );
        }

        const isB2B = leadSegment === 'B2B';

        // Si pas de clé API, on simule le succès (pour éviter de casser le dev)
        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            console.log(`⚠️ [MOCK] ${isB2B ? '🏢 B2B' : '🏠 B2C'} Email sent (No API Key):`, body);
            return NextResponse.json({ success: true, message: 'Simulation envoi email' });
        }

        // Initialize Resend ONLY if key exists (runtime)
        const resend = new Resend(apiKey);

        // 1. SAVE TO DATABASE (Supabase)
        const metadata: Record<string, unknown> = {
            owner_status: ownerStatus,
            vehicle_status: vehicleStatus,
            meter_distance: meterDistance,
            solar_interest: solarInterest,
            source: 'website',
            attribution: attribution || { source: 'direct', medium: 'direct' }, // Store attribution metadata
            // B2B enrichment
            ...(isB2B && {
                lead_segment: 'B2B',
                role,
                parking_size: parkingSize,
                timeline,
                company,
                lead_score: leadScore,
                lead_value: leadValue
            })
        };

        const supabase = createSupabaseAdmin();
        
        // Find region and department from domain
        const siteConfig = getSiteConfig(domain);
        const region = siteConfig?.region || 'National';
        const department = siteConfig?.department || (postalCode ? postalCode.substring(0, 2) : null);

        const { error: dbError } = await supabase
            .from('leads')
            .insert({
                name,
                email,
                phone,
                city,
                postal_code: postalCode,
                tenant_id: domain,
                type: isB2B ? 'b2b_lead' : 'website_lead',
                housing_type: projectType,
                status: 'new',
                region: region,
                department: department,
                message: JSON.stringify(metadata, null, 2)
            });

        if (dbError) {
            console.error('Supabase DB Error:', dbError);
        }

        // 2. SEND EMAIL (Resend)
        console.log(`📨 [API/LEADS] Sending ${isB2B ? 'B2B HIGH TICKET' : 'B2C'} email via Resend...`);

        // B2B role labels
        const ROLE_LABELS: Record<string, string> = {
            syndic: '🏆 Syndic de copropriété',
            conseil_syndical: '👥 Membre Conseil Syndical',
            copro_resident: '🏠 Résident copropriétaire',
            dirigeant: '🏆 Dirigeant / DG',
            facility_manager: '🏢 Facility Manager',
            rse_rh: '📊 RSE / RH',
            salarie: '⚠️ Salarié (faible priorité)'
        };

        const SIZE_LABELS: Record<string, string> = {
            moins10: '< 10 places/véhicules',
            '10a50': '10 à 50 places/véhicules',
            plus50: '50 à 100 places/véhicules',
            plus100: '100+ places/véhicules 🔥'
        };

        const TIMELINE_LABELS: Record<string, string> = {
            urgent: '🔴 URGENT (< 3 mois)',
            trimestre: '🟡 3 à 6 mois',
            annee: '🟢 D\'ici 1 an',
            exploration: '⚪ Exploration'
        };

        try {
            // Build subject line
            const subjectPrefix = isB2B
                ? `🏢💰 LEAD B2B [${leadValue}€]`
                : `🔥 Nouveau Lead ${solarInterest ? '+ SOLAIRE ☀️' : ''}`;
            const subject = `${subjectPrefix} [${postalCode || city}] - ${name}${company ? ` (${company})` : ''}`;

            // Build email HTML
            const b2bSection = isB2B ? `
                <div style="background-color: #ecfdf5; border: 2px solid #10b981; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
                    <h2 style="color: #065f46; margin-top: 0; font-size: 24px;">🏢 LEAD B2B — HIGH TICKET</h2>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; color: #374151;">Valeur estimée</td>
                            <td style="padding: 8px 0; font-size: 20px; font-weight: bold; color: #059669;">${leadValue}€</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; color: #374151;">Score</td>
                            <td style="padding: 8px 0;">${leadScore}/200</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; color: #374151;">Rôle</td>
                            <td style="padding: 8px 0;">${ROLE_LABELS[role] || role}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; color: #374151;">Taille</td>
                            <td style="padding: 8px 0;">${SIZE_LABELS[parkingSize] || parkingSize}</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; color: #374151;">Calendrier</td>
                            <td style="padding: 8px 0;">${TIMELINE_LABELS[timeline] || timeline}</td>
                        </tr>
                        ${company ? `
                        <tr>
                            <td style="padding: 8px 0; font-weight: bold; color: #374151;">Entreprise / Copro</td>
                            <td style="padding: 8px 0;">${company}</td>
                        </tr>
                        ` : ''}
                    </table>
                </div>
            ` : '';

            const solarSection = solarInterest ? `
                <div style="background-color: #fffbeb; border: 1px solid #fcd34d; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                    <h2 style="color: #b45309; margin-top: 0;">☀️ Intéressé par le Solaire !</h2>
                    <p style="margin-bottom: 0;">Ce client souhaite une étude pour des panneaux solaires / carport.</p>
                </div>
            ` : '';

            const { data, error } = await resend.emails.send({
                from: 'Expert Borne Recharge <contact@expertbornerecharge.com>',
                to: ['hello@expertbornerecharge.com'],
                subject,
                html: `
                    <h1>${isB2B ? '🏢 Lead B2B High Ticket' : 'Nouveau Lead Entrant'}</h1>
                    <p><strong>Source :</strong> ${domain} (${city} - ${postalCode || 'N/A'})</p>
                    
                    ${b2bSection}
                    ${solarSection}

                    <h2>Contact</h2>
                    <ul>
                        <li><strong>Nom :</strong> ${name}</li>
                        <li><strong>Email :</strong> ${email}</li>
                        <li><strong>Téléphone :</strong> ${phone}</li>
                        ${company ? `<li><strong>Entreprise / Copro :</strong> ${company}</li>` : ''}
                    </ul>

                    <h2>Attribution du trafic</h2>
                    <ul>
                        <li><strong>Canal (Source / Medium) :</strong> ${attribution?.source || 'direct'} / ${attribution?.medium || 'direct'}</li>
                        ${attribution?.campaign ? `<li><strong>Campagne :</strong> ${attribution.campaign}</li>` : ''}
                        ${attribution?.term ? `<li><strong>Mot-clé (SEA) :</strong> ${attribution.term}</li>` : ''}
                        ${attribution?.landing_page ? `<li><strong>Landing Page :</strong> ${attribution.landing_page}</li>` : ''}
                        ${attribution?.referrer ? `<li><strong>Référent :</strong> ${attribution.referrer}</li>` : ''}
                    </ul>

                    <h2>Projet</h2>
                    <ul>
                        <li><strong>Type :</strong> ${projectType}</li>
                        ${!isB2B ? `
                        <li><strong>Statut Propriétaire :</strong> ${ownerStatus}</li>
                        <li><strong>Véhicule :</strong> ${vehicleStatus}</li>
                        <li><strong>Distance Compteur :</strong> ${meterDistance}</li>
                        ` : ''}
                    </ul>
                `,
            });

            if (error) {
                console.error('Resend Error:', error);
                return NextResponse.json({ error: `Erreur Resend: ${error.message}` }, { status: 500 });
            }

            // 3. SEND LEAD TO VITEUNDEVIS
            let vudResult = null;
            console.log("📡 [API/LEADS] Routing lead to ViteUnDevis...");

            // Auto test category override for postal code 33260 (La Teste de Buch)
            let catId = '164'; // Default to "Pose de borne de recharge"
            if (postalCode === '33260') {
                catId = '145'; // Map to Déménagement for tests
            }

            const nameParts = (name || '').trim().split(/\s+/);
            const prenom = nameParts[0] || 'Client';
            const nom = nameParts.slice(1).join(' ') || 'Inconnu';

            let tp = 1; // 1: Particulier
            let typeBien = 2; // 2: Maison
            let situation = 1; // 1: Propriétaire
            let delais = 2; // 2: Dans les 6 mois
            let description = '';

            if (isB2B) {
                // Map B2B roles to ViteUnDevis profile (tp)
                // 1: Particulier, 2: Pro, 3: Syndicat, 4: Autre
                if (role === 'syndic' || role === 'conseil_syndical') {
                    tp = 3; // Syndicat
                } else if (role === 'dirigeant' || role === 'facility_manager' || role === 'rse_rh') {
                    tp = 2; // Pro
                } else {
                    tp = 1; // Particulier (copro_resident, salarie)
                }

                // Map B2B types to type_bien
                // 1: Appt, 2: Maison, 3: Immeuble, 4: Bureau
                if (projectType === 'copro' || role === 'copro_resident' || role === 'syndic' || role === 'conseil_syndical') {
                    typeBien = 3; // Immeuble / Copro
                } else {
                    typeBien = 4; // Bureau / Entreprise
                }

                situation = 1; // Propriétaire par défaut pour B2B
                delais = timeline === 'urgent' ? 1 : 2;

                const parkingLabel = SIZE_LABELS[parkingSize] || parkingSize || 'non spécifié';
                const roleLabel = ROLE_LABELS[role] || role || 'non spécifié';
                const timelineLabel = TIMELINE_LABELS[timeline] || timeline || 'non spécifié';

                description = `Projet d'installation de borne(s) en Copropriété / Entreprise (${company || 'Horizon'}). Rôle du contact : ${roleLabel}. Taille du parking/flotte : ${parkingLabel}. Calendrier du projet : ${timelineLabel}. Potentiel élevé, client attend un contact rapide pour étude de faisabilité et devis.`;
            } else {
                tp = 1; // Particulier
                typeBien = projectType === 'copro' ? 1 : 2; // 1: Appt (pour copro B2C), 2: Maison
                situation = ownerStatus === 'proprietaire' ? 1 : ownerStatus === 'locataire' ? 2 : 4;
                delais = 2; // Dans les 6 mois
                description = `Projet de pose de borne de recharge. Véhicule : ${vehicleStatus || 'N/A'}. Distance compteur : ${meterDistance || 'N/A'}. Intérêt solaire : ${solarInterest ? 'Oui' : 'Non'}.`;
            }

            const vudPayload = {
                nom,
                prenom,
                email,
                tel: phone,
                cp: postalCode,
                ville: city,
                cp_projet: postalCode,
                ville_projet: city,
                pays: 'fr',
                adresse1: 'Adresse non communiquee',
                tp,
                type_bien: typeBien,
                situation,
                delais,
                description,
                cat_id: catId,
                site_name: domain || 'expertbornerecharge.com',
                consent_text: consentText,
                consent_date: consentDate,
                consent_ip: consentIp,
                consent_url: consentUrl
            };

            try {
                vudResult = await sendLeadToViteUnDevis(vudPayload);
            } catch (vudErr) {
                console.error("❌ [API/LEADS] ViteUnDevis post error:", vudErr);
            }

            const vudDetails = vudResult?.devis_data?.devis_id ? {
                devis_id: vudResult.devis_data.devis_id,
                devis_hash: vudResult.devis_data.devis_hash || ''
            } : null;

            return NextResponse.json({ 
                success: true, 
                data,
                vud: vudDetails
            });
        } catch (resendException: any) {
            console.error('Resend Exception:', resendException);
            return NextResponse.json({ error: `Exception Resend: ${resendException.message}` }, { status: 500 });
        }

    } catch (e: any) {
        console.error('API Error:', e);
        return NextResponse.json(
            { error: `Internal Server Error: ${e.message}` },
            { status: 500 }
        );
    }
}
