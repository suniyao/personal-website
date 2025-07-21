'use client'
import { pixel } from "@/ui/fonts";
import PopUp from "@/components/PopUp";
import TypingText from "@/components/TypingText";
import { TypeAnimation } from "react-type-animation";
export default function Home() {
  return (
    <main>

      <div className="flex flex-col items-center gap-6 px-6 py-10 text-gray-800 dark:text-gray-100">
        {/* Name Header */}
        <h1 className="text-[70px] font-bold text-center">
         <TypeAnimation
          sequence={[
            // Same substring at the start will only be typed once, initially
            'suni',
            1000,
            'stephanie',
            1000,
          ]}
          speed={25}
          repeat={Infinity}
        />
        <span className="translate -translate-x-50">yao</span>
        </h1>
        {/* Pixel Welcome Note */}
        <div className={`${pixel.className} absolute top-35 text-center text-sm text-gray-500 dark:text-gray-400`}>
          welcome to my page
        </div>


        {/* Intro Paragraphs */}
        <section className="max-w-2xl mt-20 space-y-5 text-lg leading-relaxed">
          <p>
            I&apos;m an incoming freshman at the{" "}
            <span className="font-semibold">University of California, Berkeley</span>, interested in <strong>math</strong>, <strong>physics</strong>
            <span className="line-through text-gray-500">, and CS</span>.
          </p>

          <p>
            <TypingText text="i love math, coffee, and cats" />
            I especially love math and plan to major in <strong>pure math</strong>. My favorite areas are <em>geometry</em> and <em>number theory</em>.
          </p>

          <div>
            <p className="mb-2">Besides math, I also enjoy:</p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li>Listening to J-POP, C-POP, R&B, and diverse music</li>
              <li>
                Playing random songs by ear on the piano with my{" "}
                <PopUp note="never perfect 😔">relative pitch</PopUp>
              </li>
              <li>Playing badminton</li>
              <li>Trying to liveTeX math lecture notes</li>
            </ul>
          </div>
        </section>

        {/* Divider */}
        <div className="w-20 h-0.5 bg-gray-300 dark:bg-gray-600 my-10" />

        <h2 className="text-xl font-semibold tracking-wide uppercase text-center text-gray-700 dark:text-gray-300">
          my ambitious dreams
        </h2>
      </div>
    </main>
  );
}
