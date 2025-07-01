import PopUp from "@/components/PopUp";
import { pixel } from "@/ui/fonts";

export default function Writings(){
  return (
    <main>
      <div className="flex flex-col items-center gap-6 px-6 py-10 text-gray-800 dark:text-gray-100">
        {/* Name Header */}
        <h1 className="text-[70px] font-bold text-center leading-tight">
          writings
        </h1>
        {/* Pixel Welcome Note */}
        <div className={`${pixel.className} absolute top-35 text-center text-sm text-gray-500 dark:text-gray-400`}>
          salt, thoughts
        </div>
        <section className="max-w-2xl mt-20 space-y-5 text-lg leading-relaxed">
          <h2>
            blogs
          </h2>
          <ul className="list-disc list-inside space-y-1 pl-1">
            <li>2024/10 <a href="https://open.substack.com/pub/stepyao/p/chord-29-overtone-41-notes-116?r=2ms5j6&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true"><b>chord (29), overtone (41), notes (116)</b></a> | is the thing i type the most frequently for the first half september and now it's over</li>
            <li>2024/8 <a href="https://open.substack.com/pub/stepyao/p/gravityless-raindrops-on-the-window?r=2ms5j6&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true"><b>Reflection for ESPR '24</b></a> | How have you been feeling so far? Oh, it has been <i>badass</i>... [Caution: informal]</li>
            <li>2024/7/28 <a href="writings/ross_reflection_24.html"><b>Reflection to Prologue | Ross '24</b></a></li>
            <li>2023/12 Star & Blackhole</li>
            <li>2023/9 Holding Different Opinions - Current Situation for Girls Taking STEM Courses</li>
            <li>2023/7/30 <a href="writings/ross_reflection_23.html"><b>Reflection to Prologue | Ross '23</b></a></li>
          </ul>
        </section>
      </div>
    </main>
  )
}