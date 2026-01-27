import CookieBanner from "@/components/CookieBanner";
import GoogleAnalytics from "@/components/GoogleAnalytics";

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <GoogleAnalytics GA_MEASUREMENT_ID="G-3S88LL4FC5" />
            {children}
            <CookieBanner slug="home" cityName="Expert Borne Recharge" />
        </>
    );
}
