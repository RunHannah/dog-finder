"use client";

import { logout } from "../actions/auth";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="ml-2 mr-2 text-green-800 hover:text-green-950 hover:cursor-pointer"
    >
      Logout
    </button>
  );
}
