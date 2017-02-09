//imports
const catalog = require("justo").catalog;
const babel = require("justo-plugin-babel");
const clean = require("justo-plugin-fs").clean;
const copy = require("justo-plugin-fs").copy;
const jslint = require("justo-plugin-eslint");
const jsonlint = require("justo-plugin-jsonlint");
const publish = require("justo-plugin-npm").publish;

//catalog
const lint = catalog.workflow({name: "lint", desc: "Parse code."}, function() {
  jsonlint("JSON: .json files", {
    output: true,
    src: ["package.json"]
  });

  jslint("JavaScript: Best practices and grammar", {
    output: true,
    src: [
      "index.js",
      "Justo.js",
      "lib/",
      "test/unit/index.js",
      "test/unit/lib/"
    ]
  });
});

catalog.workflow({name: "build", desc: "Build the package."}, function() {
  lint("Best practices and grammar");

  clean("Clean build directory", {
    dirs: ["build/es5"]
  });

  babel("Transpile", {
    comments: false,
    retainLines: true,
    preset: "es2015",
    files: [
      {src: "index.js", dst: "build/es5/"},
      {src: "lib/", dst: "build/es5/lib"}
    ]
  });

  clean("Clean dist directory", {
    dirs: ["dist/es5"]
  });

  copy(
    "Create package",
    {
      src: "build/es5/index.js",
      dst: "dist/es5/nodejs/justo-plugin-browserify/"
    },
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

catalog.macro({name: "test", desc: "Unit test."}, {
  require: "justo-assert",
  src: ["test/unit/lib", "test/unit/index.js"]
});

catalog.workflow({name: "publish", desc: "NPM publish."}, function() {
  publish("Publish", {
    who: "justojs",
    src: "dist/es5/nodejs/justo-plugin-browserify/"
  });
});

catalog.macro({name: "default", desc: "Build and test."}, ["build", "test"]);
