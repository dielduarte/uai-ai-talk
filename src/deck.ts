export type Direction = "next" | "prev" | "first" | "last";

export function navigate(current: number, direction: Direction, total: number): number {
  switch (direction) {
    case "next":
      return Math.min(current + 1, total - 1);
    case "prev":
      return Math.max(current - 1, 0);
    case "first":
      return 0;
    case "last":
      return total - 1;
  }
}

export function slideFromHash(hash: string, total: number): number {
  const index = Number(hash.slice(1)) - 1;
  return Number.isInteger(index) && index >= 0 && index < total ? index : 0;
}
