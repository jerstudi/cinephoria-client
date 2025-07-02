import { AboutCinephoria } from "@/features/cinephoria/about";
import { ResponsiveFooter } from "@/features/landing/responsive-footer";
import { ResponsiveHeader } from "@/features/landing/responsive-header";
import { SiteConfig } from "@/site-config";
import type { PageParams } from "@/types/next";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${SiteConfig.title}`,
  description: SiteConfig.description,
  keywords: ["contact"],
  openGraph: {
    title: `${SiteConfig.title}`,
    description: SiteConfig.description,
    url: SiteConfig.prodUrl,
    type: "website",
  },
};

export default async function RoutePage(props: PageParams) {
  return (
    <div className="relative flex h-fit flex-col bg-background text-foreground">
      <div className="mt-16"></div>

      <ResponsiveHeader breakpoint={768} />

      <div className="relative isolate mx-auto mb-10 flex max-w-7xl flex-col gap-8 rounded-lg bg-gray-900 px-6 lg:px-8">
        {/* <Reservations cineSessions={cineSessionsData} /> */}
        <AboutCinephoria />
      </div>

      <ResponsiveFooter breakpoint={768} />
    </div>
  );
}
