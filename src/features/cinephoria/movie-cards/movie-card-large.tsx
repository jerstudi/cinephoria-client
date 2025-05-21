"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Typography } from "@/components/ui/typography";
import { imageLoader } from "@/lib/utils";
import { CircleUser, Clock2, Dot, Star, Video, VideoOff } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { Movie } from "../data/schemas/movies.schema";

type MovieCardLargeProps = {
  movies: Movie[];
  favoriteTitle?: string;
};

export function MovieCardLarge({ movies, favoriteTitle }: MovieCardLargeProps) {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    // Select a random movie only on the client side if no favorite is specified
    if (!favoriteTitle && movies.length > 0) {
      const randomIndex = Math.floor(Math.random() * movies.length);
      setSelectedMovie(movies[randomIndex]);
    } else if (favoriteTitle) {
      const favorite = movies.find((movie) => movie.title === favoriteTitle);
      setSelectedMovie(favorite ?? null);
    }
  }, [movies, favoriteTitle]);

  if (!selectedMovie) {
    return (
      <div className="flex items-center justify-center p-8">
        <Typography variant="h3" className="text-sm italic text-destructive">
          Aucun film trouvé
        </Typography>
      </div>
    );
  }

  // Extract the movie gender
  const rowGenders = selectedMovie.gender ? [selectedMovie.gender] : [];

  return (
    <div className="relative isolate flex flex-col">
      <main className="relative py-24 sm:py-32 lg:pb-40">
        <div className="">
          <div className="grid grid-cols-1 items-start justify-center gap-4 lg:grid-cols-3">
            {/* Poster */}
            <div className="flex w-full items-center justify-center">
              {selectedMovie.poster ? (
                <div className="size-auto px-4">
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
                    src={selectedMovie.poster}
                    alt={selectedMovie.title}
                    width={800}
                    height={800}
                    className="rounded-md"
                  />
                </div>
              ) : (
                <div className="size-24 rounded-md bg-muted" />
              )}
            </div>
            {/* Infos */}
            <div className="grid grid-cols-1 gap-0 lg:col-span-2">
              <Typography variant={"p"} className="mb-2 text-xs text-zinc-500">
                {selectedMovie.movieDate ? (
                  selectedMovie.movieDate
                ) : (
                  <span className="italic">No date</span>
                )}
              </Typography>
              <Typography variant={"h2"} className="">
                {selectedMovie.title ? (
                  selectedMovie.title
                ) : (
                  <span className="italic">Movie without title</span>
                )}
              </Typography>
              <div className="flex flex-wrap items-center gap-0">
                {rowGenders.length > 0 ? (
                  rowGenders.map((g, idx) => {
                    const isLast = idx === rowGenders.length - 1;
                    return (
                      <p key={g} className="flex items-center gap-1">
                        <span className="text-[0.8rem] uppercase text-zinc-500">
                          {g.split(",").join(", ")}
                        </span>
                        {!isLast && (
                          <Dot className="size-8 text-muted-foreground" />
                        )}
                      </p>
                    );
                  })
                ) : (
                  <Badge variant={"outline"} className="text-muted">
                    No gender
                  </Badge>
                )}
              </div>
              <div className="my-4 text-sm text-muted-foreground">
                {selectedMovie.synopsis && selectedMovie.synopsis.length > 700
                  ? `${selectedMovie.synopsis.slice(0, 700)}...`
                  : selectedMovie.synopsis || (
                      <span className="italic">No synopsis</span>
                    )}
              </div>
              <Separator className="my-2" />
              <div className="my-2">
                <Typography
                  variant={"p"}
                  className="!mt-0 text-sm text-muted-foreground"
                >
                  Director :{" "}
                  {selectedMovie.directors ? (
                    selectedMovie.directors
                  ) : (
                    <span className="italic">No directors</span>
                  )}
                </Typography>
                <Typography
                  variant={"p"}
                  className="!mt-0 text-sm text-muted-foreground"
                >
                  Music Composer :{" "}
                  {selectedMovie.musicComposer ? (
                    selectedMovie.musicComposer
                  ) : (
                    <span className="italic">No music composer</span>
                  )}
                </Typography>
                <Typography
                  variant={"p"}
                  className="!mt-0 text-sm text-muted-foreground"
                >
                  Actors :{" "}
                  {selectedMovie.actors ? (
                    selectedMovie.actors
                  ) : (
                    <span className="italic">No actors</span>
                  )}
                </Typography>
              </div>
              <div className="my-2 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Clock2 className="size-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {`${selectedMovie.duration} min`}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <CircleUser className="size-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">{`${selectedMovie.ageLimit} +`}</p>
                </div>
                <div className="flex items-center gap-1">
                  {selectedMovie.favorite && (
                    <Star className="size-4 text-muted-foreground" />
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {selectedMovie.active ? (
                    <Video className="size-4 text-muted-foreground" />
                  ) : (
                    <VideoOff className="size-4 text-muted-foreground" />
                  )}
                </div>
              </div>
              <div className="mt-8 flex items-center justify-start gap-2">
                <Button variant={"outline"} className="w-fit bg-red-600">
                  Bande annonce
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
