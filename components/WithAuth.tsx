"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { ComponentType, useEffect } from "react";

export default function WithAuth<P extends object>(
  Component: ComponentType<P>
): ComponentType<P> {
  return function ProtectedRoute(props: P) {
    const router = useRouter();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
      if (!isAuthenticated) {
        router.push("/login");
      } else {
        router.push("/");
      }
    }, [isAuthenticated, router]);

    return <Component {...props} />;
  };
}
