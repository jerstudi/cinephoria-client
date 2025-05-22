/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import React from "react";
import type { CineSession } from "../data/schemas/cineSessions.schema";
import type { Movie } from "../data/schemas/movies.schema";
import { genders } from "./filters";
import { MoviesGrid } from "./movies-grid";

type MoviesProps = {
  movies: Movie[];
  cineSessions: CineSession[];
};

export function Movies({ movies, cineSessions }: MoviesProps) {
  const [cinemaOpen, setCinemaOpen] = React.useState(false);
  const [genderOpen, setGenderOpen] = React.useState(false);
  const [movieValue, setMovieValue] = React.useState("all");
  const [cineSessionValue, setCineSessionValue] = React.useState("");
  const [moviesFiltered, setMoviesFiltered] = React.useState<Movie[]>(movies);
  const [cineSessionsFiltered, setCineSessionsFiltered] =
    React.useState<CineSession[]>(cineSessions);

  React.useEffect(() => {
    let filteredMovies = movies;

    // Filtre par genre
    if (movieValue !== "all") {
      filteredMovies = filteredMovies.filter((movie) =>
        movie.gender.split(",").includes(movieValue),
      );
    }

    // Filtre par cinéma
    if (cineSessionValue !== "") {
      const movieIdsInCinema = cineSessions
        .filter((session) => session.cinema?.name === cineSessionValue)
        .map((session) => session.movieId);

      filteredMovies = filteredMovies.filter((movie) =>
        movieIdsInCinema.includes(movie.id),
      );
    }

    setMoviesFiltered(filteredMovies);
  }, [movieValue, cineSessionValue, movies, cineSessions]);

  React.useEffect(() => {
    if (cineSessionValue === "") {
      const uniqueCinemas = Array.from(
        new Set(cineSessions.map((session) => session.cinema?.id)),
      )
        .map((id) => cineSessions.find((session) => session.cinema?.id === id))
        .filter((session): session is CineSession => session !== undefined);

      setCineSessionsFiltered(uniqueCinemas);
    } else {
      setCineSessionsFiltered(
        cineSessions.filter(
          (cineSession) => cineSession.cinema?.name === cineSessionValue,
        ),
      );
    }
  }, [cineSessionValue, cineSessions]);

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="mt-16"></div>
      <div className="flex w-full items-center justify-end gap-4 rounded-lg border border-red-500/50 bg-red-600/50 p-1">
        <div className="flex w-full items-center justify-end gap-4">
          <div>
            <Typography variant="p">Filtrer par cinéma</Typography>
          </div>
          <Popover open={cinemaOpen} onOpenChange={setCinemaOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={cinemaOpen}
                className="w-[200px] justify-between"
              >
                {cineSessionValue
                  ? cineSessions.find(
                      (cineSession) =>
                        cineSession.cinema?.name === cineSessionValue,
                    )?.cinema?.name
                  : "Select cinema..."}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search cinema..." className="h-9" />
                <CommandList>
                  <CommandEmpty>No cinemas found.</CommandEmpty>
                  <CommandGroup>
                    {Array.from(
                      new Set(
                        cineSessions.map((session) => session.cinema?.id),
                      ),
                    )
                      .map((id) =>
                        cineSessions.find(
                          (session) => session.cinema?.id === id,
                        ),
                      )
                      .filter(
                        (session): session is CineSession =>
                          session !== undefined,
                      )
                      .map((cineSession) => (
                        <CommandItem
                          key={cineSession.cinema?.id}
                          value={cineSession.cinema?.name}
                          onSelect={(currentValue) => {
                            setCineSessionValue(
                              currentValue === cineSessionValue
                                ? ""
                                : currentValue,
                            );
                            setCinemaOpen(false);
                          }}
                        >
                          {cineSession.cinema?.name}
                          <Check
                            className={cn(
                              "ml-auto",
                              cineSessionValue === cineSession.cinema?.name
                                ? "opacity-100"
                                : "opacity-0",
                            )}
                          />
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex w-full items-center justify-end gap-4">
          <div>
            <Typography variant="p">Filtrer par genre</Typography>
          </div>
          <Popover open={genderOpen} onOpenChange={setGenderOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={genderOpen}
                className="w-[200px] justify-between"
              >
                {movieValue
                  ? genders.find((gender) => gender.value === movieValue)?.label
                  : "Select gender..."}
                <ChevronsUpDown className="opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search gender..." className="h-9" />
                <CommandList>
                  <CommandEmpty>No gender found.</CommandEmpty>
                  <CommandGroup>
                    {genders.map((gender) => (
                      <CommandItem
                        key={gender.value}
                        value={gender.value}
                        onSelect={(currentValue) => {
                          setMovieValue(
                            currentValue === movieValue ? "all" : currentValue,
                          );
                          setGenderOpen(false);
                        }}
                      >
                        {gender.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            movieValue === gender.value
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex w-full items-center justify-end gap-4">
          <div>
            <Typography variant="p">Réinitialiser les filtres</Typography>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setMovieValue("all");
              setCineSessionValue("");
            }}
          >
            Réinitialiser
          </Button>
        </div>
      </div>
      <div className="w-full">
        <MoviesGrid movies={moviesFiltered} />
      </div>
    </div>
  );
}
