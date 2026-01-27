
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, city, domain, projectType, ownerStatus, vehicleStatus, meterDistance } = body;

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

        // Envoi via Resend
        const { data, error } = await resend.emails.send({
            from: 'Expert Borne Recharge <onboarding@resend.dev>', // Il faudra valider un domaine plus tard
            to: ['hello@expertbornerecharge.com'],
            subject: `🔥 Nouveau Lead [${city}] - ${name}`,
            html: `
                <h1>Nouveau Lead Entrant</h1>
                <p><strong>Source :</strong> ${domain} (${city})</p>
                
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
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });

    } catch (e) {
        console.error('API Error:', e);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
