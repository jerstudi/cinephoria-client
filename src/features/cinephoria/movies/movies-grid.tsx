/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  Card as AppleCard,
  Carousel,
} from "@/components/ui/apple-cards-carousel";
import { SectionTitle } from "@/components/utils/section-title-style";
import type { Movie } from "../data/schemas/movies.schema";
import { MovieCardLarge } from "../movie-cards/movie-card-large";

type MovieGridProps = {
  movies: Movie[];
  className?: string;
};

const DEFAULT_POSTER = "/images/no-poster.svg";

export function MoviesGrid({ movies, className }: MovieGridProps) {
  const cards = movies.map((movie, idx) => (
    <AppleCard
      key={movie.id}
      card={{
        src: movie.poster || DEFAULT_POSTER,
        title: movie.title,
        category: movie.gender.split(",").join(", "),
        content: (
          <MovieCardLarge movies={[movie]} favoriteTitle={movie.title} />
        ),
      }}
      index={idx}
      layout={true}
      className="dark:bg-gray-800/70"
    />
  ));

  return (
    <div className="my-10 flex w-full max-w-7xl flex-col gap-0">
      <SectionTitle title={"Tous nos films"} />
      {/* <div
        className={cn(
          "grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4",
          className,
        )}
      >
        {movies.map((movie) => (
          <Link href={`/movies/${movie.id}`} key={movie.id}>
            <Card className="w-72 overflow-hidden transition-all hover:scale-105">
              <CardHeader className="p-0">
                <div className="relative aspect-[2/3] size-auto w-full p-2">
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
                    src={
                      movie.poster && movie.poster.length > 0
                        ? movie.poster
                        : DEFAULT_POSTER
                    }
                    alt={movie.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex flex-wrap items-center justify-start gap-4">
                  <Typography variant="h3" className="!mt-0 line-clamp-1">
                    {movie.title}
                  </Typography>
                  <Typography
                    variant="p"
                    className="!mt-0 text-xs uppercase text-muted-foreground"
                  >
                    {movie.gender.split(",").join(", ")}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div> */}
      <Carousel items={cards} />
    </div>
  );
}
