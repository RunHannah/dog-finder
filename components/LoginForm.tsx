"use client";

import { login } from "@/actions/auth";
import { useActionState } from "react";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <form
      className="flex flex-col justify-center items-center mt-20 ml-auto mr-auto w-[500px]"
      action={action}
    >
      <div>
        <label htmlFor="name">Name</label>
        <input
          className="border p-2 mb-4 w-full"
          id="name"
          name="name"
          placeholder="Name"
        />
      </div>
      {state?.errors?.name && <p>{state.errors.name}</p>}
      <div>
        <label htmlFor="email">Email</label>
        <input
          className="border p-2 mb-4 w-full"
          id="email"
          name="email"
          type="email"
          placeholder="Email"
        />
      </div>
      {state?.errors?.email && <p>{state.errors.email}</p>}

      <button
        className="bg-purple-800 hover:cursor-pointer text-white px-4 py-2"
        disabled={pending}
        type="submit"
      >
        Login
      </button>
    </form>
  );
}
