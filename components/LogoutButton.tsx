"use client";

import { useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { logout } from "../actions/auth";

export default function LogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = async () => {
    try {
      const result = await logout();
      if (result.success) {
        startTransition(() => {});
      }
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  useEffect(() => {
    if (isPending === false) {
      router.push("/");
      router.refresh();
    }
  }, [isPending, router]);

  return (
    <button
      onClick={handleLogout}
      className="border-2 border-purple-950 mr-2 my-2 p-2 h-[55px] bg-white text-purple-950 w-[170px] rounded-4xl text-lg font-bold flex justify-center items-center hover:bg-purple-50"
    >
      Logout
    </button>
  );
}
