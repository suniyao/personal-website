'use client'
import { geologica, pixel } from "@/ui/fonts";
import PopUp from "@/components/PopUp";
import { TypeAnimation } from "react-type-animation";
export default function Home() {
  return (
    <main className="flex flex-col h-screen mx-20">
      <div className={`${geologica.className} flex flex-col font-semibold text-[100px]`}>
        <div>STEPHANIE</div>
        <div className="text-gray-400 -translate-y-15 flex flex-row gap-2">
          <div>YAO</div>
          <div>:&#41;</div>
        </div>
      </div>

      <div className="w-1/2">
        <div>
          <p>Hi! I'm Stephanie, an incoming freshman at the University of California, Berkeley, interested in math, computer science, and physics. Thanks for stopping by!</p>

            <ul>
            Besides academic interests, I also enjoy
              <li>listening to music of diverse genre (give me music recs!)</li>
              <li>playing random songs by ear on the piano with my relative pitch (never perfect 😔)</li>
              <li>badminton</li>
              <li>checking if i have friends live close to me and ask if they have time to meetup</li>
              <li>updating on recent life</li>
              <li>building small interesting projects to solve my own issues</li>
            </ul>
        </div>
      </div>
    </main>
  );
}
