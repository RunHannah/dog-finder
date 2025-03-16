"use server";

import { cookies } from "next/headers";

export async function createSession(setCookieHeader: string) {
  const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours
  const cookieStore = await cookies();

  if (setCookieHeader) {
    const setCookie = setCookieHeader.split(";")[0]; // fetch-access-token
    const setCookieParts = setCookie.split("=");
    const name = setCookieParts[0];
    const value = setCookieParts[1];

    cookieStore.set(name, value, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: "none",
      path: "/",
    });
  }
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("fetch-access-token");
}
