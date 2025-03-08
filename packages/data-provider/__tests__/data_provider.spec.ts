import {describe, expect, test} from "vitest";
import {createDataProvider, queries} from "../src";
import {invoke} from "./util";

describe("data provider", () => {
  test("default query impl", () => {
    const dataProvider = createDataProvider("empty");
    queries.forEach((q) => {
      expect(() => invoke(dataProvider, q)).toThrowError(`empty.${q} is not implemented.`);
    });
  });

  test("partial query impl", () => {
    const dataProvider = createDataProvider("partial", {
      getOne: (id) =>
        Promise.resolve({
          id,
        }),
    });

    // use the provided impl
    dataProvider.getOne(1).then((result) => {
      expect(result).toEqual({
        id: 1,
      });
    });

    // other queries impl should fallback to default
    queries
      .filter((q) => q !== "getOne")
      .forEach((q) => {
        expect(() => invoke(dataProvider, q)).toThrowError(`partial.${q} is not implemented.`);
      });
  });
});
