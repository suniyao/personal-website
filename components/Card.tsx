import { geologica } from "@/ui/fonts";

type CardProps = {
  title: string;
  link?: string;
  accentColor?: string;
  children: React.ReactNode;
};

export default function Card({title, link, accentColor, children}: CardProps) {
  const cardContent = (
    <div className={`border-black border-[2px] sm:border-[3px] w-full sm:w-auto min-w-0 sm:min-w-60 max-w-120 p-4 sm:p-5 ${accentColor ? `hover:bg-${accentColor}` : link && `hover:bg-gray-200 dark:hover:bg-gray-800`} dark:border-white`}>
      <div className={`${geologica.className} flex flex-col font-semibold text-[24px] sm:text-[28px] md:text-[35px] mb-2 sm:mb-3`}>
        {title}
      </div>
      <div className="text-[14px] sm:text-[15px] flex flex-col gap-2">
        {children}
      </div>
    </div>
  );
  return link ? (
    <a href={link} target="_blank" rel="noopener noreferrer">
      {cardContent}
    </a>
  ) : cardContent;
}