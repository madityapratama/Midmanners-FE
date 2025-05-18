// components/ProtectedRoute.tsx
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user,loadingData } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loadingData && !user) {
      router.push("/auth/login");
    }
  }, [user, loadingData, router]);

  if (loadingData) return null;
  if (!user) return null; 

  return <>{children}</>;
}
