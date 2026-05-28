import Link from "next/link";
import {
  FiMonitor,
  FiSearch,
  FiGrid,
  FiPlay,
  FiUsers,
  FiStar,
  FiGithub,
  FiExternalLink,
} from "react-icons/fi";

const features = [
  {
    icon: <FiSearch className="w-5 h-5" />,
    title: "Browse & Discover",
    items: [
      "Trending movies and TV shows — updated daily",
      "Popular and Top Rated sections",
      "Full-text search with type filters (movie/TV/all)",
      "Genre browsing — 19 movie genres with dedicated pages",
    ],
  },
  {
    icon: <FiPlay className="w-5 h-5" />,
    title: "Watch Experience",
    items: [
      "5 streaming servers — Quantum, Nova, MultiEmbed, VidSrc, Astro",
      "Episode selector with season browsing for TV shows",
      "Auto-next episode and auto-play settings",
      "Light mode (cinema dimming overlay)",
      "Continue watching — resume from where you left off",
    ],
  },
  {
    icon: <FiMonitor className="w-5 h-5" />,
    title: "Catalog & Filters",
    items: [
      'Sort by popularity, rating, release date, title, and revenue',
      'Filter by media type (movies/TV), genre, release year, and more',
      'Adult content toggle and language/region filters',
      'Discover page — switch between Popular and Top Rated',
    ],
  },
  {
    icon: <FiUsers className="w-5 h-5" />,
    title: "User Features",
    items: [
      "Watch lists — Watching, Planning, Completed, On Hold, Dropped",
      "Statistics dashboard — track totals and breakdowns",
      "Continue Watching grid with progress indicators",
      "Firebase-powered authentication (Google Sign-In)",
    ],
  },
  {
    icon: <FiStar className="w-5 h-5" />,
    title: "Social & Info",
    items: [
      "TMDB user reviews with expand/collapse and pagination",
      "Content recommendations based on what you're watching",
      "Rich metadata — genres, ratings, budget, release dates, studios",
    ],
  },
  {
    icon: <FiGrid className="w-5 h-5" />,
    title: "Design & UX",
    items: [
      "Emerald green (jade) dark theme — deep navy background",
      "Framer Motion animations and micro-interactions",
      "Fully responsive — mobile to ultrawide",
      "Custom NightinTokyo display font + Inter body typeface",
      "Custom SVG logo with play-triangle + film-sprocket accents",
    ],
  },
];

const techStack = [
  { category: "Frontend", items: "Next.js 16, React 18, TypeScript 6, Tailwind CSS 3, Framer Motion" },
  { category: "Data", items: "TMDB API (10 endpoints via server-side proxy), Firebase Auth + Firestore" },
  { category: "Streaming", items: "VidLink (Quantum), VidFast (Nova), MultiEmbed, VidSrc, Hexa (Astro)" },
  { category: "Tooling", items: "ESLint, Sharp, Turbopack, Vercel Analytics" },
];

const AboutPage = () => {
  return (
    <div className="w-full flex flex-col items-center z-10 relative main-responsive top-[86px] pb-32">
      <div className="w-full max-w-[86rem]">
        {/* small line separation */}
        <div className="w-full h-[1px] bg-[#212029] mb-8" />

        {/* Hero */}
        <div className="flex flex-col items-center text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-['poppins'] mb-4">
            About <span className="text-emerald-400">JadeScreen</span>
          </h1>
          <p className="text-[#a0a0a8] font-['poppins'] text-lg max-w-2xl leading-relaxed">
            A modern, open-source streaming platform for movies and TV shows — built with{" "}
            <strong className="text-white">Next.js</strong>, powered by{" "}
            <strong className="text-[#01d277]">TMDB</strong>, and styled with an
            emerald-green dark theme.
          </p>
          <div className="flex gap-4 mt-8">
            <Link
              href="/catalog"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-all"
            >
              Browse Catalog
            </Link>
            <a
              href="https://github.com/zainaqdas/MovieVerse"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-[#1f2937] hover:bg-[#2d3a4f] text-white rounded-lg font-medium transition-all flex items-center gap-2"
            >
              <FiGithub className="w-5 h-5" />
              GitHub
              <FiExternalLink className="w-4 h-4 text-[#80808a]" />
            </a>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-[#111827] border border-[#1f2937] rounded-xl p-6 hover:border-emerald-500/30 transition-all duration-300"
            >
              <div className="w-10 h-10 bg-emerald-600/20 rounded-lg flex items-center justify-center text-emerald-400 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-white font-['poppins'] font-semibold text-lg mb-3">{feature.title}</h3>
              <ul className="space-y-2">
                {feature.items.map((item) => (
                  <li key={item} className="text-[#a0a0a8] text-sm flex items-start gap-2">
                    <span className="text-emerald-500 mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="bg-[#111827] border border-[#1f2937] rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-white font-['poppins'] mb-6">Tech Stack</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {techStack.map((tech) => (
              <div key={tech.category}>
                <h4 className="text-emerald-400 font-medium text-sm uppercase tracking-wider mb-2">
                  {tech.category}
                </h4>
                <p className="text-[#a0a0a8] text-sm leading-relaxed">{tech.items}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-[#111827]/60 border border-[#1f2937] rounded-xl p-6 text-center">
          <p className="text-[#80808a] text-sm font-['poppins']">
            JadeScreen does not host or store any media files. All content is streamed from
            third-party embed services. This project is for educational purposes and does not
            encourage piracy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
