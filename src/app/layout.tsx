import type { Metadata } from "next";
import { Inter, Lexend } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer";

const authors = [{
  name: "Dan Chanivet",
  role: "fullstack MERNT developer",
  website: "https://www.chanivetdan.tech",
  socials: [{
    name: "github",
    url: "https://www.github.com/flan02"
  },
  {
    name: "linkedin",
    url: "https://www.linkedin.com/in/dan-chanivet-574084b2/"
  }],
}]
const lexend = Lexend({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Triviathon AI",
  description: "Amazing app developed with OpenAI that challenges your knowledge!",
  authors: authors
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
        lexend.className,
        'antialiased '
      )}>
        <Providers>
          <Navbar />
          {children}
          <Toaster />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
