"use client"
import Card from "@/components/Cards/Card/Card";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import Pagination from "@/content/catalog/Pagination";
import { clientGetPopularMovies, clientGetTopRatedMovies } from "@/lib/client-tmdb";
import Options from "./Options";

const genreMap: Record<string, number> = {
  Action: 28,
  Adventure: 12,
  Animation: 16,
  Comedy: 35,
  Crime: 80,
  Documentary: 99,
  Drama: 18,
  Family: 10751,
  Fantasy: 14,
  History: 36,
  Horror: 27,
  Music: 10402,
  Mystery: 9648,
  Romance: 10749,
  "Science Fiction": 878,
  "TV Movie": 10770,
  Thriller: 53,
  War: 10752,
  Western: 37,
};

const Movies = () => {
  const searchParams = useSearchParams();

  const [sort, setSort] = useState(searchParams.get("sort") || "popular");
  const [genre, setGenre] = useState(searchParams.get("genre") || "");
  const [allMovies, setAllMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  useEffect(() => {
    const updatedPage = Number(searchParams.get("page")) || 1;
    const updatedSort = searchParams.get("sort") || "popular";
    const updatedGenre = searchParams.get("genre") || "";
    setPage(updatedPage);
    setSort(updatedSort);
    setGenre(updatedGenre);
  }, [searchParams]);

  // Fetch unfiltered results when sort/page changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data =
          sort === "top_rated"
            ? await clientGetTopRatedMovies(page)
            : await clientGetPopularMovies(page);
        if (data?.results) {
          setAllMovies(data.results);
          setTotalPages(data.total_pages || 1);
        }
      } catch (error) {
        console.error("Error fetching discover data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [sort, page]);

  // Reset to page 1 when genre changes
  useEffect(() => {
    setPage(1);
  }, [genre]);

  // Apply genre filter client-side (TMDB doesn't support genre + popular together)
  const movies = useMemo(() => {
    if (!allMovies.length) return [];
    if (!genre || !genreMap[genre]) return allMovies;
    const genreId = genreMap[genre];
    return allMovies.filter((item: any) => item.genre_ids?.includes(genreId));
  }, [allMovies, genre]);

  const loadingCards = useMemo(
    () => Array.from({ length: 40 }).map((_, index) => <Card key={index} index={index} loading />),
    []
  );

  return (
    <div className="w-full">
      <Options sort={sort} genre={genre} />

      <div className="w-full h-full grid grid-auto-fit gap-3">
        {loading
          ? loadingCards
          : movies?.map((item, index) => <Card data={item} key={index} type={item?.media_type || "movie"} />)}
        {!loading && movies?.length < 6 &&
          Array.from({ length: 8 - movies?.length }).map((_, index) => (
            <Card key={index} index={index} hidden />
          ))}
      </div>

      <div className="mt-8"></div>
      {totalPages ? (
        <Pagination
          pageInfo={{
            currentPage: page,
            lastPage: totalPages - 2,
          }}
        />
      ) : null}
    </div>
  );
};

export default Movies;
