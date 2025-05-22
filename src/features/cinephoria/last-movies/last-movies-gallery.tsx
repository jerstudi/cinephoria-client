/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  Card as AppleCard,
  Carousel,
} from "@/components/ui/apple-cards-carousel";
import type { Movie } from "../data/schemas/movies.schema";
import { MovieCardLarge } from "../movie-cards/movie-card-large";

type LastMoviesGalleryProps = {
  movies: Movie[];
  className?: string;
};

const DEFAULT_POSTER = "/images/no-poster.svg";

export function LastMoviesGallery({
  movies,
  className,
}: LastMoviesGalleryProps) {
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
      <Carousel items={cards} />
    </div>
  );
}
