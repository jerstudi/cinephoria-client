"use client";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/lib/hooks/use-debounce";
import { Search } from "lucide-react";
import { useQueryState } from "nuqs";
import { useCallback, useEffect } from "react";

type SearchBarProps = {
  onSearch: (query: string) => void;
};

export function SearchBar({ onSearch }: SearchBarProps) {
  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
    shallow: false,
    throttleMs: 1000,
  });

  const debouncedSearch = useDebounce(search, 500);

  const handleSearch = useCallback(
    (value: string) => {
      void setSearch(value);
    },
    [setSearch],
  );

  useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  return (
    <div className="flex w-full max-w-2xl items-center gap-2">
      <Input
        type="search"
        placeholder="Rechercher un film par titre, acteur, directeur ou compositeur..."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        className="w-full rounded-full"
      />
      <Search className="size-6" />
    </div>
  );
}
