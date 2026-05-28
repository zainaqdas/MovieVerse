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
  description: "Discover, stream, and explore your favorite movies and TV shows on JadeScreen.",
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
