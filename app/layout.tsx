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
      <body
        className={openSans.className}
      >
        <div className="absolute top-10 right-20 ">
          <NavBar />
        </div>
        {children}
      </body>
    </html>
  );
}
