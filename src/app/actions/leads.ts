"use server";

import { createSupabaseAdmin } from "@/lib/supabase-server";

export async function updateLeadStatus(leadId: string, status: string) {
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
        .from("leads")
        .update({ status })
        .eq("id", leadId)
        .select();

    if (error) {
        console.error("Error updating lead status:", error);
        throw new Error(error.message);
    }

    return data;
}

import { Resend } from 'resend';
import { Database } from "@/types/database.types";

export async function getLeadAssignments(leadId: string) {
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
        .from("lead_assignments")
        .select(`
            *,
            partners (
                name,
                email
            )
        `)
        .eq("lead_id", leadId)
        .order("assigned_at", { ascending: false });

    if (error) throw new Error(error.message);
    return data;
}

export async function assignLeadToPartners(leadId: string, partnerIds: string[]) {
    const supabase = createSupabaseAdmin();

    // 1. Fetch Lead & Partners
    const [leadResult, partnersResult] = await Promise.all([
        supabase.from("leads").select("*").eq("id", leadId).single(),
        supabase.from("partners").select("*").in("id", partnerIds)
    ]);

    if (leadResult.error) throw new Error("Lead introuvable");
    if (partnersResult.error) throw new Error("Partenaires introuvables");

    const lead = leadResult.data;
    const partners = partnersResult.data;

    const apiKey = process.env.RESEND_API_KEY;
    const resend = apiKey ? new Resend(apiKey) : null;

    const results = [];

    // 2. Loop through partners to assign
    for (const partner of partners) {
        // A. Insert Assignment Record
        const { error: assignError } = await supabase
            .from("lead_assignments")
            .insert({
                lead_id: leadId,
                partner_id: partner.id,
                status: 'sent'
            });

        if (assignError) {
            console.error(`Failed to assign lead ${leadId} to ${partner.name}`, assignError);
            continue;
        }

        // B. Send Email
        if (resend && partner.email) {
            try {
                // Parse existing meta for solar flag
                let meta: any = {};
                try {
                    if (lead.message) meta = JSON.parse(lead.message);
                } catch (e) { }

                await resend.emails.send({
                    from: 'Expert Borne Recharge <contact@expertbornerecharge.com>',
                    to: [partner.email],
                    subject: `🚀 Nouveau Lead Attribué : ${lead.name} (${lead.city})`,
                    html: `
                        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                            <h1 style="color: #2563eb;">Nouveau Lead Client</h1>
                            <p>Bonjour ${partner.name},</p>
                            <p>Nous sommes heureux de vous attribuer un nouveau prospect qualifié.</p>
                            
                            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin: 20px 0;">
                                <h2 style="margin-top: 0; color: #1e293b;">Détails du Contact</h2>
                                <ul style="list-style: none; padding: 0;">
                                    <li style="margin-bottom: 10px;">👤 <strong>Nom :</strong> ${lead.name}</li>
                                    <li style="margin-bottom: 10px;">📧 <strong>Email :</strong> <a href="mailto:${lead.email}">${lead.email}</a></li>
                                    <li style="margin-bottom: 10px;">📞 <strong>Téléphone :</strong> <a href="tel:${lead.phone}">${lead.phone}</a></li>
                                    <li style="margin-bottom: 10px;">📍 <strong>Ville :</strong> ${lead.city} ${lead.postal_code || ''}</li>
                                </ul>
                                
                                <h2 style="color: #1e293b; margin-top: 20px;">Détails du Projet</h2>
                                <ul style="list-style: none; padding: 0;">
                                    <li style="margin-bottom: 10px;">🏠 <strong>Type :</strong> ${lead.housing_type || lead.type}</li>
                                    ${meta.owner_status ? `<li style="margin-bottom: 10px;">🔑 <strong>Statut :</strong> ${meta.owner_status}</li>` : ''}
                                    ${meta.vehicle_status ? `<li style="margin-bottom: 10px;">🚗 <strong>Véhicule :</strong> ${meta.vehicle_status}</li>` : ''}
                                    ${meta.meter_distance ? `<li style="margin-bottom: 10px;">📏 <strong>Distance Compteur :</strong> ${meta.meter_distance}</li>` : ''}
                                    ${meta.solar_interest ? '<li style="color: #b45309; background-color: #fffbeb; padding: 5px; display: inline-block; border-radius: 4px;">☀️ <strong>Intéressé par le Solaire</strong></li>' : ''}
                                </ul>
                            </div>
        
                            <p>Merci de contacter ce prospect sous 24h pour maximiser vos chances de conversion.</p>
                            <p>Cordialement,<br>L'équipe Expert Borne Recharge</p>
                        </div>
                    `
                });
                results.push({ partner: partner.name, status: 'success' });
            } catch (emailError) {
                console.error(`Failed to send email to ${partner.email}`, emailError);
                results.push({ partner: partner.name, status: 'email_failed' });
            }
        }
    }

    // 3. Update Lead Status (if at least one success)
    if (results.length > 0) {
        await supabase
            .from("leads")
            .update({ status: 'sold' })
            .eq("id", leadId);
    }

    return results;
}
