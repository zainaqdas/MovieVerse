import EpisodeSelector from "@/content/watch/EpisodeSelector/EpisodeSelector"
import MainVideo from "@/content/watch/MainVideo/MainVideo"
import './watch.css'
import MovieInfos from "@/content/watch/MovieInfo/MovieInfo"
import Rating from "@/content/watch/MovieInfo/Rating"
import { WatchAreaContextProvider } from "@/context/Watch"
import { WatchSettingContextProvider } from "@/context/WatchSetting"
import { Fragment } from "react"
import Comments from "@/content/watch/Comment/Comment"
import Recommendation from "@/content/watch/Recommendation/Recommendation"
import { getInfoTMDB } from "@/lib/MoviesFunctions"
import MovieNotFound from "@/components/errors/MovieNotFound"
import type { TMDBMedia } from "@/types/global"



interface WatchPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ media_type?: string }>;
}

const Watch = async ({ params, searchParams }: WatchPageProps) => {
  const { id: MovieId } = await params;
  const { media_type } = await searchParams

  const rawInfo = await getInfoTMDB(MovieId, media_type || "movie")

  if (rawInfo === "media_type_error" || !rawInfo) {
    return <MovieNotFound />
  }

  const movieInfo = rawInfo as TMDBMedia;

  return (
    <Fragment>
      <div className="w-full flex flex-col items-center z-10 relative main-responsive top-[106px]">
        <div className="w-full max-w-[96rem]">
          {/* container div in this context ⬇ ⬇ */}
          <WatchSettingContextProvider>
            <WatchAreaContextProvider MovieInfo={movieInfo} MovieId={MovieId} >
              <EpisodeSelector />
              <MainVideo />
            </WatchAreaContextProvider>
          </WatchSettingContextProvider>

          <div className="mt-20 flex gap-44">
            <MovieInfos info={movieInfo} />
            <Rating info={movieInfo} />
          </div>

          <div className="flex mb-5 gap-5 max-[1125px]:flex-col mt-24">
            <Comments MovieId={MovieId} type={movieInfo.type} />
            <Recommendation MovieId={MovieId} type={movieInfo.type || "movie"} />
          </div>

        </div>
      </div>

      {/* background */}
      <div className="fixed w-[138.33px] h-[82.25px] left-[1%] top-[2%] bg-[#92b7fc8f] blur-[200px]"></div>
      <div className="absolute max-[737px]:fixed w-[500px] h-[370.13px] right-[50%] bottom-[-25%] bg-[#576683b4] blur-[215.03px] translate-x-[70%] z-0 rounded-b-[30%]"></div>
    </Fragment>
  )
}

export default Watch
