"use strict";

const assert = require("assert");
const fs = require("fs");
const exec = require("child_process").exec;

describe("tsconfig result", () => {

  before(() => {
    let list = [
      "misc/b/tsconfig.json",
      "misc/d/my-tsconfig.json",
      "misc/e/tsconfig.json",
      "misc/f/tsconfig.json",
    ];

    list.forEach(path => {
      try {
        fs.unlinkSync(path);
      } catch (e) {}
    });
  });

  after(() => {
    let list = [
      "misc/b/tsconfig.json",
      "misc/d/my-tsconfig.json",
      "misc/e/tsconfig.json",
      "misc/f/tsconfig.json",
    ];

    list.forEach(path => {
      try {
        fs.unlinkSync(path);
      } catch (e) {}
    });
  });

  describe("case:a (no args)", () => {
    it("should keep the origin file", (done) => {
      let before = fs.readFileSync("misc/a/tsconfig.json").toString();
      exec("cd misc/a && node ../../tsconfig", () => {
        let after = fs.readFileSync("misc/a/tsconfig.json").toString();
        assert(before === after);
        done();
      });
    })
  });

  describe("case:b (only -u)", () => {
    it("should update the origin file", (done) => {
      let proto = fs.readFileSync("misc/b/_tsconfig.json").toString();
      fs.writeFileSync("misc/b/tsconfig.json", proto);
      let before = fs.readFileSync("misc/b/tsconfig.json").toString();
      exec("cd misc/b && node ../../tsconfig -u", () => {
        let after = fs.readFileSync("misc/b/tsconfig.json").toString();
        assert(before !== after);
        let expected = [
          "../src/bar.ts",
          "../src/foo.ts"
        ];
        assert.deepEqual(require("./misc/b/tsconfig.json").files, expected);
        done();
      });
    })
  });

  describe("case:c (only arg)", () => {
    it("should keep the origin file", (done) => {
      let before = fs.readFileSync("misc/c/my-tsconfig.json").toString();
      exec("cd misc/c && node ../../tsconfig my-tsconfig.json", () => {
        let after = fs.readFileSync("misc/c/my-tsconfig.json").toString();
        assert(before === after);
        done();
      });
    })
  });

  describe("case:d (-u & arg)", () => {
    it("should update the origin file", (done) => {
      let proto = fs.readFileSync("misc/d/_my-tsconfig.json").toString();
      fs.writeFileSync("misc/d/my-tsconfig.json", proto);

      let before = fs.readFileSync("misc/d/my-tsconfig.json").toString();
      exec("cd misc/d && node ../../tsconfig -u my-tsconfig.json", () => {
        let after = fs.readFileSync("misc/d/my-tsconfig.json").toString();
        assert(before !== after);
        done();
      });
    });
  });

  describe("case:e (-o & arg)", () => {
    it("should overwrite the output file", (done) => {
      let before = fs.readFileSync("misc/e/tsconfig.proto.json").toString();
      exec("cd misc/e && node ../../tsconfig -o tsconfig.json tsconfig.proto.json", () => {
        let after = fs.readFileSync("misc/e/tsconfig.json").toString();
        assert(before !== after);
        done();
      });
    });
  });

  describe("case:f (has `include`)", () => {
    it("should do nothing", (done) => {
      let before = fs.readFileSync("misc/f/tsconfig.proto.json").toString();
      exec("cd misc/f && node ../../tsconfig -o tsconfig.json tsconfig.proto.json", () => {
        let after = fs.readFileSync("misc/f/tsconfig.json").toString();
        assert(before === after);
        done();
      });
    });
  });
});
