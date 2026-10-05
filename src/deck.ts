export type Direction = "next" | "prev" | "first" | "last";

export type Position = { slide: number; step: number };

export function navigate({ slide, step }: Position, direction: Direction, steps: number[]): Position {
  const lastSlide = steps.length - 1;
  switch (direction) {
    case "next":
      if (step < steps[slide] - 1) return { slide, step: step + 1 };
      if (slide < lastSlide) return { slide: slide + 1, step: 0 };
      return { slide, step };
    case "prev":
      if (step > 0) return { slide, step: step - 1 };
      if (slide > 0) return { slide: slide - 1, step: steps[slide - 1] - 1 };
      return { slide, step };
    case "first":
      return { slide: 0, step: 0 };
    case "last":
      return { slide: lastSlide, step: steps[lastSlide] - 1 };
  }
}

export function slideFromHash(hash: string, total: number): number {
  const index = Number(hash.slice(1)) - 1;
  return Number.isInteger(index) && index >= 0 && index < total ? index : 0;
}
