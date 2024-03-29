import FileUpload from "@/components/FileUpload";
import SubscriptionButton from "@/components/SubscriptionButton";
import { Button, buttonVariants } from "@/components/ui/button";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { checkSubscription } from "@/lib/subscription";
import { UserButton, auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { ArrowRight, FolderOpen, LogIn } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();
  const isAuthenticated = !!userId;
  const isPro = await checkSubscription();
  let firstChat;
  if (userId) {
    firstChat = await db.select().from(chats).where(eq(chats.userId, userId));
  }
  if (firstChat) {
    firstChat = firstChat[0];
  }
  return (
    <div className="w-screen h-screen bg-background">
      <nav className="container fixed inset-0 w-screen h-20 flex flex-row items-center justify-between z-50">
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
          <div className="flex flex-row gap-4 mt-2">
            {isAuthenticated && firstChat && (
              <Link
                href={`/chat/${firstChat.id}`}
                className={`${buttonVariants({
                  variant: "default",
                  size: "lg",
                })} active:scale-95 transition-transform duration-75`}
              >
                View your reports <FolderOpen className="ml-2 w-4 h-4" />
              </Link>
            )}

            <SubscriptionButton isPro={isPro} />
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
