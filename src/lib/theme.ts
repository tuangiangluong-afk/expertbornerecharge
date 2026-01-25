
// Deterministically assign a color theme based on the city slug
// We only use premium, high-contrast colors suitable for transport/logistics

export const THEMES = [
    {
        name: 'amber',
        primary: 'yellow',
        text: 'text-neutral-900',
        classes: {
            bg: 'bg-yellow-400',
            bgHover: 'hover:bg-yellow-300',
            text: 'text-yellow-400',
            border: 'border-yellow-400/30',
            shadow: 'shadow-yellow-400/20',
            gradientFrom: 'from-yellow-400',
            gradientTo: 'to-yellow-500'
        }
    },
    {
        name: 'emerald',
        primary: 'emerald',
        text: 'text-white',
        classes: {
            bg: 'bg-emerald-600',
            bgHover: 'hover:bg-emerald-500',
            text: 'text-emerald-400',
            border: 'border-emerald-400/30',
            shadow: 'shadow-emerald-400/20',
            gradientFrom: 'from-emerald-600',
            gradientTo: 'to-emerald-500'
        }
    },
    {
        name: 'blue',
        primary: 'blue',
        text: 'text-white',
        classes: {
            bg: 'bg-blue-700',
            bgHover: 'hover:bg-blue-800',
            text: 'text-blue-700',
            border: 'border-blue-700/30',
            shadow: 'shadow-blue-700/20',
            gradientFrom: 'from-blue-700',
            gradientTo: 'to-blue-600'
        }
    },
    {
        name: 'violet',
        primary: 'violet',
        text: 'text-white',
        classes: {
            bg: 'bg-violet-700',
            bgHover: 'hover:bg-violet-800',
            text: 'text-violet-700',
            border: 'border-violet-700/30',
            shadow: 'shadow-violet-700/20',
            gradientFrom: 'from-violet-700',
            gradientTo: 'to-violet-600'
        }
    },
    {
        name: 'rose',
        primary: 'rose',
        text: 'text-white',
        classes: {
            bg: 'bg-rose-700',
            bgHover: 'hover:bg-rose-800',
            text: 'text-rose-700',
            border: 'border-rose-700/30',
            shadow: 'shadow-rose-700/20',
            gradientFrom: 'from-rose-700',
            gradientTo: 'to-rose-600'
        }
    },
    {
        name: 'cyan',
        primary: 'cyan',
        text: 'text-neutral-900',
        classes: {
            bg: 'bg-cyan-500',
            bgHover: 'hover:bg-cyan-400',
            text: 'text-cyan-700',
            border: 'border-cyan-500/30',
            shadow: 'shadow-cyan-500/20',
            gradientFrom: 'from-cyan-500',
            gradientTo: 'to-cyan-600'
        }
    },
    {
        name: 'orange',
        primary: 'orange',
        text: 'text-neutral-900',
        classes: {
            bg: 'bg-orange-500',
            bgHover: 'hover:bg-orange-400',
            text: 'text-orange-700',
            border: 'border-orange-500/30',
            shadow: 'shadow-orange-500/20',
            gradientFrom: 'from-orange-500',
            gradientTo: 'to-orange-600'
        }
    },
    {
        name: 'indigo',
        primary: 'indigo',
        text: 'text-white',
        classes: {
            bg: 'bg-indigo-700',
            bgHover: 'hover:bg-indigo-800',
            text: 'text-indigo-700',
            border: 'border-indigo-700/30',
            shadow: 'shadow-indigo-700/20',
            gradientFrom: 'from-indigo-700',
            gradientTo: 'to-indigo-600'
        }
    },
] as const;

export type Theme = typeof THEMES[number];



export function getTheme(slug: string) {
    // Simple hash function
    let hash = 0;
    for (let i = 0; i < slug.length; i++) {
        hash = slug.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Positive modulo
    const index = Math.abs(hash) % THEMES.length;
    return THEMES[index];
}
