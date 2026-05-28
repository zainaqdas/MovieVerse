"use client"
import { useState } from "react"
import CategorySelector from "./CategorySelector"
import Statistics from "./Statistics/Statistics"
import Movies from "./Movies"
import type { UserProfile, TotalMoviesResult } from "@/types/global";

interface CategoryMainProps {
  info?: UserProfile | null;
  totalMovies?: TotalMoviesResult | string;
  loading?: boolean;
}

const CategoryMain = ({ info, totalMovies, loading }: CategoryMainProps) => {
  const [active, setActive] = useState("CURRENT")

  return (
    <div>
      <CategorySelector active={active} setActive={setActive} totalMovies={totalMovies} />
      {active !== "STATISTICS" ?
        <Movies active={active} totalMovies={totalMovies} />
        :
        <Statistics />}
    </div>
  )
}

export default CategoryMain