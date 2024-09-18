import { Button } from "@/components/ui/button";
import { pacifico } from "@/lib/fonts";
import { cn } from "@/lib/utils";

function HomePage() {
  return (
    <div>
      <div className="min-h-screen flex justify-center items-center flex-col">
        <h1 className="text-xl sm:text-3xl font-semibold text-zee-primary">
          Organize Your Workflow,
        </h1>
        <h1 className="text-xl sm:text-3xl font-semibold mt-2 text-zee-primary">
          Simplify Your
          <span className="bg-zee-secondary text-white px-2 mx-2 ">
            Success
          </span>
          .
        </h1>
        <p className="text-white text-lg font-semibold">with</p>
        <p
          className={cn(
            pacifico.className,
            "text-white text-3xl sm:text-5xl italic relative"
          )}
        >
          ZeeTask
          <span className="absolute -bottom-2 rounded-full w-full block h-1 bg-zee-secondary" />
        </p>
        <Button
          variant="zee"
          className="mt-8 rounded-full text-base font-medium"
        >
          Get ZeeTask for free now
        </Button>
      </div>
    </div>
  );
}

export default HomePage;
