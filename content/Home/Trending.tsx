import TrendingCard from "@/components/Cards/TrendingCard/TrendingCard"
import type { TMDBPaginatedResponse, TMDBMedia } from "@/types/global";

interface TrendingProps {
  data?: TMDBPaginatedResponse<TMDBMedia>;
}

const Trending = ({ data }: TrendingProps) => {
  const { results = [] } = data || {};

  return (
    <div className="w-full max-w-[96rem] relative bottom-28 mx-5 max-[1270px]:bottom-0 max-[1270px]:mt-6">
      <h1 className="text-[#ffffffbd] font-medium text-3xl font-['poppins'] max-[1270px]:text-2xl max-[1270px]:text-[#f6f4f4ea]">| Currently Trending</h1>

      <div className="mt-8 grid grid-auto-fit gap-3">
        {results
          .slice(0, 8)
          .map((item, index) =>
            <TrendingCard key={index} info={item} />
          )}
      </div>
    </div>
  )
}

export default Trending