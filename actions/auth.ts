"server only";

import { redirect } from "next/navigation";
import { LoginFormSchema, FormState } from "@/lib/definitions";
import { createSession, deleteSession } from "@/lib/sessions";

export async function login(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = LoginFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Call the provider or db to login a user...
  await fetch("https://frontend-take-home-service.fetch.com/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: validatedFields.data.name,
      email: validatedFields.data.email,
    }),
    credentials: "include",
  });

  await createSession(validatedFields.data.name);

  redirect("/search");
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
}
