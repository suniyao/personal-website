'use client'
import { geologica } from "@/ui/fonts";
import PopUp from "@/components/PopUp";
import { TypeAnimation } from "react-type-animation";
import { CustomLink } from "@/components/Links";
import Image from "next/image";
import SpotifyNowPlaying from "@/components/SpotifyNowPlaying";
import Socials from "@/components/Socials";
export default function Home() {
  return (
    <div>
      {/* Name Section */}
      <div className={`${geologica.className} flex flex-col font-semibold text-[40px] sm:text-[60px] md:text-[80px] lg:text-[100px]`}>
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
        <div className="text-gray-400 -translate-y-6 sm:-translate-y-10 md:-translate-y-15 flex flex-row gap-2 sm:gap-3 md:gap-5">
          <div>YAO</div>
          <div>:&#41;</div>
        </div>
      </div>

      

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-20">
        <div className="w-full lg:w-1/2 text-[16px] sm:text-[18px] md:text-[20px]">
          <div>
            <p>Hi! I'm Stephanie, currently a freshman at the University of California, Berkeley, interested in math, computer science, and physics. Thanks for stopping by!</p>

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
          <div className="mt-6 sm:mt-10">
            <Socials />
          </div>

          {/* Image First on Mobile */}
          <div className="flex justify-center lg:hidden mb-6">
            <div className="relative cursor-pointer max-w-full w-full">
              <Image src={"/image.png"} alt="sleepy kitty" width={500} height={400} className="rounded-lg w-full h-auto"/>
            </div>
          </div>

          <div className="mt-6 sm:mt-10 lg:mt-45">
            <SpotifyNowPlaying />
          </div>
        </div>
        
        {/* Image for Desktop Only */}
        <div className="hidden lg:flex justify-center lg:justify-end w-full lg:w-auto">
          <div className="relative group lg:-top-45 cursor-pointer max-w-full w-full">
            <Image src={"/image.png"} alt="sleepy kitty" width={500} height={400} className="rounded-lg w-full h-auto"/>
            {/* <Image 
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
            </video> */}
          </div>
        </div>
      </div>
    </div>
  );
}
