import { Button } from "@/components/ui/button";
import { pacifico } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Link from "next/link";

function Navbar() {
  return (
    <nav className="top-0 fixed w-full h-8 sm:h-12 bg-white shadow-md z-10">
      <section>
        <div className="w-24 h-24  hidden sm:block bg-white rounded-full -left-4 absolute shadow"></div>
        <div className="w-20 h-20  hidden sm:block bg-white rounded-full left-16 absolute shadow"></div>
        <div className="w-20 h-20  hidden sm:block bg-white rounded-full right-14 absolute shadow"></div>
        <div className="w-24 h-24 hidden sm:block bg-white rounded-full -right-3 absolute shadow"></div>
      </section>
      <div className="top-0 fixed w-full h-8 sm:h-12  justify-between bg-white z-20 flex items-center px-4">
        <h1
          className={cn(
            pacifico.className,
            "text-lg sm:text-xl text-zee-primary"
          )}
        >
          ZeeTask
        </h1>
        <Button
          asChild
          variant="zee"
          size="sm"
          className="py-1 px-4 rounded-full"
        >
          <Link href="/sign-in">Sign in</Link>
        </Button>
      </div>
    </nav>
  );
}

export default Navbar;
