import { imageLoader } from "@/lib/utils";
import Image from "next/image";
import type { Movie } from "../data/schemas/movies.schema";

type SearchResultsProps = {
  movies: Movie[];
  searchQuery: string;
};

export function SearchResults({ movies, searchQuery }: SearchResultsProps) {
  const filteredMovies = movies.filter((movie) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      movie.title.toLowerCase().includes(searchLower) ||
      movie.actors.toLowerCase().includes(searchLower) ||
      movie.directors.toLowerCase().includes(searchLower) ||
      movie.musicComposer.toLowerCase().includes(searchLower)
    );
  });

  if (searchQuery && filteredMovies.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center">
        <p className="text-lg text-muted-foreground">
          Aucun film trouvé pour "{searchQuery}"
        </p>
      </div>
    );
  }

  if (!searchQuery) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {filteredMovies.map((movie) => (
        <div
          key={movie.id}
          className="relative aspect-[2/3] w-64 overflow-hidden rounded-lg"
        >
          {movie.poster ? (
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
              fill
              className="object-cover transition-transform hover:scale-105"
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-muted">
              <span className="text-lg font-semibold text-muted-foreground">
                {movie.title}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
