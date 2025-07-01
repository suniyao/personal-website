'use client'
import React from "react";

type Props = {
  note: string;
  children: React.ReactNode;
}

export default function PopUp({ note, children }: Props) {
  return (
  <span className="relative group cursor-pointer underline decoration-dotted hover:decoration-wavy transition-decoration duration-1000">
    {children}
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-35 dark:bg-white/10 text-black dark:text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 group-hover:backdrop-blur-[2px] transition-opacity z-50 pointer-events-none whitespace-pre-wrap text-center ">
      {note}
    </div>
  </span>
  );
}
  