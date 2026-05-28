import Image from "next/image"
import type { UserProfile, TotalMoviesResult } from "@/types/global";

interface BannerProps {
  info?: UserProfile | null;
  totalMovies?: TotalMoviesResult | string;
  loading?: boolean;
}

const Banner = ({ info, totalMovies, loading }: BannerProps) => {
  return (
    <div className="relative after:bg-[linear-gradient(360deg,#000000a6,transparent);] after:content-[''] after:w-full after:h-56 after:bottom-0 after:absolute ">
      <div className="relative w-full h-[21rem] border-b border-jade-950">
        <Image
          src={info?.banner || "/images/banner.jpg"}
          alt="banner"
          loading='eager'
          priority={true}
          quality={100}
          fill
          className="object-cover"
        />
      </div>

      <div className="absolute bottom-0 right-1/2 translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-4">
          {loading ? <div>loading</div> :
            <Image src={info?.photo || ""} alt="profile" width={150} height={150} className="object-cover w-28 h-28 border-8 border-jade-700 rounded-full" />
          }
          <div className="font-['poppins'] text-[#ffffff] text-2xl font-semibold">{info?.name || "JadeScreen"}</div>
        </div>

        <div className="text-slate-100 flex gap-12 mt-2 mb-[26px]">

          <div className="flex flex-col items-center">
            <div className="font-semibold">{loading ? 0 : (typeof totalMovies !== 'string' ? totalMovies?.breakdown?.find((data: { status: string; count: number }) => data?.status === "COMPLETED")?.count || 0 : 0)}</div>
            <div className="font-['Rubik'] text-[15px] font-medium text-jade-400 text-center">Movies/TV Watched</div>
          </div>

          <div className="flex flex-col items-center">
            <div className="font-semibold">{loading ? 0 : info?.episodesWatched}</div>
            <div className="font-['Rubik'] text-[15px] font-medium text-jade-400 text-center">Episodes Watched</div>
          </div>

          <div className="flex flex-col items-center">
            <div className="font-semibold">{typeof totalMovies !== 'string' ? totalMovies?.total || 0 : 0}</div>
            <div className="font-['Rubik'] text-[15px] font-medium text-jade-400 text-center">Total Movies/TV</div>
          </div>


        </div>
      </div>

    </div>
  )
}

export default Banner