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
      <div className="text-[20px] mt-10"></div>
    </div>
  )
}