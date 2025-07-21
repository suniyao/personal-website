'use client'
import React, { useEffect, useState } from "react";

const TypingEffect: React.FC = () => {
  const suni = "suni";
  const yao = " yao";
  const stephanie = "stephanie";

  const [prefix, setPrefix] = useState(""); // everything before the cursor
  const [suffix, setSuffix] = useState(""); // everything after the cursor (starts empty, becomes yao)
  const [cursorPos, setCursorPos] = useState(0); // index in prefix
  const [phase, setPhase] = useState<
    | "typingSuni"
    | "typingYao"
    | "movingBack"
    | "deleting"
    | "typingStephanie"
    | "deletingStephanie"
    | "typingSuniAgain"
  >("typingSuni");

  const [showCursor, setShowCursor] = useState(true);
  useEffect(() => {
    const blink = setInterval(() => setShowCursor((prev) => !prev), 500);
    return () => clearInterval(blink);
  }, []);

  useEffect(() => {
    let i = 0;
    let interval: NodeJS.Timeout;

    if (phase === "typingSuni") {
      i = 0;
      interval = setInterval(() => {
        setPrefix(suni.slice(0, i + 1));
        setCursorPos(i + 1);
        i++;
        if (i >= suni.length) {
          clearInterval(interval);
          setTimeout(() => setPhase("typingYao"), 500);
        }
      }, 120);
    }

    if (phase === "typingYao") {
      i = 0;
      interval = setInterval(() => {
        const current = yao.slice(0, i + 1);
        setSuffix(current);
        setCursorPos(prefix.length); // keep cursor at end
        i++;
        if (i >= yao.length) {
          clearInterval(interval);
          setTimeout(() => setPhase("movingBack"), 600);
        }
      }, 120);
    }

    if (phase === "movingBack") {
      i = prefix.length + suffix.length;
      interval = setInterval(() => {
        setCursorPos((prev) => prev - 1);
        i--;
        if (i <= prefix.length) {
          clearInterval(interval);
          setTimeout(() => setPhase("deleting"), 300);
        }
      }, 80);
    }

    if (phase === "deleting") {
      i = prefix.length;
      interval = setInterval(() => {
        setPrefix((prev) => prev.slice(0, -1));
        setCursorPos((prev) => Math.max(prev - 1, 0));
        i--;
        if (i <= 0) {
          clearInterval(interval);
          setTimeout(() => setPhase("typingStephanie"), 300);
        }
      }, 100);
    }

    if (phase === "typingStephanie") {
      i = 0;
      interval = setInterval(() => {
        setPrefix(stephanie.slice(0, i + 1));
        setCursorPos(i + 1);
        i++;
        if (i >= stephanie.length) {
          clearInterval(interval);
          setTimeout(() => setPhase("deletingStephanie"), 1000);
        }
      }, 120);
    }

    if (phase === "deletingStephanie") {
      i = stephanie.length;
      interval = setInterval(() => {
        setPrefix((prev) => prev.slice(0, -1));
        setCursorPos((prev) => Math.max(prev - 1, 0));
        i--;
        if (i <= 0) {
          clearInterval(interval);
          setTimeout(() => setPhase("typingSuniAgain"), 300);
        }
      }, 100);
    }

    if (phase === "typingSuniAgain") {
      i = 0;
      interval = setInterval(() => {
        setPrefix(suni.slice(0, i + 1));
        setCursorPos(i + 1);
        i++;
        if (i >= suni.length) {
          clearInterval(interval);
          setTimeout(() => setPhase("typingYao"), 500);
        }
      }, 120);
    }

    return () => clearInterval(interval);
  }, [phase]);

  return (
    <div className="font-mono text-xl whitespace-pre">
      {prefix.slice(0, cursorPos)}
      {showCursor ? "|" : " "}
      {prefix.slice(cursorPos)}
      {suffix}
    </div>
  );
};

export default TypingEffect;
