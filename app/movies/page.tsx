import {
  getCineSessions,
  getMovies,
} from "@/features/cinephoria/data-actions/data.actions";
import { Movies } from "@/features/cinephoria/movies";
import { LandingHeader } from "@/features/landing/landing-header";
import { Footer } from "@/features/layout/footer";
import { SiteConfig } from "@/site-config";
import type { PageParams } from "@/types/next";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `${SiteConfig.title}`,
  description: SiteConfig.description,
  keywords: ["movies"],
  openGraph: {
    title: `${SiteConfig.title}`,
    description: SiteConfig.description,
    url: SiteConfig.prodUrl,
    type: "website",
  },
};

export default async function RoutePage(props: PageParams) {
  const moviesDataResult = await getMovies();
  const moviesData = Array.isArray(moviesDataResult) ? moviesDataResult : [];

  const cineSessionsDataResult = await getCineSessions();
  const cineSessionsData = Array.isArray(cineSessionsDataResult)
    ? cineSessionsDataResult
    : [];

  return (
    <div className="relative flex h-fit flex-col bg-background text-foreground">
      <div className="mt-16"></div>

      <LandingHeader />

      <div className="relative isolate mx-auto mb-10 flex max-w-7xl flex-col gap-8 rounded-lg bg-gray-900 px-6 lg:px-8">
        <Movies movies={moviesData} cineSessions={cineSessionsData} />
      </div>

      <Footer />
    </div>
  );
}
