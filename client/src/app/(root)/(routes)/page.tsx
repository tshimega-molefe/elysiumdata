import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import { LogIn } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();
  const isAuthenticated = !!userId;
  return (
    <div className="w-screen min-h-screen">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 md:text-5xl text-2xl font-semibold">
              Analyse financial data
            </h1>
            <UserButton afterSignOutUrl="/" />
          </div>

          <div className="flex mt-2">
            {isAuthenticated && (
              <Button variant="default" size="lg">
                View Reports
              </Button>
            )}
          </div>

          <p className="max-w-xl mt-1 text-lg text-muted-foreground">
            Instantly review reports, financial statements, and generate
            context-aware analysis, projections, and risk evaluations.
          </p>

          <div className="w-full mt-4">
            {isAuthenticated ? (
              <Button>File Upload Component</Button>
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
