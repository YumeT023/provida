import type {Record} from "@provida/data-provider";
import {HttpResponse, http} from "msw";
import {setupServer} from "msw/node";

export interface Foo extends Record<number> {
  name: string;
}

export const expectedFoos: Foo[] = [
  {id: 1, name: "foo1"},
  {id: 2, name: "foo2"},
  {id: 3, name: "foo3"},
  {id: 4, name: "foo4"},
];

export const expectedBadRequestBody = {
  type: "BadRequest",
  message: "only dev can access this resources",
};

export function createInterceptorMatchUrl(tail: string) {
  return `http://__testing__/${tail}`;
}

export function createInterceptorServer() {
  return setupServer(
    http.get(createInterceptorMatchUrl("foos"), () => {
      return HttpResponse.json(expectedFoos);
    }),
    http.put(createInterceptorMatchUrl("foos"), () => {
      return HttpResponse.json(expectedBadRequestBody, {status: 403});
    })
  );
}
