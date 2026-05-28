/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    unoptimized: true,
    qualities: [100, 75],
    remotePatterns: [
      { protocol: "https", hostname: "s4.anilist.co" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "artworks.thetvdb.com" },
      { protocol: "https", hostname: "media.kitsu.io" },
      { protocol: "https", hostname: "media.kitsu.app" },
      { protocol: "https", hostname: "kitsu-production-media.s3.us-west-002.backblazeb2.com" },
      { protocol: "https", hostname: "media.themoviedb.org" },
    ],
  },

};

export default nextConfig;
