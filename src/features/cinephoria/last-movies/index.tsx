"use client";
import { Typography } from "@/components/ui/typography";
import type { Movie } from "../data/schemas/movies.schema";
import { LastMoviesGallery } from "./last-movies-gallery";

type LastMoviesProps = {
  movies: Movie[];
};

export function LastMovies({ movies }: LastMoviesProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Typography variant="h2" className="text-xs uppercase">
          Derniers films ajoutés
        </Typography>
        <div className="w-24 border border-b-0 border-solid border-red-600"></div>
      </div>
      <LastMoviesGallery movies={movies} />
    </div>
  );
}
