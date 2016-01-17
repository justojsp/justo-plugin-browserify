//imports
const register = require("justo").register;
const babel = require("justo-plugin-babel");
const clean = require("justo-plugin-fs").clean;
const copy = require("justo-plugin-fs").copy;
const jshint = require("justo-plugin-jshint");
const publish = require("justo-plugin-npm").publish;

//works
register({name: "build", desc: "Build the package."}, function() {
  jshint("Best practices", {
    output: true,
    src: "lib/"
  });

  clean("Clean build directory", {
    dirs: ["build/es5"]
  });

  babel("Transpile", {
    comments: false,
    retainLines: true,
    src: {
      "build/es5/lib/index.js": "lib/index.js",
      "build/es5/lib/browserify.js": "lib/browserify.js"
    }
  });

  clean("Clean dist directory", {
    dirs: ["build/dist"]
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
  src: "test/unit/lib/"
});

register({name: "publish", desc: "NPM publish"}, function() {
  publish("Publish", {
    who: "justojs",
    src: "dist/es5/nodejs/justo-plugin-browserify/"
  });
});

register("default", ["build", "test"]);
