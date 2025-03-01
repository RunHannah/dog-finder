"use client";

import Link from "next/link";

export default function LoginLink() {
  return (
    <Link
      href="/login"
      className="ml-2 mr-2 text-green-600 hover:text-green-800"
    >
      Login
    </Link>
  );
}
