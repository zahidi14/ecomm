import { useAuth } from "@/context/AuthContect";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const { curRentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!curRentUser) {
      router.push("/auth/signin");
    }
  }, [curRentUser, router]);

  if (!curRentUser) {
    return null;
  }
  return children;
}
