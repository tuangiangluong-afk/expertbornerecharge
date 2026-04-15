
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createSupabaseAdmin } from '@/lib/supabase-server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log("📥 [API/LEADS] Received body:", body);
        const {
            name, email, phone, city, postalCode, domain,
            projectType, ownerStatus, vehicleStatus, meterDistance, solarInterest,
            // B2B fields
            role, parkingSize, timeline, company, leadSegment, leadScore, leadValue
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

            return NextResponse.json({ success: true, data });
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
