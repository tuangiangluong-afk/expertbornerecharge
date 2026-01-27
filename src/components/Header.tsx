"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import { Phone, Zap } from "lucide-react";

interface HeaderProps {
    isHub?: boolean;
    city?: string | null;
    phoneNumber?: string;
    variant?: "default" | "light" | "transparent";
    themeColor?: 'blue' | 'emerald' | 'amber' | 'purple';
}

export default function Header({
    isHub = false,
    city = null,
    phoneNumber = "01 89 71 30 76",
    variant = "default",
    themeColor = 'blue'
}: HeaderProps) {

    // Color Mapping
    const buttonColors = {
        blue: "bg-blue-600 hover:bg-blue-700 shadow-blue-500/20",
        emerald: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20",
        amber: "bg-amber-600 hover:bg-amber-700 shadow-amber-500/20",
        purple: "bg-purple-600 hover:bg-purple-700 shadow-purple-500/20",
    };

    const btnClass = buttonColors[themeColor] || buttonColors.blue;

    // Background styles
    const bgClass = variant === "transparent"
        ? "bg-transparent border-transparent"
        : variant === "light"
            ? "bg-neutral-900/95 backdrop-blur border-white/10 text-white"
            : "bg-white/95 backdrop-blur border-slate-200 text-slate-900";

    return (
        <nav className={`fixed top-0 z-50 w-full transition-all duration-300 border-b ${bgClass} py-3`}>
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* LOGO */}
                <Logo
                    isHub={isHub}
                    city={city}
                    size="md"
                    variant={variant === "light" ? "light" : "default"}
                    themeColor={themeColor}
                />

                {/* RIGHT ACTIONS */}
                <div className="flex items-center gap-4">
                    {/* Desktop Navigation (Hub Only) */}
                    {isHub && (
                        <div className={`hidden md:flex items-center gap-6 text-sm font-medium ${variant === "light" ? "text-slate-300" : "text-slate-600"}`}>
                            <Link href="/vehicules" className="hover:text-blue-500 transition">Véhicules</Link>
                            <Link href="/guides" className="hover:text-blue-500 transition">Guides</Link>
                            <Link href="/outils/generateur-lettre-syndic" className="hover:text-blue-500 transition">Outils</Link>
                        </div>
                    )}

                    {/* CTA Devis (Replaces Phone) */}
                    <a
                        href="#simulateur"
                        className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white shadow-lg transition transform hover:-translate-y-0.5 ${btnClass}`}
                    >
                        <Zap size={16} fill="currentColor" />
                        <span>Devis Gratuit</span>
                    </a>
                </div>
            </div>
        </nav>
    );
}
