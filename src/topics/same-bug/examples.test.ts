import { describe, expect, it } from "vitest";
import { cosineSimilarity } from "./examples";

describe("cosineSimilarity", () => {
  it("is 1 for vectors pointing the same way, whatever their length", () => {
    expect(cosineSimilarity([1, 2], [2, 4])).toBeCloseTo(1);
  });

  it("is 0 for perpendicular vectors", () => {
    expect(cosineSimilarity([1, 0], [0, 1])).toBeCloseTo(0);
  });

  it("is higher for vectors with a smaller angle between them", () => {
    expect(cosineSimilarity([0.7, 0.32], [0.81, 0.18])).toBeGreaterThan(cosineSimilarity([0.7, 0.32], [0.14, 0.86]));
  });
});
