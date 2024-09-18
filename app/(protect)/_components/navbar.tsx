import { Button } from "@/components/ui/button";
import { pacifico } from "@/lib/fonts";
import { IoMdAdd } from "react-icons/io";
import { cn } from "@/lib/utils";

function Navbar() {
  return (
    <nav className="top-0 fixed w-full h-8 sm:h-12 bg-white shadow-md z-10">
      <div className="flex items-center h-full gap-x-4">
        <h1
          className={cn(
            pacifico.className,
            "text-lg sm:text-xl text-zee-primary"
          )}
        >
          ZeeTask
        </h1>
        <Button
          size="sm"
          variant="zeeprimary"
          className="flex rounded-md w-8 h-8 p-2 hover:w-20 gap-2 transition-all group"
        >
          <IoMdAdd className="text-lg" />
          <p className="hidden group-hover:block text-sm font-semibold">
            Create
          </p>
        </Button>
      </div>
    </nav>
  );
}

export default Navbar;
