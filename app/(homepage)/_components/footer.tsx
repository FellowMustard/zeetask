import { Button } from "@/components/ui/button";

function Footer() {
  return (
    <footer className="bottom-0 fixed py-1 px-2 flex justify-end gap-2 bg-white w-screen">
      <Button variant="ghost" className="font-bold py-1 h-fit">
        Privacy Policy
      </Button>
    </footer>
  );
}

export default Footer;
