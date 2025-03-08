import type {DataProvider, queries} from "../src";

/**
 * /!\ ONLY used for testing purpose
 */
export function invoke(provider: DataProvider, method: (typeof queries)[number]) {
  return provider[method]({} as any, {} as any);
}
