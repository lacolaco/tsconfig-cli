#!/usr/bin/env node

import program from "commander";
import * as tsconfig from "tsconfig";
import fs from "fs";
import path from "path";

const FILE_NAME = "tsconfig.json";

program
  .version(require("./package.json").version)
  .usage(`[options] filepath
  if the file includes comments, those will be striped.`)
  .option("-u, --update", "Update tsconfig.json")
  .option("-v, --verbose", "Print verbose logs")
  .parse(process.argv);

let opt = {};
opt.args = program.args;
opt.update = program.update || false;
opt.verbose = program.verbose || false;

const log = str => {
  if (opt.verbose) {
    console.log(str);
  }
};

log(`tsconfig-cli@${program.version()} is running.`);

new Promise((resolve, reject) => {
  // Validate process arguments
  if (opt.args.length > 1) {
    reject(`only 1 argument required`);
  }
  resolve();
}).then(() => {
  // Check file existence
  let cfgPath = opt.args[0] || FILE_NAME;
  return new Promise((resolve, reject) => {
    fs.stat(cfgPath, err => {
      if (err) {
        reject(`${path.resolve(cfgPath)} not exist`);
      }
      resolve(cfgPath);
    });
  });
}).then(inputPath => {
  log(`\tInput:\t"${inputPath}"`);
  let projectDir = path.dirname(inputPath);
  opt.outputPath = `${projectDir}/${FILE_NAME}`;
  // Load tsconfig.json
  return tsconfig
    .readFile(inputPath)
    .then(result => {
      // Resolve files into relative path
      let resolved = [];
      result.files.forEach(file => {
        resolved.push(path.relative(projectDir, file));
      });
      result.files = resolved;
      return result;
    });
}).then(tsconfig => {
  // Output
  let p;
  if (opt.update) {
    // Overwrite tsconfig.json
    p = new Promise((resolve, reject) => {
      fs.writeFile(opt.outputPath, JSON.stringify(tsconfig, null, 4), err => {
        if (err) {
          reject(err);
          return;
        }
        log(`\tOutput:\t"${opt.outputPath}"`);
        resolve();
      });
    });
  } else {
    console.log(JSON.stringify(tsconfig, null, 4));
    p = Promise.resolve(true);
  }
  return p;
}).then(() => {
  // Completed
  log(`\tFinished!`);
}).catch(err => {
  console.error(`[tsconfig] ${err}`);
  process.exit(1);
});
