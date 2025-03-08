import Link from "next/link";
import { cookies } from "next/headers";
import LoginDialog from "./LoginDialog";
import LogoutButton from "./LogoutButton";

export default async function Header() {
  const cookieStore = await cookies();
  const isAuthenticated = !!cookieStore.get("session");

  return (
    <header className="w-full">
      <div className="flex flex-row justify-between items-center max-w-[1400px] m-auto">
        <Link
          className="font-logo text-4xl m-2 pt-0.5 text-purple-900"
          href="/"
        >
          dog finder
        </Link>
        {isAuthenticated ? <LogoutButton /> : <LoginDialog />}
      </div>
    </header>
  );
}
