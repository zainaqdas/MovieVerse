<div align="center">
  <a href="" target="_blank">
    <img src="./public/images/jadescreen-logo.svg" alt="JadeScreen Logo" width="160" height="160">
  </a>

  <h1 align="center">JadeScreen 🟢</h2>

  <p align="center">
    A modern, open-source movie & TV show streaming platform — built with <strong>Next.js</strong> and <strong>TypeScript</strong>, powered by <strong>TMDB</strong>.
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js 16">
    <img src="https://img.shields.io/badge/TypeScript-6.0-3178C6?style=flat-square&logo=typescript" alt="TypeScript 6">
    <img src="https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=flat-square&logo=tailwindcss" alt="Tailwind CSS 3">
    <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase" alt="Firebase">
    <img src="https://img.shields.io/badge/TMDB_API-01D277?style=flat-square&logo=themoviedatabase" alt="TMDB API">
    <img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="License">
  </p>
</div>

---

## ✨ Overview

**JadeScreen** is a feature-rich streaming platform that lets you browse, discover, and watch movies and TV shows — all in one place. With an emerald green dark theme, 5 streaming servers, episode tracking, genre browsing, and a clean responsive UI, it delivers a premium viewing experience.

---

## 🚀 Features

### 🎬 Browse & Discover
| Feature | Description |
|---|---|
| **Trending** | See what's trending today across movies, TV, and all media |
| **Popular** | Browse the most popular movies and shows |
| **Top Rated** | Discover the highest-rated content |
| **Search** | Full-text search with type filters (movie/TV/all) and adult content toggle |
| **Discover** | Switch between Popular and Top Rated with client-side genre filtering |
| **Genre Pages** | 19 movie genres with emoji icons — dedicated `/genres` listing and `/genres/[id]` detail pages with pagination |
| **Catalog** | Full catalog with filters by genre, year, rating, language, country — sort by popularity, rating, release date, title, revenue |

### 📺 Watch Experience
| Feature | Description |
|---|---|
| **5 Streaming Servers** | Quantum (VidLink), Nova (VidFast), MultiEmbed, VidSrc, Astro (Hexa) |
| **Episode Selector** | Browse and switch seasons/episodes for TV shows |
| **Auto-Next** | Automatically advances to the next episode based on runtime |
| **Auto-Play** | Seamless continuous playback |
| **Light Mode** | Cinema-style dimming overlay for focused viewing |
| **Expandable Player** | Collapse/expand the episode selector for more screen space |
| **Watch Progress** | Resume from where you left off — stored locally |

### 👤 User Features
| Feature | Description |
|---|---|
| **Watch Lists** | Organize content into: Watching, Planning, Completed, On Hold, Dropped |
| **Statistics** | Track your total movies/TV watched, episodes watched, and list breakdowns |
| **Continue Watching** | Card grid showing in-progress content with progress indicators |
| **Watch History** | Automatically saves your viewing progress per episode |
| **Profile** | User banner, avatar, and stats display |

### 💬 Social & Info
| Feature | Description |
|---|---|
| **Reviews** | Browse TMDB user reviews with expand/collapse and pagination |
| **Recommendations** | AI-powered content suggestions based on what you're watching |
| **Movie Info** | Detailed metadata: genres, rating, budget, country, status, production studios, air dates, and more |
| **Rating Display** | Star ratings with TMDB vote averages |

### 🎨 Design
| Feature | Description |
|---|---|
| **Emerald Theme** | Custom jade green color palette throughout |
| **Dark UI** | Deep navy background (`#0a0f1e`) with slate card surfaces |
| **Animated** | Framer Motion page transitions and micro-interactions |
| **Responsive** | Fully responsive from mobile to ultrawide |
| **Custom Logo** | SVG play-triangle logo with film-sprocket accents |
| **Custom Fonts** | NightinTokyo display font + Inter body typeface |

---

## 🧱 Tech Stack

### Frontend
| Library | Purpose |
|---|---|
| **Next.js 16** | React framework with App Router, server components, and API routes (Turbopack) |
| **TypeScript 6** | End-to-end type safety across the entire codebase |
| **React 18** | UI library with server components and hooks |
| **Tailwind CSS 3** | Utility-first styling with custom jade color tokens |
| **Framer Motion** | Declarative animations and page transitions |
| **react-icons** | Icon library (Feather, Font Awesome, etc.) |
| **clsx** | Conditional className utility |
| **react-toastify** | Toast notifications for user feedback |
| **react-paginate** | Pagination for catalog, discover, and genre pages |

### Backend & Data
| Library | Purpose |
|---|---|
| **Next.js API Routes** | Serverless API proxy to TMDB (10 endpoints) |
| **TMDB API** | Movie/TV metadata, search, reviews, recommendations, genre discovery |
| **Firebase** | User authentication (Google) and Firestore data persistence |

### Streaming
| Library | Purpose |
|---|---|
| **HLS.js** | HTTP Live Streaming video player components |
| **5 Embed Servers** | VidLink (Quantum), VidFast (Nova), MultiEmbed, VidSrc, Hexa (Astro) |

### Dev & Quality
| Library | Purpose |
|---|---|
| **ESLint** | Code linting with Next.js config |
| **Sharp** | Image optimization (production) |
| **@vercel/analytics** | Vercel Web Analytics |

---

## 🗺️ Project Architecture

```
app/
├── page.tsx                     # Home — trending, popular, top rated, collections
├── layout.tsx                   # Root layout — header, toast, analytics
├── globals.css                  # Global styles — emerald theme, scrollbar
├── not-found.tsx                # Custom 404 page
├── loading.tsx                  # Route-level loading state
├── about/page.tsx               # About page — features, tech stack, disclaimer
├── (movies)/
│   ├── catalog/page.tsx         # Catalog — search/browse with filters
│   ├── discover/page.tsx        # Discover — Popular or Top Rated with genre filter
│   ├── watch/[id]/page.tsx      # Watch — video player + episodes + reviews
│   └── genres/
│       ├── page.tsx             # Genre listing — 19 movie genres with emoji cards
│       └── [genreId]/page.tsx   # Genre detail — movies filtered by genre + pagination
├── (user)/
│   ├── continue-watching/page.tsx  # Resume watching grid
│   └── profile/page.tsx            # User profile (redirects if unauthenticated)
└── api/
    └── tmdb/route.ts            # 🔁 TMDB API proxy (10 endpoints)

content/                         # 📦 Feature components by route
├── Home/                        # Home page sections
│   ├── HeroSection/             # Hero banner with featured content
│   ├── Trending.tsx             # Trending movies/TV grid
│   ├── Popular.tsx              # Popular movies section
│   ├── Collection.tsx           # Collection highlights
│   ├── Season.tsx               # Seasonal picks
│   └── WatchHistory.tsx         # Recently watched items
├── catalog/                     # Catalog page components
│   ├── Movies.tsx               # Movie grid with loading/pagination
│   ├── Options.tsx              # Filter bar (search, type, adult, etc.)
│   ├── Pagination.tsx           # Reusable page navigation
│   └── components/              # Select, checkbox, dropdown
├── discover/                    # Discover page components
│   ├── Movies.tsx               # Popular/Top Rated grid with genre filter (useMemo)
│   ├── Options.tsx              # Sort + genre selectors (URL params)
│   ├── Pagination.tsx           # Discover-specific pagination
│   └── components/              # Select, checkbox, dropdown
├── watch/                       # Watch page components
│   ├── MainVideo/               # Video iframe + server selector + options
│   ├── EpisodeSelector/         # Season/episode picker + watched tracking
│   ├── MovieInfo/               # Metadata + rating display
│   ├── Comment/                 # TMDB reviews with pagination
│   └── Recommendation/          # Content recommendations
└── profile/                     # Profile page components
    ├── Banner.tsx               # User banner + avatar + stats
    ├── CategoryMain.tsx         # List management hub
    ├── CategorySelector.tsx     # Tab navigation (Watching/Planning/etc.)
    ├── Movies.tsx               # Movie list display
    └── Statistics/              # Dashboard with category breakdowns

components/                      # 🧩 Shared UI components
├── Cards/                       # Card variants
│   ├── Card/                    # Base movie/show card with skeleton loading
│   ├── featuredCard/            # Hero feature card
│   ├── TrendingCard/            # Trending section card
│   ├── ContinueWatchingCard/    # Progress-tracked card
│   └── HorizontalCard/          # Recommendation row card
├── ui/                          # UI primitives
│   ├── Select.tsx               # Dropdown select
│   └── CatalogSelect.tsx        # Catalog/genre filter select
├── errors/                      # Error states
├── loadings/                    # Skeleton loading states
├── AddToList.tsx                # Add/remove from user lists
└── HSLplayer.tsx                # HLS video player wrapper

partials/                        # 📐 Layout partials
├── header/                      # Navigation header
│   ├── Header.tsx               # Logo, links, search, profile
│   ├── Links.tsx                # Nav link items (Home, Catalog, Genres, Discover)
│   ├── Search.tsx               # Search bar with results dropdown
│   ├── SearchResults.tsx        # Search suggestion results
│   ├── Profile.tsx              # User avatar/menu
│   ├── Responsive.tsx           # Mobile hamburger menu
│   └── Dropdown.tsx             # Dropdown menu
└── footer/Footer.tsx            # Site footer

lib/                             # 🛠️ Core utilities
├── MoviesFunctions.ts           # Server-side TMDB functions (trending, info, etc.)
├── client-tmdb.ts               # Client-side TMDB proxy wrappers (10 endpoints)
└── MultiFunctions.js            # Multi-type utility functions

firebase/                        # 🔥 Firebase modules
├── config.js                    # Firebase app initialization
├── authentication.js            # Auth helpers (Google sign-in)
└── movies.js                    # Firestore CRUD for user lists

context/                         # 🔄 React context providers
├── UserInfoContext.tsx           # User auth state
├── Watch.tsx                    # Watch page state (episode, season, episodes)
└── WatchSetting.tsx             # Player settings (autoplay, auto-next, light mode)

utils/                           # 🔧 Utility functions
├── constants.ts                 # App constants (5 servers, nav links, categories, TMDB images)
├── Genres.ts                    # Genre mapping data (27 genres: movie + TV)
├── fonts.ts                     # Custom font configuration
├── ProgressHandler.ts           # localStorage watch progress management
└── SmallPrograms.ts             # Misc helpers (season calculation, etc.)

types/                           # 📝 TypeScript type definitions
├── global.d.ts                  # All shared types (TMDB, user, context, props)
└── modules.d.ts                 # Module declarations
```

---

## 🔌 TMDB API Proxy

JadeScreen uses a **server-side API proxy** at `/api/tmdb` to keep the TMDB API key secure. The proxy supports **10 endpoints**:

| Endpoint | Path Param | Description |
|---|---|---|
| Multi Search | `path=search/multi` | Search movies, TV, and people |
| Single Search | `path=search/single` | Search a specific media type |
| Trending | `path=trending` | Today's trending content |
| Popular | `path=movie/popular` | Popular movies |
| Top Rated | `path=movie/top_rated` | Top rated movies |
| Discover Movie | `path=discover/movie` | Filter movies by genre (used by genre pages) |
| Info | `path=info` | Full movie/TV metadata |
| Recommendations | `path=recommendations` | Similar content suggestions |
| Reviews | `path=reviews` | TMDB user reviews with pagination |
| Episodes | `path=episodes` | TV season episode list |

**Client wrapper:** `lib/client-tmdb.ts` provides typed `clientGet*` functions for all endpoints (e.g., `clientGetMoviesByGenre`, `clientGetPopularMovies`, `clientGetTopRatedMovies`).

---

## 🚦 Getting Started

### Prerequisites
- **Node.js** 18+ (recommended: 22+)
- **npm** (or pnpm, yarn, bun)
- **TMDB API Key** — [get one here](https://www.themoviedb.org/settings/api)

### 1. Clone the repository

```bash
git clone https://github.com/zainaqdas/MovieVerse.git
cd MovieVerse
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
## TMDB API (REQUIRED)
TMDB_API_KEY=your_tmdb_api_key_here

## Next.js
NEXT_PUBLIC_URL=http://localhost:3000

## Encryption Key (for local storage)
NEXT_PUBLIC_ENCRYPTION_KEY=run `openssl rand -base64 32` in your terminal

## Firebase Configuration (optional — for user features)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

> **Note:** Only `TMDB_API_KEY` is required for browsing and watching. Firebase is optional and enables user profiles, lists, and statistics.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for production

```bash
npm run build
npm start
```

---

## 🔥 Firebase Setup (Optional)

If you want user accounts, lists, and statistics, set up Firebase:

1. **Create a Firebase project** at the [Firebase Console](https://console.firebase.google.com)
2. **Register a web app** — copy the config values to your `.env.local`
3. **Enable Google Authentication** — under Authentication → Sign-in method
4. **Create Firestore Database** — start in test mode for development
5. **Set up Firestore Security Rules:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /savedMovies/{uid}/{status}/{movieId} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

---

## 🎨 Customization

### Color Theme

The emerald green palette is defined in `tailwind.config.ts` under the `jade` key. Adjust these values to customize the theme:

```typescript
jade: {
  50: "#ecfdf5",   // lightest
  400: "#34d399",  // accent
  500: "#10b981",  // primary
  700: "#047857",  // hover
  800: "#065f46",  // dark accent
  950: "#022c22",  // deepest
}
```

Dark theme colors:
```typescript
dark: {
  bg: "#0a0f1e",      // page background
  card: "#111827",     // card surface
  elevated: "#1e293b", // elevated surfaces
}
```

### Logo & Favicon

- **Logo SVG:** `public/images/jadescreen-logo.svg`
- **Favicon SVG:** `app/icon.svg` (automatically linked by Next.js)
- **Font:** Custom `NightinTokyo` display font in `assets/font/`

---

## 📦 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint across the codebase |

---

## 🗺️ Roadmap

- [x] TMDB API proxy with 10 endpoints
- [x] 5 working streaming servers
- [x] Episode selector with watched tracking
- [x] Genre pages — `/genres` listing + `/genres/[id]` detail
- [x] Discover page — Popular / Top Rated with genre filter
- [x] Continue watching (localStorage)
- [x] Auto-next episode
- [ ] Redis-based progress persistence
- [ ] User playlists
- [ ] Download queue
- [ ] Chromecast support
- [ ] Subtitles integration
- [ ] Advanced filters (by year, rating, language)

---

## 🙏 Acknowledgments

- **[TMDB](https://www.themoviedb.org/)** — for the comprehensive movie/TV database API
- **VidLink**, **VidFast**, **MultiEmbed**, **VidSrc**, **Hexa** — for streaming embed servers
- **[React Icons](https://react-icons.github.io/react-icons/)** — for the icon set
- **[Framer Motion](https://www.framer.com/motion/)** — for animations
- All open-source contributors — thank you!

---

<div align="center">
  <sub>
    Built with ❤️ using <a href="https://nextjs.org/">Next.js</a> ·
    <a href="https://codebuff.com">Codebuff</a> assisted
  </sub>
</div>
