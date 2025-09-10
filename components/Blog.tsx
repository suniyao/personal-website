import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import 'katex/dist/katex.min.css';
import { formatDate } from '@/lib/formatDate'

type BlogProps = {
  id: string;
  date: string; // in "YYYY-MM-DD" format
  title: string;
  subtitle?: string;
  cover?: string;
}

export default function Blog({ id, date, title, subtitle, cover }: BlogProps) {

  return (
    <div className="flex flex-col w-245 px-15 hover:bg-gray-800 transition-colors py-5 px-auto">
      <div className="flex justify-between">
        {/* left side */}
        <a key={id} href={`/update/${id}`} className="w-160 flex flex-col justify-between" >
          <div>
            {title}
            {subtitle && (
              <div className="text-gray-400 italic text-[15px]">
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                  components={{
                    p: ({ children }) => <span>{children}</span>
                  }}>
                  {subtitle}
                </ReactMarkdown>
              </div>
            )}
          </div>
          {/* date goes to the bottom */}
          <div className="text-gray-500 text-sm font-mono">
            {formatDate(date)}
          </div>
        </a>

        {/* right side */}
        {cover && (
          <div className="w-[190] h-[130px] overflow-hidden rounded-md">
            <Image
              src={cover}
              alt="cover image"
              width={190}
              height={130}
              className="w-full h-full object-cover object-center"
            />
          </div>
        )}
      </div>
    </div>
  )
}
