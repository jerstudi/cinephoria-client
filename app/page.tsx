import { LoaderCircle } from "@/components/ui/loader-circle";
import { getMovies } from "@/features/cinephoria/data-actions/data.actions";
import { LastMovies } from "@/features/cinephoria/last-movies";
import { MovieCardLarge } from "@/features/cinephoria/movie-cards/movie-card-large";
import { SearchContainer } from "@/features/cinephoria/search-bar/search-container";
import { LandingHeader } from "@/features/landing/landing-header";
import { Footer } from "@/features/layout/footer";
import { Suspense } from "react";

export default async function HomePage() {
  const moviesDataResult = await getMovies();
  const moviesData = Array.isArray(moviesDataResult) ? moviesDataResult : [];

  // Pour tester la base noSQL de MongoDB, décommenter les lignes suivantes
  // const reviewsDataResult = await getAllReviews();
  // const reviewsData = Array.isArray(reviewsDataResult) ? reviewsDataResult : [];
  // console.log(reviewsData);

  return (
    <div className="relative flex h-fit flex-col bg-background text-foreground">
      <div className="mt-16"></div>

      <LandingHeader />

      <div className="relative isolate mx-auto mb-10 flex max-w-7xl flex-col gap-8 rounded-lg bg-gray-900 px-6 lg:px-8">
        <MovieCardLarge movies={moviesData} favoriteTitle="Apollo 13" />

        <Suspense fallback={<LoaderCircle className="size-10" />}>
          <SearchContainer movies={moviesData} />
        </Suspense>

        <LastMovies movies={moviesData} />
      </div>

      <Footer />
    </div>
  );
}
