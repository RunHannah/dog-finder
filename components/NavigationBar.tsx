import Link from "next/link";
import { cookies } from "next/headers";
import LoginLink from "./LoginLink";
import LogoutButton from "./LogoutButton";

export default async function AuthNav() {
  const cookieStore = await cookies();
  const isAuthenticated = !!cookieStore.get("session");

  return (
    <nav className="flex flex-row justify-end">
      <Link className="ml-2 mr-2" href="/">
        Home
      </Link>
      {isAuthenticated ? <LogoutButton /> : <LoginLink />}
    </nav>
  );
}
