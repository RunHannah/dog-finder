"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/actions/auth";
import AuthButton from "./AuthButton";

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
    <AuthButton onClick={handleLogout}>
      {isPending ? "Logging out..." : "Logout"}
    </AuthButton>
  );
}
