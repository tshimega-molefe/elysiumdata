import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";

export default async function Home() {
  const { userId } = await auth();
  const isAuthenticated = !!userId;
  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 md:text-5xl text-2xl font-semibold">
              Analyse any data:
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

          <p>
            Instantly review integrated reports, financial statements, and
            generate context aware analysis, recommendations, and risk
            evaluations.
          </p>
        </div>
      </div>
    </div>
  );
}
