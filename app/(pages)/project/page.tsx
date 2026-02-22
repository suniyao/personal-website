import { geologica } from "@/ui/fonts";
import Card from "@/components/Card";
import { SiObsidian } from "react-icons/si";
import { CustomLink } from "@/components/Links";
export default function Project(){
  return (
    <div>
      <div className={`${geologica.className} flex flex-col font-semibold text-[40px] sm:text-[60px] md:text-[80px] lg:text-[100px]`}>
        PROJECTS
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 mt-6 sm:mt-8 md:mt-10 w-full items-stretch justify-items-center">
        <Card title="Graphene" link="https://github.com/suniyao/graphene">
          <p>
            An Obsidian plugin that makes semantic graph view based on content similarity using vector embeddings, with local vector embedding supported by sentence-transformers python package and alternative OpenAI embedding model, and various options for graph appearance setting including particle animation, link thickness, etc.
          </p>
        </Card>

        <Card title="PathTogether" link="https://github.com/suniyao/pathtogether">
          <p>
           A web application used to make everyone stay connected after working together, whether as classmate or alumni, co-campers or online friends in the same server, by generating a common map session code and save everyone's location there after filling out.
          </p>
        </Card>

        <Card title="Prime Hunt" link="https://prime-hunt.vercel.app">
          <p>
            A daily game inspired by word hunt but instead of searching for words you search for primes, built for nerds.
          </p>
          <p>
            Connect digits from 0 to 9 by dragging across the grid. Form numbers that are prime. The more digits, the better the score.
          </p>
        </Card>

        <Card title="Better Problem Set Template" link="https://github.com/suniyao/Better-LaTeX-Problem-Set-Template">
          <p>
            A specialized LaTeX template designed for mathematical problem sets and homework assignments, featuring enhanced environments optimized for academic mathematical writing, prioritizing readability and structure while maintaining academic formatting standards.
          </p>
        </Card>

        <Card title="FFT Music Note Extraction">
          <p>
            A project on extracting musical notes from audio as an improvement of direct Fourier transform, inspired by <CustomLink href="https://www.youtube.com/watch?v=rj9NOiFLxWA">Extract Musical Notes from Audio in Python with FFT</CustomLink> but with a better approach to determine the fundamental notes played
          </p>
        </Card>

        <Card title="dis-record" link="https://github.com/suniyao/dis-record">
          <p>
            Script for a discord bot to record one user's activity including status (i.e. online, offline, dnd), activity (listening to spotify and which songs, etc.)
          </p>
          <p>
            ATT: user must be in the same server as the bot, and the bot must have permission to read the user's activity.
          </p>
        </Card>
      </div>
    </div>
  )
}