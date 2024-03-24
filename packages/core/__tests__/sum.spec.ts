import {describe, expect, it} from "vitest";
import {sum} from "../src";

describe("sum", () => {
  it("should sum two number", () => {
    const result = sum(2, 3);
    expect(result).to.eq(5);
  });
});
