"use server";

import { z } from "zod";
import { cookies } from "next/headers";
import { LoginFormSchema } from "@/lib/definitions";
import { createSession, deleteSession } from "@/lib/sessions";

export type LoginFormState = { success: boolean; errors?: undefined };

export async function login({
  name,
  email,
}: z.infer<typeof LoginFormSchema>): Promise<LoginFormState> {
  const response = await fetch(
    "https://frontend-take-home-service.fetch.com/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
      }),
      credentials: "include",
    }
  );

  if (!response.ok) {
    return {
      success: false,
    };
  }

  const setCookieHeader = response.headers.get("set-cookie") || "";
  await createSession(setCookieHeader);

  return { success: true };
}

export async function logout() {
  const cookieStore = await cookies();
  const token = cookieStore.get("fetch-access-token")?.value;

  const response = await fetch(
    "https://frontend-take-home-service.fetch.com/auth/logout",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `fetch-access-token=${token}`,
      },
    }
  );

  if (!response.ok) {
    return {
      success: false,
    };
  }

  deleteSession();

  return { success: true };
}
