import RecommendationCard from "@/components/Cards/HorizontalCard/HorizontalCard"
import { getRecommendation } from "@/lib/MoviesFunctions"
import { Fragment } from "react"
import type { TMDBMedia } from "@/types/global";

interface RecommendationProps {
  MovieId: string | number;
  type: string;
}

const Recommendation = async ({ MovieId, type }: RecommendationProps) => {
  const data = await getRecommendation(MovieId, type);
  const { results: recommendation = [] } = data || {};

  return (
    <div className="w-full min-[1125px]:max-w-[24rem]">
      <div className="text-[#ffffffe0] text-[18px] font-medium font-['poppins'] mb-4">Recommendation</div>

      <div className="w-full flex flex-col gap-3 max-[1125px]:grid max-[1125px]:grid-cols-[repeat(auto-fit,minmax(306px,1fr))]">
        {recommendation?.slice(0, 5)?.map((item: TMDBMedia, index: number) => <Fragment key={index}><RecommendationCard data={item} type={item?.media_type || type} /></Fragment>)}
      </div>
    </div>
  )
}

export default Recommendation