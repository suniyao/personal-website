import { geologica } from "@/ui/fonts";
import Image from "next/image";
import { getSortedPostsData } from "@/lib/posts";

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
      <div className="text-[20px] mt-10">
        <ul>
          {allPostsData.map(({ id, date, title, subtitle }: { id: string; date: string; title: string; subtitle: string; }) => (
            <li key={id}>
              {title}
              <br />
              {subtitle}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
