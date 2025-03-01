"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import withAuth from "@/components/WithAuth";

function LoginPage() {
  const { loginUser } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await loginUser(name, email);
      router.push("/search");
    } catch (error) {
      console.log("login error", error);
      setErrorMessage("Login failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col m-auto max-w-2xs mt-28">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Name (fake name)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <input
          type="email"
          placeholder="Email (fake email)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <button
          type="submit"
          className="bg-green-700 text-white font-bold px-4 py-2"
        >
          Login
        </button>
        {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}
      </form>
    </div>
  );
}

export default withAuth(LoginPage);
