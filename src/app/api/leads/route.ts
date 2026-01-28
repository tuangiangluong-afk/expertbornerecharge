
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createSupabaseAdmin } from '@/lib/supabase-server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        console.log("📥 [API/LEADS] Received body:", body);
        const { name, email, phone, city, domain, projectType, ownerStatus, vehicleStatus, meterDistance, solarInterest } = body;

        // Validation basique
        if (!name || !email || !phone) {
            return NextResponse.json(
                { error: 'Champs obligatoires manquants' },
                { status: 400 }
            );
        }

        // Si pas de clé API, on simule le succès (pour éviter de casser le dev)
        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            console.log("⚠️ [MOCK] Email sent (No API Key):", body);
            return NextResponse.json({ success: true, message: 'Simulation envoi email' });
        }

        // Initialize Resend ONLY if key exists (runtime)
        const resend = new Resend(apiKey);

        // 1. SAVE TO DATABASE (Supabase)
        // Mapping to existing DB Schema
        const metadata = {
            owner_status: ownerStatus,
            vehicle_status: vehicleStatus,
            meter_distance: meterDistance,
            solar_interest: solarInterest,
            source: 'website'
        };

        const supabase = createSupabaseAdmin();
        const { error: dbError } = await supabase
            .from('leads')
            .insert({
                name,
                email,
                phone,
                city,
                tenant_id: domain, // Mapping domain to tenant_id
                type: 'website_lead', // Mandatory field
                housing_type: projectType, // Mapping project_type
                status: 'new',
                message: JSON.stringify(metadata, null, 2) // Serialize extra fields
            });

        if (dbError) {
            console.error('Supabase DB Error:', dbError);
            // Optionally: return db error if you want to be strict
            // return NextResponse.json({ error: `Erreur base de données: ${dbError.message}` }, { status: 500 });
        }

        // 2. SEND EMAIL (Resend)
        console.log("📨 [API/LEADS] Sending email via Resend...");
        try {
            const { data, error } = await resend.emails.send({
                from: 'Expert Borne Recharge <contact@expertbornerecharge.com>',
                to: ['hello@expertbornerecharge.com'],
                subject: `🔥 Nouveau Lead ${solarInterest ? '+ SOLAIRE ☀️' : ''} [${city}] - ${name}`,
                html: `
                    <h1>Nouveau Lead Entrant</h1>
                    <p><strong>Source :</strong> ${domain} (${city})</p>
                    
                    ${solarInterest ? `
                    <div style="background-color: #fffbeb; border: 1px solid #fcd34d; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                        <h2 style="color: #b45309; margin-top: 0;">☀️ Intéressé par le Solaire !</h2>
                        <p style="margin-bottom: 0;">Ce client souhaite une étude pour des panneaux solaires / carport.</p>
                    </div>
                    ` : ''}

                    <h2>Contact</h2>
                    <ul>
                        <li><strong>Nom :</strong> ${name}</li>
                        <li><strong>Email :</strong> ${email}</li>
                        <li><strong>Téléphone :</strong> ${phone}</li>
                    </ul>

                    <h2>Projet</h2>
                    <ul>
                        <li><strong>Type :</strong> ${projectType}</li>
                        <li><strong>Statut Propriétaire :</strong> ${ownerStatus}</li>
                        <li><strong>Véhicule :</strong> ${vehicleStatus}</li>
                        <li><strong>Distance Compteur :</strong> ${meterDistance}</li>
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
