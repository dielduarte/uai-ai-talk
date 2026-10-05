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

export function useDeck(steps: number[]) {
  const [state, setState] = useState(() => ({
    slide: slideFromHash(window.location.hash, steps.length),
    step: 0,
    direction: 1 as 1 | -1,
  }));

  const go = useCallback(
    (direction: Direction) =>
      setState((current) => {
        const next = navigate(current, direction, steps);
        return { ...next, direction: next.slide >= current.slide ? 1 : -1 };
      }),
    [steps],
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
    history.replaceState(null, "", `#${state.slide + 1}`);
  }, [state.slide]);

  return { ...state, go };
}
