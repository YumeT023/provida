import {HttpError} from "@provida/core";
import {createDataProvider} from "@provida/data-provider";
import axios from "axios";
import {afterAll, afterEach, beforeAll, describe, expect, test} from "vitest";
import adapter from "../src";
import {
  type Foo,
  createInterceptorMatchUrl,
  createInterceptorServer,
  expectedBadRequestBody,
  expectedFoos,
} from "./util";

const server = createInterceptorServer();

describe("adapter: axios", () => {
  const fooProvider = createDataProvider<Foo>("__tests__", {
    getMany: () => adapter.axios(axios.get(createInterceptorMatchUrl("foos"))),
    updateMany: () => adapter.axios(axios.put(createInterceptorMatchUrl("foos"), {})),
  });

  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  test("unwraps AxiosResponse<TData> correctly", async () => {
    const data = await fooProvider.getMany();
    expect(data).to.deep.eq(expectedFoos);
  });

  test("transforms AxiosError to provida::core::HttpError on exception", async () => {
    const expectedErr = new HttpError(
      "Request failed with status code 403",
      403,
      expectedBadRequestBody
    );
    try {
      await fooProvider.updateMany([]);
    } catch (e) {
      expect(e).to.deep.eq(expectedErr);
    }
  });
});
