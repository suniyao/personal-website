import { geologica } from "@/ui/fonts";

type CardProps = {
  title: string;
  link?: string;
  accentColor?: string;
  children: React.ReactNode;
  parallel?: React.ReactNode;
};

export default function Card({title, link, accentColor, children, parallel}: CardProps) {
  const content = (
    <>
      <div className={`${geologica.className} flex flex-row items-start justify-between gap-3 font-semibold text-[24px] sm:text-[28px] md:text-[35px] leading-tight mb-2 sm:mb-3`}>
        <div className="flex-1">
          {title}
        </div>
        {parallel && (
          <div className="shrink-0 self-start leading-none mt-2">
            {parallel}
          </div>
        )}
      </div>
      <div className="text-[14px] sm:text-[15px] flex flex-col gap-2">
        {children}
      </div>
    </>
  );

  return (
    <div className={`border-black border-[2px] sm:border-[3px] w-full p-4 sm:p-5 transition-colors duration-200 ${accentColor ? `hover:bg-${accentColor}` : link && `hover:bg-gray-200 dark:hover:bg-gray-800`} dark:border-white break-inside-avoid mb-6 sm:mb-8 md:mb-10`}>
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer" className="block">
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  );
}