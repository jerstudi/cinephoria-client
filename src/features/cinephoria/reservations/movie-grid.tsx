"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { SectionTitle } from "@/components/utils/section-title-style";
import { cn, imageLoader } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import type { CineSession } from "../data/schemas/cineSessions.schema";

type MovieGridProps = {
  cineSessions: CineSession[];
  selectedCinemaId: string | null;
  className?: string;
};

const DEFAULT_POSTER = "/images/no-poster.svg";

export function MovieGrid({
  cineSessions,
  selectedCinemaId,
  className,
}: MovieGridProps) {
  // Filtrer les sessions pour le cinéma sélectionné
  const filteredSessions = selectedCinemaId
    ? cineSessions.filter((session) => session.cineId === selectedCinemaId)
    : [];

  // Extraire les films uniques des sessions filtrées
  const movies = filteredSessions.reduce(
    (acc, session) => {
      if (
        session.movie &&
        !acc.find((movie) => movie.id === session.movie?.id)
      ) {
        acc.push({
          ...session.movie,
          hall: session.hall,
        });
      }
      return acc;
    },
    [] as (NonNullable<CineSession["movie"]> & { hall: CineSession["hall"] })[],
  );

  if (!selectedCinemaId) {
    return null;
  }

  return (
    <div className="my-10 flex w-full max-w-7xl flex-col gap-8">
      <SectionTitle title={"Films à l'affiche"} />
      <div
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
                    className="!mt-0 text-sm uppercase text-muted-foreground"
                  >
                    {movie.hall?.type}
                  </Typography>
                  <Typography
                    variant="p"
                    className="!mt-0 text-sm text-muted-foreground"
                  >
                    <span>Salle </span>
                    <span>{movie.hall?.hallNumber}</span>
                  </Typography>
                </div>
                <div className="mt-2 flex flex-col items-start justify-center gap-2 text-sm text-muted-foreground">
                  {/* <div className="whitespace-pre-line text-xs">
                    {filteredSessions.length > 0 &&
                      (() => {
                        const session = filteredSessions.find(
                          (session) => session.movie?.id === movie.id,
                        );
                        console.log("Session trouvée:", {
                          movieId: movie.id,
                          sessionId: session?.id,
                          sessionStart: session?.sessionStart,
                          sessionEnd: session?.sessionEnd,
                          movieDuration: movie.duration,
                        });
                        return session ? (
                          <MovieSchedule movie={movie} session={session} />
                        ) : null;
                      })()}
                  </div> */}

                  <p className="text-white-foreground flex gap-1">
                    <span>mer/ven/sam</span>
                    <span>
                      <span className="text-red-600">19</span>:00 -{" "}
                      <span className="text-red-600">00</span>:30
                    </span>
                  </p>
                  <p className="text-white-foreground flex gap-1">
                    <span>lun/mar/jeu/dim</span>
                    <span>
                      <span className="text-red-600">19</span>:00 -{" "}
                      <span className="text-red-600">23</span>:30
                    </span>
                  </p>
                </div>
                <div className="my-4 flex items-center justify-center gap-2">
                  <Button variant="outline" size="sm" className="w-full">
                    Réserver
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
