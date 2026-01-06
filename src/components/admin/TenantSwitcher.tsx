"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Database } from "@/types/database.types";
import { ChevronDown, MapPin } from "lucide-react";

type Tenant = Database['public']['Tables']['tenants']['Row'];

export function TenantSwitcher() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentTenantId = searchParams.get("tenantId") || "taxiaix"; // Default fallback

    const [tenants, setTenants] = useState<Tenant[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTenants() {
            const { data, error } = await supabase
                .from("tenants")
                .select("*")
                .order("name");

            if (data) setTenants(data);
            setLoading(false);
        }

        fetchTenants();
    }, []);

    const handleSwitch = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newTenantId = e.target.value;
        // Update URL with new tenantId, keeping other params if necessary
        const params = new URLSearchParams(searchParams.toString());
        params.set("tenantId", newTenantId);
        router.push(`?${params.toString()}`);
        // Ideally, we might want to push to the *current* path with the new param, 
        // but Next.js router.push with search params does exactly that if we use the pathname.
        // However, since this component is inside layout, we want to stay on the same page but change context.
        // simpler:
        window.location.search = params.toString(); // Full reload to ensure all data refetches clean
    };

    if (loading) return <span className="text-sm text-gray-400">Loading cities...</span>;

    return (
        <div className="flex items-center gap-2">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                    <MapPin size={16} />
                </div>
                <select
                    value={currentTenantId}
                    onChange={handleSwitch}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 pl-10 p-2.5 appearance-none cursor-pointer hover:bg-white transition"
                >
                    {tenants.map((tenant) => (
                        <option key={tenant.id} value={tenant.id}>
                            {tenant.name} ({tenant.domain})
                        </option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-500">
                    <ChevronDown size={14} />
                </div>
            </div>
        </div>
    );
}
