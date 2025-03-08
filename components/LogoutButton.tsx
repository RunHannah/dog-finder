"use client";

import { useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import { logout } from "../actions/auth";
import { Button } from "./ui/button";

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
    <Button
      onClick={handleLogout}
      className="border-2 border-purple-950 mr-2 my-2 p-2 h-[55px] bg-purple-50 text-purple-900 w-[170px] rounded-4xl text-lg font-bold flex justify-center items-center hover:text-white hover:bg-purple-900 cursor-pointer"
      variant="outline"
    >
      Logout
    </Button>
  );
}
