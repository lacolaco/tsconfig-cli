"use strict";

import assert from "assert";

describe("tsconfig result", () => {
  it("should match files", () => {
    let config = require("./misc/tsconfig.json");
    let expected = [
      "src/bar.ts",
      "src/foo.ts"
    ];
    assert.deepEqual(config.files, expected);
  });
});
