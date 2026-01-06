"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { LogOut } from "lucide-react";

export function LogoutButton() {
    const router = useRouter();

    async function handleLogout() {
        await supabase.auth.signOut();
        router.push("/login");
        router.refresh();
    }

    return (
        <button
            onClick={handleLogout}
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition"
            title="Se déconnecter"
        >
            <LogOut size={18} />
        </button>
    );
}
