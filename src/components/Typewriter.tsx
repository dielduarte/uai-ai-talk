import { useEffect, useState } from "react";

export function Typewriter({ text, speed = 28 }: { text: string; speed?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
    const id = setInterval(() => {
      setCount((c) => {
        if (c >= text.length) clearInterval(id);
        return Math.min(c + 1, text.length);
      });
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  return (
    <>
      {text.slice(0, count)}
      {count < text.length && <span className="animate-pulse">▍</span>}
    </>
  );
}
