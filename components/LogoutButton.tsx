"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/actions/auth";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = async () => {
    try {
      startTransition(async () => {
        const result = await logout();
        if (result.success) {
          router.push("/");
          router.refresh();
        } else {
          console.error("Logout returned unsuccessful");
        }
      });
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      className="border-2 border-purple-950 mr-2 my-2 p-2 h-[55px] bg-purple-50 text-purple-900 w-[170px] rounded-4xl text-lg font-bold flex justify-center items-center hover:text-white hover:bg-purple-900 cursor-pointer"
      variant="outline"
    >
      {isPending ? "Logging out..." : "Logout"}
    </Button>
  );
}
