import { Button } from "@/components/ui/button";
import { Footer } from "@/components/ui/footer";
import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <div className="bg-black h-screen flex justify-center">
        <div className="pt-32 w-10/12 md:w-6/12">
          <div className="flex flex-col space-y-16">
            <Link href="/">
              <h1 className="text-6xl font-bold tracking-tight">CLIPHUB</h1>
            </Link>
            <h2 className="text-base tracking-wider text-muted-foreground">
              Hast du Dich verirrt? Diese Seite gibt es gar nicht.
            </h2>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
