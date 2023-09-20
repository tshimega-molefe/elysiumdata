import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import { LogIn } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();
  const isAuthenticated = !!userId;
  return (
    <div className="w-screen min-h-screen bg-primary">
      <nav className=" container fixed top-0 left-0 w-full h-20 flex flex-row items-center justify-between z-50">
        <h1 className="font-semibold capitalize text-3xl">Elysium</h1>
        <UserButton afterSignOutUrl="/" />
      </nav>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center max-sm:gap-6 sm:gap-10">
          <div className="flex items-center">
            <h1 className="mr-3 md:text-5xl text-xl font-semibold">
              Analyse Financial Data
            </h1>
          </div>

          <div className="flex mt-2">
            {isAuthenticated && (
              <Button variant="secondary" size="lg">
                Go to your reports
              </Button>
            )}
          </div>

          <p className="max-w-xl mt-1 md:text-lg text-sm text-muted-foreground">
            Instantly review reports, financial statements, and generate
            context-aware analysis, projections, and risk evaluations.
          </p>

          <div className="w-full mt-4">
            {isAuthenticated ? (
              <FileUpload />
            ) : (
              <Link href="/sign-in">
                <Button variant="default" size="lg">
                  Get Started <LogIn className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
