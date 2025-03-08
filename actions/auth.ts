"server only";

import { z } from "zod";
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

  await createSession(name);

  return { success: true };
}

export async function logout() {
  await fetch("https://frontend-take-home-service.fetch.com/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  deleteSession();

  return { success: true };
}
