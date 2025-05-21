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
import Image from "next/image";
import { useState } from "react";
import type { CineSession } from "../data/schemas/cineSessions.schema";
import { MovieGrid } from "./movie-grid";

type ReservationsProps = {
  cineSessions: CineSession[];
};

export function Reservations({ cineSessions }: ReservationsProps) {
  const [open, setOpen] = useState(false);
  const [selectedCinema, setSelectedCinema] = useState<string | null>(null);

  // Extraire les cinémas uniques des sessions en utilisant l'ID
  const cinemas = cineSessions.reduce(
    (acc, session) => {
      if (!acc.find((cinema) => cinema.id === session.cinema.id)) {
        acc.push(session.cinema);
      }
      return acc;
    },
    [] as (typeof cineSessions)[0]["cinema"][],
  );

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="mt-16"></div>
      <div className="flex w-72 flex-col items-center justify-center gap-4 rounded-lg border border-red-500/50 bg-red-600/50 p-4">
        <Typography variant="p" className="text-sm">
          Sélectionner un cinéma
        </Typography>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-fit justify-between"
            >
              {selectedCinema
                ? cinemas.find((cinema) => cinema.id === selectedCinema)?.name
                : "Sélectionner un cinéma..."}
              <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Rechercher un cinéma..." />
              <CommandList>
                <CommandEmpty>Aucun cinéma trouvé.</CommandEmpty>
                <CommandGroup>
                  {cinemas.map((cinema) => (
                    <CommandItem
                      key={cinema.id}
                      value={cinema.name}
                      onSelect={() => {
                        setSelectedCinema(cinema.id);
                        setOpen(false);
                      }}
                    >
                      {cinema.name}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedCinema === cinema.id
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

      {!selectedCinema ? (
        <div className="relative w-full">
          <Image
            src="/assets/img/cinema-hall.jpg"
            alt="Cinema Hall"
            width={1200}
            height={1200}
            className="my-10 rounded-lg object-cover"
            priority
            quality={100}
          />
        </div>
      ) : (
        <div className="w-full">
          <MovieGrid
            cineSessions={cineSessions}
            selectedCinemaId={selectedCinema}
          />
        </div>
      )}
    </div>
  );
}
