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
    <div className="flex flex-col w-full max-w-245 px-3 sm:px-8 md:px-15 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors py-4 sm:py-5 px-auto">
      <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
        {/* left side */}
        <a key={id} href={`/update/${id}`} className="w-full sm:w-160 flex flex-col justify-between" >
          <div>
            <div className="text-[16px] sm:text-[18px] md:text-base">{title}</div>
            {subtitle && (
              <div className="text-gray-400 italic text-[13px] sm:text-[14px] md:text-[15px]">
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
          <div className="text-gray-500 text-xs sm:text-sm font-mono date mt-2 sm:mt-0">
            {formatDate(date)}
          </div>
        </a>

        {/* right side */}
        {cover && (
          <div className="w-full sm:w-[190px] sm:h-[130px] overflow-hidden rounded-md shrink-0">
            <Image
              src={cover}
              alt="cover image"
              width={190}
              height={130}
              className="w-full h-auto sm:h-full object-cover object-center"
            />
          </div>
        )}
      </div>
    </div>
  )
}
