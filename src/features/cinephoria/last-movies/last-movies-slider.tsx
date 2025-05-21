import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn, imageLoader } from "@/lib/utils";
import Image from "next/image";
import type { Movie } from "../data/schemas/movies.schema";

type LastMoviesSliderProps = {
  movies: Movie[];
  className?: string;
};

export function LastMoviesSlider({ movies, className }: LastMoviesSliderProps) {
  // Filter movies from the last month
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);

  const recentMovies = movies.filter((movie) => {
    const movieDate = new Date(movie.createdAt);
    return movieDate >= lastMonth;
  });

  return (
    <Carousel>
      <CarouselContent className={cn("-ml-1 md:-ml-2", className)}>
        {recentMovies.map((movie, idx) => (
          <CarouselItem
            key={movie.id}
            className="flex items-center justify-center gap-0 pl-1 md:basis-1/2 lg:basis-1/3"
          >
            {movie.poster !== "" ? (
              <div className="flex w-64 items-center justify-center">
                <Image
                  loader={({ src, width, quality }) =>
                    imageLoader({
                      src,
                      width,
                      quality: quality ?? 75,
                      host: "https",
                      domain: "image.tmdb.org",
                    })
                  }
                  src={movie.poster}
                  alt={movie.title}
                  width={800}
                  height={800}
                  className="rounded-md"
                />
              </div>
            ) : (
              <Card>
                <CardContent className="flex aspect-[2/3] w-64 items-center justify-center bg-transparent p-6">
                  <span className="text-2xl font-semibold">{idx + 1}</span>
                </CardContent>
              </Card>
            )}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
