import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Elysium | AI Data Analysis",
  description:
    "Our language model is trained to analyse annual reports, financial statements, project data, and information memoranda.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <Providers>
        <html lang="en">
          <body className={inter.className}>
            <main>{children}</main>
            <Toaster />
          </body>
        </html>
      </Providers>
    </ClerkProvider>
  );
}
