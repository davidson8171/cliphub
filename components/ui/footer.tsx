import Link from "next/link";

export function Footer() {
  return (
    <div className="sticky top-[100vh] w-full flex justify-center bg-black pb-12 z-30 pt-32 lg:pt-0">
      <div className="w-10/12 lg:w-6/12">
        <div className="flex flex-col md:flex-row justify-between space-y-4">
          <Link href="/">
            <h2 className="text-sm font-normal tracking-wide text-muted-foreground">
              CLIPHUBAGENCY.DE
            </h2>
          </Link>
          <div className="flex justify-between space-x-8">
            <div className="flex flex-col space-y-2">
              <h2 className="text-sm font-normal tracking-wide text-muted-foreground">
                Kontakt
              </h2>
              <p className="text-xs font-light tracking-wide">
                kontakt@cliphubagency.de
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              <h2 className="text-sm font-normal tracking-wide text-muted-foreground">
                Rechtliches
              </h2>
              <Link href={"/impressum"} className="hover:underline">
                <p className="text-xs font-light tracking-wide">Impressum</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
