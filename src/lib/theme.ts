
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
            bg: 'bg-blue-600',
            bgHover: 'hover:bg-blue-500',
            text: 'text-blue-400',
            border: 'border-blue-400/30',
            shadow: 'shadow-blue-400/20',
            gradientFrom: 'from-blue-600',
            gradientTo: 'to-blue-500'
        }
    },
    {
        name: 'violet',
        primary: 'violet',
        text: 'text-white',
        classes: {
            bg: 'bg-violet-600',
            bgHover: 'hover:bg-violet-500',
            text: 'text-violet-400',
            border: 'border-violet-400/30',
            shadow: 'shadow-violet-400/20',
            gradientFrom: 'from-violet-600',
            gradientTo: 'to-violet-500'
        }
    },
    {
        name: 'rose',
        primary: 'rose',
        text: 'text-white',
        classes: {
            bg: 'bg-rose-600',
            bgHover: 'hover:bg-rose-500',
            text: 'text-rose-400',
            border: 'border-rose-400/30',
            shadow: 'shadow-rose-400/20',
            gradientFrom: 'from-rose-600',
            gradientTo: 'to-rose-500'
        }
    },
    {
        name: 'cyan',
        primary: 'cyan',
        text: 'text-neutral-900',
        classes: {
            bg: 'bg-cyan-400',
            bgHover: 'hover:bg-cyan-300',
            text: 'text-cyan-400',
            border: 'border-cyan-400/30',
            shadow: 'shadow-cyan-400/20',
            gradientFrom: 'from-cyan-400',
            gradientTo: 'to-cyan-500'
        }
    },
    {
        name: 'orange',
        primary: 'orange',
        text: 'text-neutral-900',
        classes: {
            bg: 'bg-orange-500',
            bgHover: 'hover:bg-orange-400',
            text: 'text-orange-400',
            border: 'border-orange-400/30',
            shadow: 'shadow-orange-400/20',
            gradientFrom: 'from-orange-500',
            gradientTo: 'to-orange-600'
        }
    },
    {
        name: 'indigo',
        primary: 'indigo',
        text: 'text-white',
        classes: {
            bg: 'bg-indigo-600',
            bgHover: 'hover:bg-indigo-500',
            text: 'text-indigo-400',
            border: 'border-indigo-400/30',
            shadow: 'shadow-indigo-400/20',
            gradientFrom: 'from-indigo-600',
            gradientTo: 'to-indigo-500'
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
