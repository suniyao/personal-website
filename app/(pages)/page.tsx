'use client'
import { geologica } from "@/ui/fonts";
import PopUp from "@/components/PopUp";
import { TypeAnimation } from "react-type-animation";
import { CustomLink } from "@/components/Links";
import Image from "next/image";
import SpotifyNowPlaying from "@/components/SpotifyNowPlaying";
export default function Home() {
  return (
    <div>
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
      <div className="flex flex-row gap-20">
        <div className="w-1/2 text-[20px]">
          <div>
            <p>Hi! I'm Stephanie, an incoming freshman at the University of California, Berkeley, interested in math, computer science, and physics. Thanks for stopping by!</p>

              <ul className="list-disc list-inside mt-4 space-y-1">
                Besides academic interests, I also enjoy
                <li>listening to music of diverse genre (<CustomLink href="https://forms.gle/kpRzsb7AGki6TLdJ6">give me music recs!)</CustomLink></li>
                <li><CustomLink href={"/project"}>building</CustomLink> <CustomLink href="https://prime-hunt.vercel.app">small</CustomLink> interesting projects</li>
                <li>badminton</li>
                <li><CustomLink href={"/update"}>updating</CustomLink> on recent life</li>
                <li>checking if i have friends live close to me and ask if they have time to meetup</li>
                <li>playing random songs on the piano with my <PopUp note="(never perfect 😔)">relative pitch</PopUp></li>
              </ul>
          </div>
          <div className="mt-45">
            <SpotifyNowPlaying />
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <div className="relative group -top-45 cursor-pointer max-w-full w-full">
            <Image 
              src={"/about.png"} 
              alt="on Brooklyn Bridge, photo taken on Jul 26, 2025" 
              width={500} 
              height={1000} 
              className="rounded-lg group-hover:opacity-0 transition-opacity duration-300"
            />
            <video 
              className="absolute inset-0 rounded-lg object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              width={500}
              height={1000}
              loop
              muted
              playsInline
              onMouseEnter={(e) => e.currentTarget.play()}
              onMouseLeave={(e) => {
                e.currentTarget.pause();
                e.currentTarget.currentTime = 0;
              }}
              >
              <source src="/live.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </div>
  );
}
