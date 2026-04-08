import { createSupabaseAdmin } from "@/lib/supabase-server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
        .from("leads")
        .select("id, city, postal_code, housing_type, type, notes, price")
        .eq("id", id)
        .single();

    if (error || !data) {
        return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ lead: data });
}
