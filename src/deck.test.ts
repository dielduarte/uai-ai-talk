import { describe, expect, it } from "vitest";
import { navigate, slideFromHash } from "./deck";

describe("navigate", () => {
  it("moves forward and backward", () => {
    expect(navigate(0, "next", 5)).toBe(1);
    expect(navigate(3, "prev", 5)).toBe(2);
  });

  it("stays on the edges instead of wrapping", () => {
    expect(navigate(4, "next", 5)).toBe(4);
    expect(navigate(0, "prev", 5)).toBe(0);
  });

  it("jumps to the first and last slide", () => {
    expect(navigate(2, "first", 5)).toBe(0);
    expect(navigate(2, "last", 5)).toBe(4);
  });
});

describe("slideFromHash", () => {
  it("reads a 1-based slide number from the hash", () => {
    expect(slideFromHash("#3", 5)).toBe(2);
  });

  it("falls back to the first slide for missing or invalid hashes", () => {
    expect(slideFromHash("", 5)).toBe(0);
    expect(slideFromHash("#abc", 5)).toBe(0);
    expect(slideFromHash("#99", 5)).toBe(0);
  });
});
