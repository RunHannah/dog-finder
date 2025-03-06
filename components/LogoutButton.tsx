"use client";

import { logout } from "../actions/auth";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.refresh();
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="border-2 border-purple-950 mr-2 my-2 p-2 h-[55px] bg-white text-purple-950 w-[170px] rounded-4xl text-lg font-bold flex justify-center items-center hover:bg-purple-50"
    >
      Logout
    </button>
  );
}
