import type { Metadata } from "next";
import "@/ui/styles/globals.css"
import { openSans } from "@/ui/fonts";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "Suni Stephanie Yao",
  description: "Personal website of Suni Stephanie Yao",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={openSans.className + " min-h-screen flex flex-col"}>
        {/* <div className="absolute top-10 right-20">
          <NavBar />
        </div> */}
        <main className="flex-1">
          {children}
        </main>
        <footer className="text-white mt-8 md:mt-16 pl-12 md:pl-20 mb-5 flex flex-col space-y-4 text-xs sm:text-sm">
          <div className="mt-20">
            Copyright {new Date().getFullYear()} Stephanie Yao.
          </div>
        </footer>
      </body>
    </html>
  );
}
