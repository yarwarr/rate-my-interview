import Link from "next/link";
import { Icons } from "./Icons";
import { buttonVariants } from "./ui/Button";
import { getAuthSession } from "../lib/auth/index";
import UserAccountNav from "./UserAccountNav";
import { ModeToggle } from "./ui/darkmode";
import { Combobox } from "./combobox";
const Navbar = async () => {
    const session = await getAuthSession()
    return (
        <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2">
            <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
                {/* logo */}
                <Link href="/" className="flex gap-2 items-center">
                    <Icons.logo className="h-8 w-8 sm:h-6 sm:w-6" />
                    <p className="hidden text-zinc-700 text-sm font-medium md:block">
                        Rate
                    </p>
                </Link>
                <Link href="/company" className="flex gap-2 items-center">
                    <p className="hidden text-zinc-700 text-sm font-medium md:block">
                        Companies
                    </p>
                </Link>
                <div className="flex gap-2 items-center">
                    <Combobox />
                </div>
                

                {/* search bar */}

                {session?.user ? (
                    <UserAccountNav user={session.user} />
                ) : (
                    <Link href='/sign-in' className={buttonVariants({
                        size: "sm",
                      })}>Sign In</Link>
                )}
                <ModeToggle />

            </div>
        </div>
    );
};

export default Navbar;
