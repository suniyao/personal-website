'use client';
import { useEffect, useState } from 'react';

const prefixes = ['suni', 'stephanie'];
const suffix = 'yao';

type Phase =
  | 'typingPrefix'
  | 'typingSuffix'
  | 'movingCursorBackThroughSuffix'
  | 'deletingPrefix'
  | 'waiting';

const TypingSwitcher = () => {
  const [prefixIndex, setPrefixIndex] = useState(0);
  const [prefix, setPrefix] = useState('');
  const [suffixTyped, setSuffixTyped] = useState('');
  const [cursorIndex, setCursorIndex] = useState(0); // in the full string
  const [phase, setPhase] = useState<Phase>('typingPrefix');
  const [showCursor, setShowCursor] = useState(true);

  const currentPrefix = prefixes[prefixIndex];

  // blinking |
  useEffect(() => {
    const blink = setInterval(() => setShowCursor((prev) => !prev), 100000);
    return () => clearInterval(blink);
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;

    if (phase === 'typingPrefix') {
      if (prefix.length < currentPrefix.length) {
        timeout = setTimeout(() => {
          const newPrefix = currentPrefix.slice(0, prefix.length + 1);
          setPrefix(newPrefix);
          setCursorIndex(newPrefix.length);
        }, 100);
      } else {
        setPhase('typingSuffix');
      }
    }

    if (phase === 'typingSuffix') {
      if (suffixTyped.length < suffix.length) {
        timeout = setTimeout(() => {
          const newSuffix = suffix.slice(0, suffixTyped.length + 1);
          setSuffixTyped(newSuffix);
          setCursorIndex(prefix.length + newSuffix.length); // move cursor with suffix
        }, 100);
      } else {
        setTimeout(() => setPhase('movingCursorBackThroughSuffix'), 600);
      }
    }

    if (phase === 'movingCursorBackThroughSuffix') {
      const suffixStart = prefix.length;
      if (cursorIndex > suffixStart) {
        timeout = setTimeout(() => {
          setCursorIndex((prev) => prev - 1);
        }, 80);
      } else {
        setTimeout(() => setPhase('deletingPrefix'), 300);
      }
    }

    if (phase === 'deletingPrefix') {
      if (prefix.length > 0) {
        timeout = setTimeout(() => {
          setPrefix((prev) => prev.slice(0, -1));
          setCursorIndex((prev) => prev - 1);
        }, 80);
      } else {
        setPhase('waiting');
        timeout = setTimeout(() => {
          setPrefixIndex((prev) => (prev + 1) % prefixes.length);
          setPrefix('');
          setSuffixTyped('');
          setCursorIndex(0);
          setPhase('typingPrefix');
        }, 600);
      }
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [phase, prefix, suffixTyped, cursorIndex, prefixIndex]);

  const fullText = prefix + suffixTyped;

  return (
    <div className="font-mono text-xl whitespace-pre">
      {fullText.slice(0, cursorIndex)}
      {showCursor && <span className="inline-block w-1">|</span>}
      {fullText.slice(cursorIndex)}
    </div>
  );
};

export default TypingSwitcher;
