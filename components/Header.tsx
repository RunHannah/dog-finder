import Link from "next/link";
import { cookies } from "next/headers";
import LoginDialog from "./LoginDialog";
import LogoutButton from "./LogoutButton";

export default async function Header() {
  const cookieStore = await cookies();
  const isAuthenticated = !!cookieStore.get("session");

  return (
    <header className="flex flex-row justify-between">
      <Link className="font-logo text-4xl m-2 text-purple-900" href="/">
        dog finder
      </Link>
      {isAuthenticated ? <LogoutButton /> : <LoginDialog />}
    </header>
  );
}
