"use server";

import { createSupabaseAdmin } from "@/lib/supabase-server";
import { Database } from "@/types/database.types";

export type Partner = Database['public']['Tables']['partners']['Row'];

export async function getPartners() {
    const supabase = createSupabaseAdmin();
    const { data, error } = await supabase
        .from("partners")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return data;
}

export async function addPartner(formData: FormData) {
    const supabase = createSupabaseAdmin();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const company = formData.get("company") as string;

    if (!name || !email) throw new Error("Nom et Email obligatoires");

    const { data, error } = await supabase
        .from("partners")
        .insert({
            name,
            email,
            phone,
            company_info: { company_name: company }
        })
        .select()
        .single();

    if (error) throw new Error(error.message);
    return data;
}
