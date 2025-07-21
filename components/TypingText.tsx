'use client'

import { useEffect, useState } from "react"

type Props = {
  text: string;
  speed?: number;
  className?: string;
};

export default function TypingText({ text, speed = 80, className = ""}: Props){
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText('');
    let i = 0;

    const interval = setInterval(() => {
      setDisplayedText(prev => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span className={`whitespace-pre ${className}`}>
      {displayedText}
      <span className="animated-pulse">|</span>
    </span>
  )
}