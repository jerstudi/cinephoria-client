"use client";

import { useState } from "react";
import type { Movie } from "../data/schemas/movies.schema";
import { SearchBar } from "./search-bar";
import { SearchResults } from "./search-results";

type SearchContainerProps = {
  movies: Movie[];
};

export function SearchContainer({ movies }: SearchContainerProps) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="mb-10 flex flex-col items-center gap-8">
      <SearchBar onSearch={setSearchQuery} />
      <SearchResults movies={movies} searchQuery={searchQuery} />
    </div>
  );
}
