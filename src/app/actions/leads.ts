"use server";

import { createSupabaseAdmin, createSupabaseServerClient } from "@/lib/supabase-server";
import { Resend } from 'resend';

async function requireAuth() {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");
    return user;
}

export async function updateLeadStatus(leadId: string, status: string) {
    await requireAuth();
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

export async function updateLeadDetails(leadId: string, updates: { notes?: string, price?: number, status?: string, is_paid?: boolean }) {
    await requireAuth();
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
        .from("leads")
        .update(updates)
        .eq("id", leadId)
        .select();

    if (error) {
        console.error("Error updating lead details:", error);
        throw new Error(error.message);
    }

    return data;
}

export async function getLeadAssignments(leadId: string) {
    await requireAuth();
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

export async function assignLeadToPartners(
    leadId: string,
    partnerIds: string[],
    options?: { isFree?: boolean; notes?: string; price?: number }
) {
    await requireAuth();
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

    const isFree = options?.isFree ?? false;
    const notesToUse = options?.notes !== undefined ? options.notes : (lead.notes || "");
    const priceToUse = isFree ? 0 : (options?.price !== undefined ? options.price : (lead.price ?? 20));

    // Update lead details in database
    await supabase.from("leads").update({
        notes: notesToUse,
        price: priceToUse,
        status: 'sold',
        ...(isFree && { is_paid: true })
    }).eq("id", leadId);

    const apiKey = process.env.RESEND_API_KEY;
    const resend = apiKey ? new Resend(apiKey) : null;
    const results = [];

    // Parse metadata
    let meta: any = {};
    try {
        if (lead.message) meta = JSON.parse(lead.message);
    } catch (e) { }

    const isB2B = lead.type === 'b2b_lead' || meta.lead_segment === 'B2B';
    const housingLabel = lead.housing_type === 'copro'
        ? 'Copropriété'
        : (lead.housing_type === 'entreprise' ? 'Entreprise / Tertiaire' : 'Maison individuelle');

    const ownerLabel = meta.owner_status === 'proprietaire'
        ? 'Propriétaire'
        : (meta.owner_status === 'locataire' ? 'Locataire' : meta.owner_status);

    const vehicleLabel = meta.vehicle_status === 'deja_equipe'
        ? 'Déjà possédé'
        : (meta.vehicle_status === 'commande' ? 'Commandé (Livraison imminente)' : (meta.vehicle_status === 'en_reflexion' ? 'En réflexion' : meta.vehicle_status));

    const distanceLabel = meta.meter_distance === 'moins10m'
        ? 'Moins de 10 mètres'
        : (meta.meter_distance === '10a20m' ? '10 à 20 mètres' : (meta.meter_distance === 'plus20m' ? 'Plus de 20 mètres' : meta.meter_distance));

    // 2. Loop through partners to assign
    for (const partner of partners) {
        // A. Insert or update Assignment Record
        const { data: existingAssignment } = await supabase
            .from("lead_assignments")
            .select("id")
            .eq("lead_id", leadId)
            .eq("partner_id", partner.id)
            .single();

        if (existingAssignment) {
            await supabase
                .from("lead_assignments")
                .update({ status: isFree ? 'paid' : 'sent' })
                .eq("id", existingAssignment.id);
        } else {
            const { error: assignError } = await supabase
                .from("lead_assignments")
                .insert({
                    lead_id: leadId,
                    partner_id: partner.id,
                    status: isFree ? 'paid' : 'sent'
                });

            if (assignError) {
                console.error(`Failed to assign lead ${leadId} to ${partner.name}`, assignError);
                continue;
            }
        }

        // B. Send Email
        if (resend && partner.email) {
            try {
                if (isFree) {
                    // 🎁 GRATUIT / OFFERT : Send ALL lead details (STRICTLY EXCLUDING traffic attribution)
                    await resend.emails.send({
                        from: 'Expert Borne Recharge <contact@expertbornerecharge.com>',
                        to: [partner.email],
                        subject: `🎁 Nouveau Lead Offert : ${lead.name} (${lead.city || lead.postal_code})`,
                        html: `
                            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 620px; margin: 0 auto; color: #1e293b; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden;">
                                <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 32px 24px; text-align: center;">
                                    <div style="font-size: 36px; margin-bottom: 8px;">🎁</div>
                                    <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.02em;">Nouveau Lead Offert</h1>
                                    <p style="margin: 8px 0 0; opacity: 0.95; font-size: 15px;">Coordonnées complètes immédiatement disponibles (0€)</p>
                                </div>

                                <div style="padding: 28px 24px;">
                                    <p style="font-size: 16px; margin-top: 0;">Bonjour <strong>${partner.name}</strong>,</p>
                                    <p style="font-size: 15px; color: #475569; line-height: 1.5;">
                                        Un nouveau projet d'installation de borne de recharge sur votre secteur vous est <strong>gracieusement offert</strong> par l'équipe Expert Borne Recharge.
                                    </p>

                                    <!-- COORDONNEES CLIENT -->
                                    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #10b981; border-radius: 10px; padding: 20px; margin: 24px 0;">
                                        <h2 style="margin: 0 0 14px; font-size: 16px; color: #0f172a; text-transform: uppercase; letter-spacing: 0.05em;">
                                            👤 Coordonnées du Client
                                        </h2>
                                        <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
                                            <tr>
                                                <td style="padding: 6px 0; width: 130px; font-weight: 600; color: #64748b;">Nom complet :</td>
                                                <td style="padding: 6px 0; font-weight: 700; color: #0f172a;">${lead.name}</td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 6px 0; font-weight: 600; color: #64748b;">Téléphone :</td>
                                                <td style="padding: 6px 0;">
                                                    <a href="tel:${lead.phone}" style="color: #059669; font-weight: 700; text-decoration: none; font-size: 16px;">
                                                        📞 ${lead.phone}
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 6px 0; font-weight: 600; color: #64748b;">Email :</td>
                                                <td style="padding: 6px 0;">
                                                    <a href="mailto:${lead.email}" style="color: #2563eb; font-weight: 600; text-decoration: none;">
                                                        ✉️ ${lead.email}
                                                    </a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 6px 0; font-weight: 600; color: #64748b;">Localisation :</td>
                                                <td style="padding: 6px 0; font-weight: 600; color: #0f172a;">
                                                    📍 ${lead.city || ''} ${lead.postal_code ? `(${lead.postal_code})` : ''} ${lead.department ? `[Dép. ${lead.department}]` : ''}
                                                </td>
                                            </tr>
                                        </table>
                                    </div>

                                    <!-- DETAILS DU PROJET -->
                                    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #3b82f6; border-radius: 10px; padding: 20px; margin: 24px 0;">
                                        <h2 style="margin: 0 0 14px; font-size: 16px; color: #0f172a; text-transform: uppercase; letter-spacing: 0.05em;">
                                            🏠 Détails du Projet
                                        </h2>
                                        <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #334155;">
                                            <tr>
                                                <td style="padding: 6px 0; width: 160px; font-weight: 600; color: #64748b;">Type de logement :</td>
                                                <td style="padding: 6px 0; font-weight: 600;">${housingLabel}</td>
                                            </tr>
                                            ${ownerLabel ? `
                                            <tr>
                                                <td style="padding: 6px 0; font-weight: 600; color: #64748b;">Statut :</td>
                                                <td style="padding: 6px 0;">${ownerLabel}</td>
                                            </tr>` : ''}
                                            ${vehicleLabel ? `
                                            <tr>
                                                <td style="padding: 6px 0; font-weight: 600; color: #64748b;">Véhicule électrique :</td>
                                                <td style="padding: 6px 0;">${vehicleLabel}</td>
                                            </tr>` : ''}
                                            ${distanceLabel ? `
                                            <tr>
                                                <td style="padding: 6px 0; font-weight: 600; color: #64748b;">Distance compteur :</td>
                                                <td style="padding: 6px 0;">${distanceLabel}</td>
                                            </tr>` : ''}
                                            ${meta.solar_interest ? `
                                            <tr>
                                                <td style="padding: 6px 0; font-weight: 600; color: #b45309;">Option Solaire :</td>
                                                <td style="padding: 6px 0; font-weight: 700; color: #b45309;">☀️ Intéressé par couplage Panneaux Solaires / Carport</td>
                                            </tr>` : ''}
                                            ${isB2B && meta.company ? `
                                            <tr>
                                                <td style="padding: 6px 0; font-weight: 600; color: #64748b;">Entreprise / Copro :</td>
                                                <td style="padding: 6px 0; font-weight: 700;">${meta.company}</td>
                                            </tr>` : ''}
                                            ${isB2B && meta.parking_size ? `
                                            <tr>
                                                <td style="padding: 6px 0; font-weight: 600; color: #64748b;">Taille parking :</td>
                                                <td style="padding: 6px 0;">${meta.parking_size}</td>
                                            </tr>` : ''}
                                            ${isB2B && meta.timeline ? `
                                            <tr>
                                                <td style="padding: 6px 0; font-weight: 600; color: #64748b;">Calendrier :</td>
                                                <td style="padding: 6px 0;">${meta.timeline}</td>
                                            </tr>` : ''}
                                            ${notesToUse ? `
                                            <tr>
                                                <td style="padding: 8px 0; font-weight: 600; color: #64748b; vertical-align: top;">Note Admin :</td>
                                                <td style="padding: 8px 0; font-style: italic; color: #1e293b; background: #ffffff; border-radius: 6px; padding-left: 8px;">"${notesToUse}"</td>
                                            </tr>` : ''}
                                        </table>
                                    </div>

                                    <!-- ACTION / RECOMMANDATION -->
                                    <div style="background-color: #ecfdf5; border: 1px solid #a7f3d0; padding: 18px 20px; border-radius: 10px; margin: 24px 0; text-align: center;">
                                        <p style="margin: 0 0 12px; font-weight: 700; color: #065f46; font-size: 15px;">
                                            ⚡ Conseil : Contactez ce client au plus vite pour maximiser vos chances de signer le chantier.
                                        </p>
                                        <a href="tel:${lead.phone}" style="display: inline-block; background-color: #059669; color: white; padding: 12px 28px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 15px;">
                                            Appeler le client (${lead.phone})
                                        </a>
                                    </div>

                                    <p style="text-align: center; margin: 20px 0 0; font-size: 13px; color: #94a3b8;">
                                        Fiche en ligne : <a href="https://expertbornerecharge.com/leads/unlock/${lead.id}?partnerId=${partner.id}" style="color: #64748b; text-decoration: underline;">Voir la fiche débloquée</a>
                                    </p>
                                </div>
                            </div>
                        `
                    });
                } else {
                    // 💰 PAYANT : Standard paid lead notification (unlock via Stripe)
                    await resend.emails.send({
                        from: 'Expert Borne Recharge <contact@expertbornerecharge.com>',
                        to: [partner.email],
                        subject: `🚀 Nouveau Lead Disponible : ${lead.city || lead.postal_code}`,
                        html: `
                            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                                <h1 style="color: #2563eb;">Nouveau Projet à Saisir</h1>
                                <p>Bonjour ${partner.name},</p>
                                <p>Un nouveau lead correspondant à votre secteur vient d'être identifié.</p>
                                
                                <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; margin: 20px 0;">
                                    <h2 style="margin-top: 0; color: #1e293b;">Détails du Projet</h2>
                                    <ul style="list-style: none; padding: 0;">
                                        <li style="margin-bottom: 10px;">📍 <strong>Ville :</strong> ${lead.city} ${lead.postal_code ? `(${lead.postal_code})` : ''}</li>
                                        <li style="margin-bottom: 10px;">🏠 <strong>Type :</strong> ${housingLabel}</li>
                                        ${ownerLabel ? `<li style="margin-bottom: 10px;">🔑 <strong>Statut :</strong> ${ownerLabel}</li>` : ''}
                                        ${vehicleLabel ? `<li style="margin-bottom: 10px;">🚗 <strong>Véhicule :</strong> ${vehicleLabel}</li>` : ''}
                                        ${meta.solar_interest ? '<li style="margin-bottom: 10px; color: #b45309;">☀️ <strong>Intéressé par le Solaire</strong></li>' : ''}
                                        ${notesToUse ? `<li style="margin-bottom: 10px;">📝 <strong>Note :</strong> ${notesToUse}</li>` : ''}
                                    </ul>
                                </div>

                                <p style="text-align: center; margin-top: 30px;">
                                    <a href="https://expertbornerecharge.com/leads/unlock/${lead.id}" 
                                       style="background-color: #2563eb; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
                                       DÉBLOQUER LES COORDONNÉES (${priceToUse}€)
                                    </a>
                                </p>
            
                                <p style="font-size: 14px; color: #64748b; margin-top: 40px; border-top: 1px solid #e2e8f0; padding-top: 20px;">
                                    Une fois le paiement validé, vous recevrez instantanément le nom, l'email et le téléphone du client.
                                </p>
                            </div>
                        `
                    });
                }
                results.push({ partner: partner.name, status: 'success' });
            } catch (emailError) {
                console.error(`Failed to send email to ${partner.email}`, emailError);
                results.push({ partner: partner.name, status: 'email_failed' });
            }
        }
    }

    return results;
}

export async function verifyPartnerEmail(email: string) {
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
        .from("partners")
        .select("id, name, email")
        .ilike("email", email.trim())
        .single();
    
    if (error || !data) return null;
    return data;
}

export async function unlockFreeLead(leadId: string, partnerId: string) {
    const supabase = createSupabaseAdmin();

    // 1. Fetch Lead & Partner
    const [leadRes, partnerRes] = await Promise.all([
        supabase.from("leads").select("*").eq("id", leadId).single(),
        supabase.from("partners").select("*").eq("id", partnerId).single()
    ]);

    if (leadRes.error || !leadRes.data) throw new Error("Lead introuvable");
    if (partnerRes.error || !partnerRes.data) throw new Error("Partenaire introuvable");

    const lead = leadRes.data;
    const partner = partnerRes.data;

    // 2. Mark lead as sold and paid
    await supabase.from("leads").update({ status: 'sold', is_paid: true }).eq("id", leadId);

    // 3. Record or update assignment
    const { data: existingAssign } = await supabase
        .from("lead_assignments")
        .select("id")
        .eq("lead_id", leadId)
        .eq("partner_id", partnerId)
        .single();

    if (existingAssign) {
        await supabase
            .from("lead_assignments")
            .update({ status: 'paid' })
            .eq("id", existingAssign.id);
    } else {
        await supabase
            .from("lead_assignments")
            .insert({
                lead_id: leadId,
                partner_id: partnerId,
                status: 'paid'
            });
    }

    return { success: true };
}

export async function deliverUnlockedLead(leadId: string, partnerId: string) {
    const supabase = createSupabaseAdmin();

    // 1. Fetch Lead & Partner
    const [leadRes, partnerRes] = await Promise.all([
        supabase.from("leads").select("*").eq("id", leadId).single(),
        supabase.from("partners").select("*").eq("id", partnerId).single()
    ]);

    if (leadRes.error || !leadRes.data) throw new Error("Lead not found");
    if (partnerRes.error || !partnerRes.data) throw new Error("Partner not found");

    const lead = leadRes.data;
    const partner = partnerRes.data;

    // 2. Mark as sold and paid
    await supabase.from("leads").update({ status: 'sold', is_paid: true }).eq("id", leadId);

    // 3. Record assignment
    const { data: existingAssign } = await supabase
        .from("lead_assignments")
        .select("id")
        .eq("lead_id", leadId)
        .eq("partner_id", partnerId)
        .single();

    if (existingAssign) {
        await supabase
            .from("lead_assignments")
            .update({ status: 'paid' })
            .eq("id", existingAssign.id);
    } else {
        await supabase.from("lead_assignments").insert({
            lead_id: leadId,
            partner_id: partnerId,
            status: 'paid'
        });
    }

    // 4. Send Email (strictly without traffic attribution)
    const apiKey = process.env.RESEND_API_KEY;
    const resend = apiKey ? new Resend(apiKey) : null;

    if (resend && partner.email) {
        let meta: any = {};
        try {
            if (lead.message) meta = JSON.parse(lead.message);
        } catch (e) { }

        const housingLabel = lead.housing_type === 'copro'
            ? 'Copropriété'
            : (lead.housing_type === 'entreprise' ? 'Entreprise / Tertiaire' : 'Maison individuelle');

        const ownerLabel = meta.owner_status === 'proprietaire'
            ? 'Propriétaire'
            : (meta.owner_status === 'locataire' ? 'Locataire' : meta.owner_status);

        const vehicleLabel = meta.vehicle_status === 'deja_equipe'
            ? 'Déjà possédé'
            : (meta.vehicle_status === 'commande' ? 'Commandé (Livraison imminente)' : (meta.vehicle_status === 'en_reflexion' ? 'En réflexion' : meta.vehicle_status));

        const distanceLabel = meta.meter_distance === 'moins10m'
            ? 'Moins de 10 mètres'
            : (meta.meter_distance === '10a20m' ? '10 à 20 mètres' : (meta.meter_distance === 'plus20m' ? 'Plus de 20 mètres' : meta.meter_distance));

        await resend.emails.send({
            from: 'Expert Borne Recharge <contact@expertbornerecharge.com>',
            to: [partner.email],
            subject: `💰 Lead Débloqué : ${lead.name} (${lead.city || lead.postal_code})`,
            html: `
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 620px; margin: 0 auto; color: #1e293b; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden;">
                    <div style="background-color: #2563eb; color: white; padding: 30px 24px; text-align: center;">
                        <h1 style="margin: 0; font-size: 24px; font-weight: 800;">Paiement Confirmé !</h1>
                        <p style="margin: 8px 0 0; opacity: 0.95; font-size: 15px;">Voici les coordonnées complètes de votre client</p>
                    </div>
                    
                    <div style="padding: 28px 24px;">
                        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #2563eb; border-radius: 10px; padding: 20px; margin-bottom: 24px;">
                            <h2 style="margin: 0 0 14px; font-size: 16px; color: #0f172a; text-transform: uppercase; letter-spacing: 0.05em;">👤 Coordonnées Client</h2>
                            <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
                                <tr>
                                    <td style="padding: 6px 0; width: 130px; font-weight: 600; color: #64748b;">Nom complet :</td>
                                    <td style="padding: 6px 0; font-weight: 700; color: #0f172a;">${lead.name}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 6px 0; font-weight: 600; color: #64748b;">Téléphone :</td>
                                    <td style="padding: 6px 0;">
                                        <a href="tel:${lead.phone}" style="color: #059669; font-weight: 700; text-decoration: none; font-size: 16px;">
                                            📞 ${lead.phone}
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 6px 0; font-weight: 600; color: #64748b;">Email :</td>
                                    <td style="padding: 6px 0;">
                                        <a href="mailto:${lead.email}" style="color: #2563eb; font-weight: 600; text-decoration: none;">
                                            ✉️ ${lead.email}
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 6px 0; font-weight: 600; color: #64748b;">Localisation :</td>
                                    <td style="padding: 6px 0; font-weight: 600; color: #0f172a;">
                                        📍 ${lead.city || ''} ${lead.postal_code ? `(${lead.postal_code})` : ''}
                                    </td>
                                </tr>
                            </table>
                        </div>
                        
                        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #3b82f6; border-radius: 10px; padding: 20px; margin-bottom: 24px;">
                            <h2 style="margin: 0 0 14px; font-size: 16px; color: #0f172a; text-transform: uppercase; letter-spacing: 0.05em;">🏠 Détails du Projet</h2>
                            <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #334155;">
                                <tr>
                                    <td style="padding: 6px 0; width: 160px; font-weight: 600; color: #64748b;">Type de logement :</td>
                                    <td style="padding: 6px 0; font-weight: 600;">${housingLabel}</td>
                                </tr>
                                ${ownerLabel ? `
                                <tr>
                                    <td style="padding: 6px 0; font-weight: 600; color: #64748b;">Statut :</td>
                                    <td style="padding: 6px 0;">${ownerLabel}</td>
                                </tr>` : ''}
                                ${vehicleLabel ? `
                                <tr>
                                    <td style="padding: 6px 0; font-weight: 600; color: #64748b;">Véhicule :</td>
                                    <td style="padding: 6px 0;">${vehicleLabel}</td>
                                </tr>` : ''}
                                ${distanceLabel ? `
                                <tr>
                                    <td style="padding: 6px 0; font-weight: 600; color: #64748b;">Distance compteur :</td>
                                    <td style="padding: 6px 0;">${distanceLabel}</td>
                                </tr>` : ''}
                                ${meta.solar_interest ? `
                                <tr>
                                    <td style="padding: 6px 0; font-weight: 600; color: #b45309;">Option Solaire :</td>
                                    <td style="padding: 6px 0; font-weight: 700; color: #b45309;">☀️ Client intéressé par couplage Panneaux Solaires</td>
                                </tr>` : ''}
                                ${lead.notes ? `
                                <tr>
                                    <td style="padding: 8px 0; font-weight: 600; color: #64748b; vertical-align: top;">Note Admin :</td>
                                    <td style="padding: 8px 0; font-style: italic; color: #1e293b; background: #ffffff; border-radius: 6px; padding-left: 8px;">"${lead.notes}"</td>
                                </tr>` : ''}
                            </table>
                        </div>

                        <div style="text-align: center; color: #94a3b8; font-size: 12px; border-top: 1px solid #f1f5f9; padding-top: 16px;">
                            Facture Stripe disponible via votre espace de paiement.
                        </div>
                    </div>
                </div>
            `
        });
    }

    return { success: true };
}
