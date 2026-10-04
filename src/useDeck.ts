import { useCallback, useEffect, useState } from "react";
import { navigate, slideFromHash, type Direction } from "./deck";

const KEY_TO_DIRECTION: Record<string, Direction> = {
  ArrowRight: "next",
  ArrowDown: "next",
  PageDown: "next",
  " ": "next",
  ArrowLeft: "prev",
  ArrowUp: "prev",
  PageUp: "prev",
  Home: "first",
  End: "last",
};

export function useDeck(total: number) {
  const [state, setState] = useState(() => ({
    index: slideFromHash(window.location.hash, total),
    step: 1 as 1 | -1,
  }));

  const go = useCallback(
    (direction: Direction) =>
      setState(({ index }) => {
        const next = navigate(index, direction, total);
        return { index: next, step: next >= index ? 1 : -1 };
      }),
    [total],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const direction = KEY_TO_DIRECTION[event.key];
      if (!direction) return;
      event.preventDefault();
      go(direction);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [go]);

  // Hash keeps the current slide across reloads while editing with HMR.
  useEffect(() => {
    history.replaceState(null, "", `#${state.index + 1}`);
  }, [state.index]);

  return { ...state, go };
}
