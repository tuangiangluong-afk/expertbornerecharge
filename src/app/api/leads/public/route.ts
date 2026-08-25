import { createSupabaseAdmin } from "@/lib/supabase-server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const partnerId = searchParams.get("partnerId");

    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    const supabase = createSupabaseAdmin();
    
    // 1. Fetch lead from database
    const { data: lead, error } = await supabase
        .from("leads")
        .select("*")
        .eq("id", id)
        .single();

    if (error || !lead) {
        return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    // Helper: sanitize message so attribution is NEVER sent in public responses
    const sanitizeLead = (l: any) => {
        let meta: any = {};
        try {
            if (l.message) meta = JSON.parse(l.message);
        } catch (e) { }
        
        // Strip out sensitive traffic attribution
        delete meta.attribution;
        delete meta.source;

        return {
            ...l,
            message: JSON.stringify(meta)
        };
    };

    // 2. If partnerId is provided, check if assignment exists and is paid/unlocked
    if (partnerId) {
        const { data: assignment } = await supabase
            .from("lead_assignments")
            .select("*")
            .eq("lead_id", id)
            .eq("partner_id", partnerId)
            .single();

        if (assignment && (assignment.status === 'paid' || assignment.status === 'free' || lead.price === 0 || lead.is_paid === true)) {
            return NextResponse.json({ lead: sanitizeLead(lead), isUnlocked: true });
        }
    }

    // 3. If the lead itself is already unlocked / free / paid globally and has partnerId
    if (lead.price === 0 && partnerId) {
        return NextResponse.json({ lead: sanitizeLead(lead), isUnlocked: true });
    }

    // Public locked view: only return safe non-identifying fields
    const publicLead = {
        id: lead.id,
        city: lead.city,
        postal_code: lead.postal_code,
        housing_type: lead.housing_type,
        type: lead.type,
        notes: lead.notes,
        price: lead.price ?? 20,
        status: lead.status,
        is_paid: lead.is_paid
    };

    return NextResponse.json({ lead: publicLead, isUnlocked: false });
}
