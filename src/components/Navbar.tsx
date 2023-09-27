import Link from "next/link";
import { Icons } from "./Icons";
import { buttonVariants } from "./ui/Button";
import UserAccountNav from "./UserAccountNav";
import { Combobox } from "./combobox";
import { ThemeToggle } from "./layouts/theme-toggle";
import { getAuthSession} from "@/lib/auth";

const Navbar = async () => {
  const session = await getAuthSession();
  return (
    <div className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <div className="hidden gap-6 lg:flex">
          {/* logo */}
          <Link href="/" className="hidden items-center space-x-2 lg:flex">
            <Icons.logo className="h-6 w-6" />
            <p className="hidden font-bold lg:inline-block">
              Rate My Interview
            </p>
          </Link>
          <Link href="/company" className="flex gap-2 items-center">
            <p className="hidden dark:text-zinc-300 text-sm font-medium md:block">
              Companies
            </p>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <div className="flex gap-2 items-center">
              <Combobox />
            </div>

            {/* search bar */}

            {session?.user ? (
              <UserAccountNav user={session.user} />
            ) : (
              <Link
                href="/sign-in"
                className={buttonVariants({
                  size: "sm",
                })}
              >
                Sign In
              </Link>
            )}
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
