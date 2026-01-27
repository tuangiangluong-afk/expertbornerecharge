"use client"; // Note: This will be called from a client component, but we should probably use "use server" if we want a real server action.
// Actually, let's use a real Server Action.

import { supabaseBrowser } from "@/lib/supabase-browser";

export async function updateLeadStatus(leadId: string, status: string) {
    const { data, error } = await supabaseBrowser
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
