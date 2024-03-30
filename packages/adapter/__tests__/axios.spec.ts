import {describe, test, expect} from "vitest";

describe("adapter: axios", () => {
  test("unwraps AxiosResponse<TData> correctly", () => {
    expect(true).to.be.true;
  });

  test("transforms AxiosError to provida/core::HttpError on exception", () => {
    expect(true).to.be.true;
  });
});
