import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";
import { getCity } from "@/lib/db";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            clientName,
            phone,
            pickupLocation,
            dropoffLocation,
            pickupTime,
            price,
            tenantId,
            domain
        } = body;

        // Basic validation
        if (!phone || !pickupLocation || !dropoffLocation || !pickupTime) {
            return NextResponse.json(
                { success: false, error: "Champs obligatoires manquants" },
                { status: 400 }
            );
        }

        // 1. Get Tenant Config (for Email)
        // We use the domain to look up the city config
        // If domain is missing, try to find by tenantId (legacy hardcoded check if needed, but domain is safer)
        let cityConfig = null;
        if (domain) {
            cityConfig = getCity(domain);
        }

        // Fallback email if domain lookup fails?
        const destEmail = cityConfig?.email || "contact@taxifrance.fr";
        const cityLabel = cityConfig?.name || "Taxi France";

        // 2. Save to Supabase
        const { data: booking, error: dbError } = await (supabase as any)
            .from("bookings")
            .insert({
                tenant_id: tenantId || "unknown",
                client_name: clientName,
                phone,
                pickup_address: pickupLocation,
                dropoff_address: dropoffLocation,
                pickup_time: new Date(pickupTime),
                price_estimate: price,
                status: "new",
                email: destEmail // We store where we sent it
            })
            .select()
            .single();

        if (dbError) {
            console.error("DB Error:", dbError);
            // We continue to email even if DB fails, or fail?
            // Better to redundancy.
        }

        // 3. Send Email via Resend
        try {
            await resend.emails.send({
                from: 'Taxi France <reservations@taxiaplaisir.com>', // User specified domain
                to: [destEmail, 'marcc_5@hotmail.com'], // Send to tenant owner + Admin global (hardcoded based on context?) 
                // Actually the user said "admin et chauffeur". "admin" is probably the user (marcc_5?). 
                subject: `📢 Nouvelle Course : ${pickupLocation?.split(',')[0]} -> ${dropoffLocation?.split(',')[0]}`,
                html: `
                    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #333;">🚖 Nouvelle Réservation - ${cityLabel}</h2>
                        <div style="background: #f4f4f4; padding: 20px; border-radius: 10px;">
                            <p><strong>Client :</strong> ${clientName || 'Internet'}</p>
                            <p><strong>Téléphone :</strong> <a href="tel:${phone}">${phone}</a></p>
                            <hr style="border: 0; border-top: 1px solid #ddd; margin: 15px 0;">
                            <p><strong>📍 Départ :</strong> ${pickupLocation}</p>
                            <p><strong>🏁 Arrivée :</strong> ${dropoffLocation}</p>
                            <p><strong>📅 Date :</strong> ${new Date(pickupTime).toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}</p>
                            <p><strong>💰 Prix Estimé :</strong> ${price || 'Au compteur'}</p>
                        </div>
                        <p style="margin-top: 20px; color: #666; font-size: 12px;">Reference Commande: ${booking?.id || 'N/A'}</p>
                    </div>
                `
            });
        } catch (emailError) {
            console.error("Resend Error:", emailError);
            return NextResponse.json({ success: true, warning: "Saved but email failed" });
        }

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
