import minimist from "minimist";
import fs from "node:fs/promises";
import path from "node:path";
import {existsSync} from "node:fs";
import {$} from "execa";
import {targets as allTargets, ignoreAllInvalid} from "./utils.js";
import logger from "./print.js";

const args = minimist(process.argv.slice(2));
const specifiedTargets = args._;
// unless specific target are specificed, Build all
const targets = specifiedTargets.length ? specifiedTargets : allTargets;

buildAll(targets);

/**
 * Builds all the targets
 * @param {string[]} targets
 */
async function buildAll(targets = []) {
  targets = ignoreAllInvalid(targets);
  logger.title(`Building ${targets.length} packages...`);
  for (const target of ignoreAllInvalid(targets)) {
    logger.step(target);
    await build(target);
  }
}

async function build(target) {
  const pkgDir = path.resolve(`packages/${target}`);

  if (existsSync(path.join(pkgDir, "dist"))) {
    // remove previous build
    await fs.rm(path.join(pkgDir, "dist"), {recursive: true});
  }

  const tsconfig = path.resolve(`packages/${target}/tsconfig.json`);
  await $`tsc -p ${tsconfig}`;
}
