
//imports
const path = require("path");
const suite = require("justo").suite;
const test = require("justo").test;
const fin = require("justo").fin;
const Dir = require("justo-fs").Dir;
const File = require("justo-fs").File;
const file = require("justo-assert-fs").file;
const browserify = require("../../../dist/es5/nodejs/justo-plugin-browserify/lib/browserify");

//suite
suite("#browserify()", function() {
  const DATA_DIR = "test/unit/data";
  const BUNDLE = new File(Dir.TMP_DIR, "bundle.js");

  fin(function() {
    BUNDLE.remove();
  });

  test("browserify()", function() {
    browserify.must.raise("Expected config object.");
  });

  test("browserify(config)", function() {
    browserify({
      src: [path.join(DATA_DIR, "one.js"), path.join(DATA_DIR, "two.js")],
      dst: BUNDLE.path,
      output: true
    }).must.be.eq(0);

    file(BUNDLE.path).must.exist();
    file(BUNDLE.path).must.contain(["var x = 1;", "var y = 2;"]);
  });

  test("mocha(config) - No source file indicated", function() {
    browserify.must.raise("No source file indicated.", [{}]);
  });

  test("mocha(config) - No bundle indicated", function() {
    browserify.must.raise("No bundle file indicated.", [{src: "one.js"}]);
  });
})();
