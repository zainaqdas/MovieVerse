import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/partials/header/Header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserInfoProvider } from "@/context/UserInfoContext";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JadeScreen — Stream Movies & TV Shows",
  description:
    "JadeScreen is a modern, open-source streaming platform for movies and TV shows. Browse by genre, discover trending content, build watchlists, and stream from multiple servers — all with a beautiful emerald-green interface.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <UserInfoProvider>
          <Header />
          {children}
          <Analytics />
        </UserInfoProvider>

        <ToastContainer draggable theme="dark" />

      </body>
    </html>
  );
}
