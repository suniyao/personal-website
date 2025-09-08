import { geologica } from "@/ui/fonts";
import Image from "next/image";
import { getSortedPostsData } from "@/lib/posts";
import Blog from "@/components/Blog";

export default async function Update() {
  const allPostsData = await getSortedPostsData();

  return (
    <div>
      <div className={`${geologica.className} flex flex-col font-semibold text-[100px]`}>
        UPDATES
      </div>
      <a
        href="https://scrapbook.hackclub.com/stephanie"
        className="flag-link absolute -left-2"
      >
        <Image
          src="https://assets.hackclub.com/flag-orpheus-left.svg"
          alt="Logo"
          width={100}
          height={100}
        />
      </a>
      <div className="">
        <div className="flex flex-col items-center divide-y divide-gray-700">
          {allPostsData.map(({ id, date, title, subtitle, cover }: { id: string; date: string; title: string; subtitle: string; cover: string;}) => (
            <Blog key={id} id={id} date={date} title={title} subtitle={subtitle} cover={cover} />
          ))}
        </div>
      </div>
    </div>
  );
}
