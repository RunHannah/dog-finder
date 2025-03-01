"use server";

import { validateEmail } from "@/lib/utils";

const API_URL = process.env.API_URL;

export async function login({ name, email }: { name: string; email: string }) {
  try {
    if (!name || !email || !validateEmail(email)) {
      throw new Error("Invalid name or email");
    }

    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
      }),
      credentials: "include",
    });

    console.log("login response", response);

    if (!response.ok) {
      return {
        success: false,
        message: response.statusText,
      };
    }

    return {
      success: response.ok,
      message: "Login successful",
    };
  } catch (error) {
    console.log(error);
  }
}

export async function logout() {
  try {
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Logout failed");
    }

    return {
      success: true,
      message: "Logged out successfully",
    };
  } catch (error) {
    console.log("Logout error:", error);
  }
}
