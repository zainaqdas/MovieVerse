"use client";

import Card from "@/components/Cards/Card/Card";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import Pagination from "@/content/catalog/Pagination";
import { clientGetMoviesByGenre } from "@/lib/client-tmdb";
import { Totalgenres } from "@/utils/Genres";

const GenresDetailPage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const genreId = Number(params.genreId);
  const genreName = Totalgenres.find((g) => g.id === genreId)?.name || "Genre";

  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  // Sync page from URL
  useEffect(() => {
    const updatedPage = Number(searchParams.get("page")) || 1;
    setPage(updatedPage);
  }, [searchParams]);

  // Fetch movies by genre
  useEffect(() => {
    if (!genreId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await clientGetMoviesByGenre(genreId, page);
        if (data?.results) {
          setMovies(data.results);
          setTotalPages(data.total_pages || 1);
        }
      } catch (error) {
        console.error("Error fetching genre movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [genreId, page]);

  const loadingCards = useMemo(
    () => Array.from({ length: 40 }).map((_, index) => <Card key={index} index={index} loading />),
    []
  );

  return (
    <div className="w-full flex flex-col items-center z-10 relative main-responsive top-[86px]">
      <div className="w-full max-w-[96rem] relative">
        {/* small line separation */}
        <div className="w-[-webkit-fill-available] h-[1px] absolute bg-[#212029] top-[1px]"></div>

        <div className="mt-[15px] flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.replace("/genres")}
              className="text-[#a0a0a8] hover:text-white transition-colors text-lg"
              aria-label="Back to genres"
            >
              ←
            </button>
            <h1 className="text-[#ffffffea] font-medium text-[23px] font-['poppins']">{genreName}</h1>
          </div>
        </div>

        <p className="text-[#a0a0a8] font-['poppins'] text-sm mt-2 mb-6">
          {loading ? "Loading..." : `${movies.length} movies found`}
        </p>

        <div className="w-full h-full grid grid-auto-fit gap-3 mb-32">
          {loading
            ? loadingCards
            : movies?.map((item, index) => (
                <Card data={item} key={item.id || index} type="movie" />
              ))}
          {!loading && movies?.length < 6 &&
            Array.from({ length: 8 - movies?.length }).map((_, index) => (
              <Card key={index} index={index} hidden />
            ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 pb-8">
            <Pagination
              pageInfo={{
                currentPage: page,
                lastPage: totalPages - 2,
              }}
            />
          </div>
        )}
      </div>

      {/* background glows */}
      <div className="fixed w-[138.33px] h-[82.25px] left-[1%] top-[2%] bg-[#10b9814d] blur-[200px]"></div>
      <div className="fixed w-[500px] h-[370.13px] right-[50%] bottom-[20%] bg-[#05966966] blur-[215.03px] translate-x-[70%] z-0 rounded-b-[30%]"></div>
    </div>
  );
};

export default GenresDetailPage;
