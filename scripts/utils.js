import {createRequire} from "node:module";
import path from "node:path";
import fs from "graceful-fs";

const require = createRequire(import.meta.url);

export const targets = ignoreAllInvalid(fs.readdirSync("packages"));

export const buildTsConfig = path.resolve(`tsconfig.build.json`);

/**
 * Ignores all invalid targets
 * @param {string[]} targets
 * @returns {string[]}
 */
export function ignoreAllInvalid(targets = []) {
  return targets.filter((f) => {
    if (!fs.statSync(`packages/${f}`).isDirectory()) {
      return false;
    }
    const pkg = require(`../packages/${f}/package.json`);
    if (pkg.private) {
      return false;
    }
    return true;
  });
}
