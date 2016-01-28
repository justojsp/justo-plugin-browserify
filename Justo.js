//imports
const catalog = require("justo").catalog;
const babel = require("justo-plugin-babel");
const clean = require("justo-plugin-fs").clean;
const copy = require("justo-plugin-fs").copy;
const jshint = require("justo-plugin-jshint");
const publish = require("justo-plugin-npm").publish;

//works
catalog.workflow({name: "build", desc: "Build the package."}, function() {
  jshint("Best practices", {
    output: true,
    src: ["index.js", "lib/"]
  });

  clean("Clean build directory", {
    dirs: ["build/es5"]
  });

  babel("Transpile", {
    comments: false,
    retainLines: true,
    src: {
      "build/es5/index.js": "index.js",
      "build/es5/lib/op.js": "lib/op.js"
    }
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

catalog.workflow({name: "publish", desc: "NPM publish"}, function() {
  publish("Publish", {
    who: "justojs",
    src: "dist/es5/nodejs/justo-plugin-browserify/"
  });
});

catalog.macro("default", ["build", "test"]);
