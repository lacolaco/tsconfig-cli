"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("tsconfig result", function () {
  it("should match files", function () {
    var config = require("./misc/tsconfig.json");
    var expected = ["src/bar.ts", "src/foo.ts"];
    _assert2.default.deepEqual(config.files, expected);
  });
});
