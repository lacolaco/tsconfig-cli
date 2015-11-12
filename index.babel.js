#!/usr/bin/env node

import program from "commander";
import * as tsconfig from "tsconfig";
import fs from "fs";
import path from "path";

program
  .version("0.0.1")
  .usage(`[options] filepath`)
  .option("-u, --update", "Update tsconfig.file")
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
  let cfgPath = opt.args[0] || "./tsconfig.json";
  return new Promise((resolve, reject) => {
    fs.stat(cfgPath, (err) => {
      if (err) {
        reject(`${path.resolve(cfgPath)} not exist`);
      }
      resolve(cfgPath);
    });
  });
}).then((cfgPath) => {
  // Load tsconfig.json
  opt.cfgPath = cfgPath;
  let projectDir = path.dirname(cfgPath);
  return tsconfig
    .load(projectDir)
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
    fs.writeFile(opt.cfgPath, JSON.stringify(tsconfig, null, 2))
  } else {
    console.log(JSON.stringify(tsconfig, null, 2));
  }
}).catch((err)=> {
  console.error(`[tsconfig] ${err}`);
  process.exit(1);
});
