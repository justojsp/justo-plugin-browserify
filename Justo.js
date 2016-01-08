//imports
const register = require("justo").register;
const simple = require("justo").simple;
const fs = require("justo-fs");
const babel = require("justo-plugin-babel");
const clean = require("justo-plugin-clean");
const copy = require("justo-plugin-copy");
const jshint = require("justo-plugin-jshint");

//works
register({name: "build", desc: "Build the package."}, function() {
  clean("Clean build directory", {
    dirs: ["build/es5"]
  });

  jshint("Best practices", {
    output: true,
    files: [
      "lib/browserify.js",
      "lib/index.js"
    ]
  });

  babel("Transpile", {
    comments: false,
    retainLines: true,
    files: {
      "build/es5/lib/index.js": "lib/index.js",
      "build/es5/lib/browserify.js": "lib/browserify.js"
    }
  });

  copy(
    "Create package",
    {
      src: "build/es5/lib/",
      dst: "dist/es5/nodejs/justo-plugin-browserify/lib"
    },
    {
      src: ["package.json", "README.md"],
      dst: "dist/es5/nodejs/justo-plugin-browserify/"
    }
  );
});

register({name: "test", desc: "Unit test."}, {
  require: "justo-assert",
  src: [
    "test/unit/lib/browserify.js"
  ]
});

register("default", ["build", "test"]);
