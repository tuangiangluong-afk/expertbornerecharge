import Image from "next/image";
import Link from "next/link";

interface LogoProps {
    /** City name for satellite sites, null for hub */
    city?: string | null;
    /** Is this the main hub (expertbornerecharge.com)? */
    isHub?: boolean;
    /** Size variant */
    size?: "sm" | "md" | "lg";
    /** Theme variant */
    variant?: "default" | "light";
    /** Theme color (default: blue) */
    themeColor?: 'blue' | 'emerald' | 'amber' | 'purple';
    /** Additional className */
    className?: string;
}

/**
 * Dynamic Logo Component
 * 
 * Hub site: Shows full "Expert Borne Recharge" logo (blue pin with battery)
 * Satellite sites: Shows plug icon + "Expert Borne [City]" as dynamic text
 */
export default function Logo({
    city,
    isHub = false,
    size = "md",
    variant = "default",
    themeColor = 'blue',
    className = ""
}: LogoProps) {
    // Size mappings
    const sizes = {
        sm: { height: 32, text: "text-xl" },
        md: { height: 48, text: "text-2xl" },  // Header default (was 80)
        lg: { height: 64, text: "text-4xl" },
    };

    const s = sizes[size];

    // Color mappings based on theme
    const themeTextColors = {
        blue: "text-[#1A2B4A]",     // Navy
        emerald: "text-emerald-800", // Green
        amber: "text-amber-800",     // Gold/Brownish
        purple: "text-purple-900",   // Deep Purple
    };

    const colors = {
        default: {
            expert: "text-slate-900",
            borne: themeTextColors[themeColor] || themeTextColors.blue,
        },
        light: {
            expert: "text-white",
            borne: "text-white",
        }
    }[variant];

    // Hub site: Show full "Expert Borne Recharge" logo (Text + Icon)
    if (isHub) {
        const isFooter = variant === "light";

        return (
            <Link href="/" className={`flex items-center ${className}`}>
                <Image
                    src="/logo-expertbornerecharge.png"
                    alt="Expert Borne Recharge"
                    width={220}
                    height={s.height * 1.4}
                    className={`h-auto object-contain ${isFooter ? 'brightness-0 invert' : ''}`}
                    style={{ height: s.height * 1.4, width: 'auto' }}
                    priority
                />
            </Link>
        );
    }

    // Satellite sites: New Pin Icon + Dynamic City Name
    return (
        <Link href="/" className={`flex items-center gap-3 ${className}`}>
            {/* Icon: New Pin from User */}
            <Image
                src="/logo-local-pin-v2.png"
                alt="Borne Recharge"
                width={80}
                height={s.height * 1.8}
                className={`h-auto object-contain ${variant === 'light' ? 'brightness-0 invert' : ''}`}
                style={{ height: s.height * 1.8, width: 'auto' }}
                priority
            />

            {/* Dynamic text: Just the City */}
            <div className={`${s.text} font-bold tracking-tight leading-tight`}>
                {city && (
                    <span className={`${colors.borne}`}>{city}</span>
                )}
            </div>
        </Link>
    );
}

/**
 * Simple icon-only version for small spaces (mobile nav, favicon, etc.)
 */
export function LogoIcon({ size = 40, className = "" }: { size?: number; className?: string }) {
    return (
        <Image
            src="/logo-local-icon.png"
            alt="Expert Borne Recharge"
            width={size * 2}
            height={size}
            className={`h-auto object-contain ${className}`}
            style={{ height: size, width: 'auto' }}
            priority
        />
    );
}
