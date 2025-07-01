import type { Metadata } from "next";
import "@/ui/styles/globals.css"
import { openSans } from "@/ui/fonts";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "stephanie's shelf",
  description: "Personal website of Suni Stephanie Yao",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={openSans.className}
      >
        <div className="absolute top-40 left-1/2 transform -translate-x-1/2 lg:top-1/2 lg:left-20 lg:translate-y-[-50%]">
          <div className="flex flex-col items-center">
            <NavBar />
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
