import Link from "next/link";
import { Fragment } from "react";

const MOVIE_GENRES = [
  { id: 28, name: "Action", emoji: "💥", description: "High-octane thrills and explosive stunts" },
  { id: 12, name: "Adventure", emoji: "🏔️", description: "Epic journeys and daring quests" },
  { id: 16, name: "Animation", emoji: "🎨", description: "Imaginative worlds brought to life" },
  { id: 35, name: "Comedy", emoji: "😂", description: "Laughter and light-hearted fun" },
  { id: 80, name: "Crime", emoji: "🔫", description: "Gritty tales of law and order" },
  { id: 99, name: "Documentary", emoji: "📽️", description: "Real stories that inform and inspire" },
  { id: 18, name: "Drama", emoji: "🎭", description: "Compelling characters and emotional stories" },
  { id: 10751, name: "Family", emoji: "👨‍👩‍👧‍👦", description: "Fun for viewers of all ages" },
  { id: 14, name: "Fantasy", emoji: "🐉", description: "Magic, myth, and otherworldly adventure" },
  { id: 36, name: "History", emoji: "📜", description: "Epic tales from the past" },
  { id: 27, name: "Horror", emoji: "👻", description: "Chills, thrills, and spine-tingling scares" },
  { id: 10402, name: "Music", emoji: "🎵", description: "Rhythm, melody, and musical storytelling" },
  { id: 9648, name: "Mystery", emoji: "🔍", description: "Intriguing puzzles and suspenseful twists" },
  { id: 10749, name: "Romance", emoji: "💕", description: "Heartfelt love stories and connections" },
  { id: 878, name: "Science Fiction", emoji: "🚀", description: "Futuristic worlds and mind-bending concepts" },
  { id: 10770, name: "TV Movie", emoji: "📺", description: "Made-for-television films" },
  { id: 53, name: "Thriller", emoji: "🔪", description: "Edge-of-your-seat suspense and tension" },
  { id: 10752, name: "War", emoji: "⚔️", description: "Intense battles and stories of conflict" },
  { id: 37, name: "Western", emoji: "🤠", description: "Tales of the Wild West and frontier life" },
];

const GenresPage = () => {
  return (
    <Fragment>
      <div className="w-full flex flex-col items-center z-10 relative main-responsive top-[86px]">
        <div className="w-full max-w-[96rem] relative">

          {/* small line separation */}
          <div className="w-[-webkit-fill-available] h-[1px] absolute bg-[#212029] top-[1px]"></div>

          <div className="mt-[15px] flex justify-between items-center">
            <h1 className="text-[#ffffffea] font-medium text-[23px] font-['poppins']">Genres</h1>
          </div>

          <p className="text-[#a0a0a8] font-['poppins'] text-sm mt-2 mb-6">
            Browse movies by genre — find your next favorite film
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-32">
            {MOVIE_GENRES.map((genre) => (
              <Link
                key={genre.id}
                href={`/genres/${genre.id}`}
                className="group relative bg-[#111827] border border-[#1f2937] rounded-xl p-5 hover:border-emerald-500/40 hover:bg-[#1a2332] transition-all duration-300"
              >
                <div className="text-3xl mb-3">{genre.emoji}</div>
                <h3 className="text-white font-['poppins'] font-medium text-base group-hover:text-emerald-400 transition-colors">
                  {genre.name}
                </h3>
                <p className="text-[#80808a] font-['poppins'] text-xs mt-1 line-clamp-2">
                  {genre.description}
                </p>
                <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/5 group-hover:ring-emerald-500/20 transition-all" />
              </Link>
            ))}
          </div>

        </div>
      </div>

      {/* background glows */}
      <div className="fixed w-[138.33px] h-[82.25px] left-[1%] top-[2%] bg-[#10b9814d] blur-[200px]"></div>
      <div className="fixed w-[500px] h-[370.13px] right-[50%] bottom-[20%] bg-[#05966966] blur-[215.03px] translate-x-[70%] z-0 rounded-b-[30%]"></div>
    </Fragment>
  );
};

export default GenresPage;
