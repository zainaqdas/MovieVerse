"use client"
import CatalogSelect from "@/components/ui/CatalogSelect";
import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface OptionsProps {
  sort: string;
  genre: string;
}

const genreList = [
  { key: "", value: "All Genres" },
  { key: "Action", value: "Action" },
  { key: "Adventure", value: "Adventure" },
  { key: "Animation", value: "Animation" },
  { key: "Comedy", value: "Comedy" },
  { key: "Crime", value: "Crime" },
  { key: "Documentary", value: "Documentary" },
  { key: "Drama", value: "Drama" },
  { key: "Family", value: "Family" },
  { key: "Fantasy", value: "Fantasy" },
  { key: "Horror", value: "Horror" },
  { key: "Mystery", value: "Mystery" },
  { key: "Romance", value: "Romance" },
  { key: "Science Fiction", value: "Sci-Fi" },
  { key: "Thriller", value: "Thriller" },
  { key: "War", value: "War" },
  { key: "Western", value: "Western" },
];

const sortList = [
  { key: "popular", value: "Popular" },
  { key: "top_rated", value: "Top Rated" },
];

const Options = ({ sort, genre }: OptionsProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeSort = sortList.find((s) => s.key === sort) || sortList[0];
  const activeGenre = genreList.find((g) => g.key === genre) || genreList[0];

  const applyFilters = useCallback(
    (newSort: string, newGenre: string) => {
      const queryParams = new URLSearchParams();
      if (newSort && newSort !== "popular") queryParams.set("sort", newSort);
      if (newGenre) queryParams.set("genre", newGenre);

      router.push(`/discover${queryParams.toString() ? `?${queryParams}` : ""}`);
    },
    [router]
  );

  return (
    <div className="w-full flex max-[880px]:flex-col gap-4 mb-8">
      {/* Sort: Popular vs Top Rated */}
      <CatalogSelect
        data={sortList}
        active={activeSort}
        setActive={(item) => {
          const key = typeof item === "string" ? item : item.key;
          applyFilters(key, genre);
        }}
      />

      {/* Genre filter */}
      <CatalogSelect
        data={genreList}
        active={activeGenre}
        setActive={(item) => {
          const key = typeof item === "string" ? item : item.key;
          applyFilters(sort, key);
        }}
      />
    </div>
  );
};

export default Options;
