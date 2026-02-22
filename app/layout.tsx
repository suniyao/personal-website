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
        <nav className="absolute inset-x-0 z-50 h-20 sm:h-30 flex items-center">
          <div className="max-w-7xl mx-auto flex justify-end w-full px-12 sm:px-10 lg:px-20">
            <div className="py-2">
              <NavBar />
            </div>
          </div>
        </nav>

        {/* Main Content - With proper spacing from edges */}
        <main className="flex-1 px-12 sm:px-10 lg:px-20 pt-20 sm:pt-24 pb-6 sm:pb-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

        {/* Footer - Consistent spacing */}
        <footer className="px-12 sm:px-10 lg:px-20 py-6 sm:py-8">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-[13px] sm:text-[15px] text-gray-600">
              © Copyright {new Date().getFullYear()} Stephanie Yao.
            </p>
          </div>
        </footer>
        <Analytics/>
          <script type="text/javascript">
          var sc_project=13192749; 
          var sc_invisible=1; 
          var sc_security="acf14ee8"; 
          </script>
          <script type="text/javascript"
          src="https://www.statcounter.com/counter/counter.js" async></script>
      </body>
    </html>
  );
}
