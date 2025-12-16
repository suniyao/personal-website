import type { Metadata } from "next";
import "@/ui/styles/globals.css"
import { openSans } from "@/ui/fonts";
import NavBar from "@/components/NavBar";
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: "Stephanie Yao",
  description: "personal website of Stephanie Yao, a math / design / building enjoyer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${openSans.className} h-full flex flex-col text-gray-900`}>
        <nav className="absolute inset-x-0 z-50 h-30 flex items-center">
          <div className="max-w-7xl mx-auto flex justify-end w-full sm:px-10 lg:px-20">
            <div className="py-2">
              <NavBar />
            </div>
          </div>
        </nav>

        {/* Main Content - With proper spacing from edges */}
        <main className="flex-1 px-5 sm:px-10 lg:px-20 pt-24 pb-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

        {/* Footer - Consistent spacing */}
        <footer className="px-5 sm:px-10 lg:px-20 py-8">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-[15px] text-gray-600">
              © Copyright {new Date().getFullYear()} Stephanie Yao.
            </p>
          </div>
        </footer>
        <Analytics/>
      </body>
    </html>
  );
}
