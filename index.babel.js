#!/usr/bin/env node

import program from "commander";
import * as tsconfig from "tsconfig";
import fs from "fs";
import path from "path";

const FILE_NAME = "tsconfig.json";

program
  .version("0.1.0")
  .usage(`[options] filepath
  if the file includes comments, those will be striped.`)
  .option("-u, --update", "Update tsconfig.json")
  .parse(process.argv);

let opt = {};
opt.args = program.args;
opt.update = program.update || false;

new Promise((resolve, reject) => {
  // Validate process arguments
  if (opt.args.length > 1) {
    reject(`only 1 argument required`);
  }
  resolve();
}).then(()=> {
  // Check file existence
  let cfgPath = opt.args[0] || FILE_NAME;
  return new Promise((resolve, reject) => {
    fs.stat(cfgPath, (err) => {
      if (err) {
        reject(`${path.resolve(cfgPath)} not exist`);
      }
      resolve(cfgPath);
    });
  });
}).then((inputPath) => {
  let projectDir = path.dirname(inputPath);
  opt.outputPath = `${projectDir}/${FILE_NAME}`;
  // Load tsconfig.json
  return tsconfig
    .readFile(inputPath)
    .then((result)=> {
      // Resolve files into relative path
      let resolved = [];
      result.files.forEach((file) => {
        resolved.push(path.relative(projectDir, file));
      });
      result.files = resolved;
      return result;
    });
}).then((tsconfig) => {
  // Output
  if (opt.update) {
    // Overwrite tsconfig.json
    fs.writeFile(opt.outputPath, JSON.stringify(tsconfig, null, 2))
  } else {
    console.log(JSON.stringify(tsconfig, null, 2));
  }
}).catch((err)=> {
  console.error(`[tsconfig] ${err}`);
  process.exit(1);
});
