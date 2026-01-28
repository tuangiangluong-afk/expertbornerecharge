
import { Metadata } from 'next';
import { getCity } from '@/lib/db';
import { notFound } from 'next/navigation';
import { getTheme } from '@/lib/theme';
import '@/app/globals.css';

export async function generateMetadata({ params }: { params: Promise<{ domain: string }> }): Promise<Metadata> {
    const { domain } = await params;
    const city = getCity(domain);
    if (!city) return {};
    return {
        title: `[DEMO] ${city.name} - Installation Borne de Recharge`,
        description: `Demo mode for ${city.name}`,
    };
}

export default async function DemoLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ domain: string }>;
}) {
    const { domain } = await params;
    const city = getCity(domain);

    if (!city) return notFound();

    const theme = getTheme(city.slug);

    return (
        <div className={`min-h-screen ${theme.classes.bg || 'bg-white'}`}>
            {children}
        </div>
    );
}
