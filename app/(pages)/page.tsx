'use client'
import { geologica, pixel } from "@/ui/fonts";
import PopUp from "@/components/PopUp";
import { TypeAnimation } from "react-type-animation";
import Link from "@/components/Link"
export default function Home() {
  return (
    <main className="flex flex-col h-screen mx-20">
      <div className={`${geologica.className} flex flex-col font-semibold text-[100px]`}>
        <div>
          <TypeAnimation
            preRenderFirstString={true}
            sequence={[
              1000,
              'STEPHANIE', // initially rendered starting point
              3000,
              'SUNI',
              1000,
            ]}
            speed={50}
            repeat={Infinity}
          />
        </div>
        <div className="text-gray-400 -translate-y-15 flex flex-row gap-5">
          <div>YAO</div>
          <div>:&#41;</div>
        </div>
      </div>

      <div className="w-1/2 text-[20px]">
        <div>
          <p>Hi! I'm Stephanie, an incoming freshman at the University of California, Berkeley, interested in math, computer science, and physics. Thanks for stopping by!</p>

            <ul className="list-disc list-inside mt-4 space-y-1">
              Besides academic interests, I also enjoy
              <li>listening to music of diverse genre (<Link href="https://forms.gle/kpRzsb7AGki6TLdJ6">give me music recs!)</Link></li>
              <li><Link href={"/project"}>building</Link> <Link href="https://prime-hunt.vercel.app">small</Link> interesting projects</li>
              <li>badminton</li>
              <li>playing random songs on the piano with my <PopUp note="(never perfect 😔)">relative pitch</PopUp></li>
              <li>checking if i have friends live close to me and ask if they have time to meetup</li>
              <li><Link href={"/update"}>updating</Link> on recent life</li>
            </ul>
        </div>
      </div>
    </main>
  );
}
