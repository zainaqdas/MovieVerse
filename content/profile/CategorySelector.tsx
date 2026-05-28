"use client"
import { LuEye } from "react-icons/lu"
import { FaRegBookmark } from "react-icons/fa6";
import { IoMdCheckmark } from "react-icons/io";
import { MdOutlineFrontHand } from "react-icons/md";
import { BiBullseye } from "react-icons/bi";
import { IoPersonOutline } from "react-icons/io5";
import clsx from "clsx";


import type { TotalMoviesResult } from "@/types/global";

interface CategorySelectorProps {
  active: string;
  setActive: (id: string) => void;
  totalMovies?: TotalMoviesResult | string;
}

const CategorySelector = ({ active, setActive, totalMovies }: CategorySelectorProps) => {

  const getCountNumber = (id: string): number | undefined => {
    if (typeof totalMovies === 'string') return undefined;
    return totalMovies?.breakdown?.find((data: { status: string; count: number }) => data?.status === id)?.count
  }

  const categorys = [
    {
      title: "Watching",
      id: "CURRENT",
      icon: <LuEye />,
      number: getCountNumber("CURRENT") || 0,
    },
    {
      title: "To Watch",
      id: "PLANNING",
      icon: <FaRegBookmark />,
      number: getCountNumber("PLANNING") || 0,
    },
    {
      title: "Watched",
      id: "COMPLETED",
      icon: <IoMdCheckmark />,
      number: getCountNumber("COMPLETED") || 0,
    },
    {
      title: "On Hold",
      id: "PAUSED",
      icon: <MdOutlineFrontHand />,
      number: getCountNumber("PAUSED") || 0,
    },
    {
      title: "Dropped",
      id: "DROPPED",
      icon: <BiBullseye />,
      number: getCountNumber("DROPPED") || 0,
    },
    {
      title: "Statistics",
      id: "STATISTICS",
      icon: <IoPersonOutline />
    }
  ];

  return (
    <div className="relative w-full min-[762px]:h-14 border-b border-[#23253274] text-white z-10">
      <div className="flex items-center justify-center h-full gap-1 max-[762px]:flex-wrap">


        {categorys.map((item, index) => <div
          key={index}
          className={
            clsx(
              "relative flex gap-2 items-center cursor-pointer px-2 py-4 justify-center after:bg-[#ffffff9d] after:hover:w-full after:h-[3px] after:rounded-lg after:absolute after:bottom-0 after:w-0 after:transition-all",
              { "after:bg-[#ffffff9d] after:w-full after:h-[3px] after:rounded-lg after:absolute after:bottom-0": categorys.find(item => item?.id === active)?.title === item?.title }
            )
          }
          onClick={() => setActive(item?.id)}
        >
          <div className="text-xl">{item?.icon}</div>
          <div>{item?.title}</div>
          <span className="text-[#edededd6]">{item?.number}</span>
        </div>)}

      </div>
    </div>
  )
}

export default CategorySelector