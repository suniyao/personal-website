import { geologica } from "@/ui/fonts";

type CardProps = {
  title: string;
  link?: string;
  accentColor?: string;
  children: React.ReactNode;
};

export default function Card({title, link, accentColor, children}: CardProps) {
  const cardContent = (
    <div className={`border-black border-[3px] w-auto min-w-60 max-w-120 p-5 ${accentColor ? `hover:bg-${accentColor}` : link && `hover:bg-gray-200 dark:hover:bg-gray-800`} dark:border-white`}>
      <div className={`${geologica.className} flex flex-col font-semibold text-[35px] mb-3`}>
        {title}
      </div>
      <div className="text-[15px] flex flex-col gap-2">
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