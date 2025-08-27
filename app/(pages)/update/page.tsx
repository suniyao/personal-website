import { geologica } from "@/ui/fonts";
import Image from "next/image";

export default function Update(){
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
      <Image
        src={"/under_construction.png"}
        alt="under construction"
        width={400}
        height={400}
        className="items-center justify-center m-auto"
        />
      <div className="relative -top-30 text-[15px] text-gray-500 text-center">no updates yet (fetching in dev), check back later!</div>
    </div>
  )
}