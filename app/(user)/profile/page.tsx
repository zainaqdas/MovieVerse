"use client"
import { useUserInfoContext } from "@/context/UserInfoContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const Page = () => {
  const { isUserLoggedIn, loading } = useUserInfoContext();
  const router = useRouter()

  useEffect(() => {
    if (!isUserLoggedIn && !loading) {
      router.push('/');
    }
  }, [isUserLoggedIn, loading, router]);

  return null;
}

export default Page