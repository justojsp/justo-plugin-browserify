
//imports
const path = require("path");
const justo = require("justo");
const init = justo.init;
const fin = justo.fin;
const suite = justo.suite;
const test = justo.test;
const Dir = require("justo-fs").Dir;
const File = require("justo-fs").File;
const file = require("justo-assert-fs").file;
const browserify = require("../../../dist/es5/nodejs/justo-plugin-browserify/lib/op").default;

//suite
suite("#browserify()", function() {
  const DATA = "test/unit/data";
  var BUNDLE_DIR, BUNDLE;

  init({name: "*", title: "Create tmp dir"}, function() {
    BUNDLE_DIR = Dir.createTmpDir();
    BUNDLE = path.join(BUNDLE_DIR.path, "mytest.js");
  });

  fin({name: "*", title: "Delete tmp dir"}, function() {
    BUNDLE_DIR.remove();
  });

  test("browserify()", function(done) {
    browserify([], function(err) {
      if (err) done();
      else done("An error must be indicated.");
    });
  });

  test("browserify(config) - No source file indicated", function(done) {
    browserify([{src: []}], function(err) {
      if (err) done();
      else done("An error must be indicated.");
    });
  });

  test("browserify(config) - No bundle indicated", function(done) {
    browserify([{src: "one.js"}], function(err) {
      if (err) done();
      else done("An error must be indicated.");
    });
  });

  test("browserify(config)", function(done) {
    browserify([{
      src: [path.join(DATA, "one.js"), path.join(DATA, "two.js")],
      dst: BUNDLE
    }], function(err) {
      if (err) {
        done(err);
      } else {
        file(BUNDLE).must.exist();
        file(BUNDLE).must.contain(["var x = 1;", "var y = 2;"]);
        done();
      }
    });
  });

  test("browserify(config) - React", function(done) {
    browserify([{
      src: "app.jsx",
      dst: BUNDLE,
      base: path.join(DATA, "app/"),
      extensions: [".js", ".json", ".jsx"],
      transform: {
        babelify: {
          presets: ["es2015", "react"]
        }
      }
    }], function(err) {
      if (err) {
        done(err);
      } else {
        file(BUNDLE).must.exist();
        file(BUNDLE).must.contain("var x = 1;");
        done();
      }
    });
  });

  suite("Globals", function() {
    test("browserify(config) - globals must be inserted", function(done) {
      browserify([{
        src: path.join(DATA, "globals.js"),
        dst: BUNDLE,
        globals: true
      }], function(err) {
        if (err) {
          done(err);
        } else {
          file(BUNDLE).must.exist();
          file(BUNDLE).must.contain("function (__filename)");
          done();
        }
      });
    });

    test("browserify(config) - globals must not be inserted", function(done) {
      browserify([{
        src: path.join(DATA, "globals.js"),
        dst: BUNDLE,
        globals: false
      }], function(err) {
        if (err) {
          done(err);
        } else {
          file(BUNDLE).must.exist();
          file(BUNDLE).must.not.contain("function (__filename)");
          done();
        }
      });
    });

    test("browserify(config) - globals must be inserted if needed and needed", function(done) {
      browserify([{
        src: path.join(DATA, "globals.js"),
        dst: BUNDLE,
        globals: true
      }], function(err) {
        if (err) {
          done(err);
        } else {
          file(BUNDLE).must.exist();
          file(BUNDLE).must.contain("function (__filename)");
          done();
        }
      });
    });

    test("browserify(config) - globals must be inserted if needed but not needed", function(done) {
      browserify([{
        src: path.join(DATA, "one.js"),
        dst: BUNDLE,
        globals: true
      }], function(err) {
        if (err) {
          done(err);
        } else {
          file(BUNDLE).must.exist();
          file(BUNDLE).must.not.contain("function (__filename)");
          done();
        }
      });
    });
  });

  suite("Builtins", function() {
    test("browserify(config) - builtins to false", function(done) {
      browserify([{
        src: path.join(DATA, "builtins.js"),
        dst: BUNDLE,
        builtins: false
      }], function(err) {
        if (err) {
          done(err);
        } else {
          file(BUNDLE).must.exist();
          file(BUNDLE).text.length.must.be.lt(1000);
          done();
        }
      });
    });

    test("browserify(config) - builtins to true", function(done) {
      browserify([{
        src: path.join(DATA, "builtins.js"),
        dst: BUNDLE,
        builtins: true
      }], function(err) {
        if (err) {
          done(err);
        } else {
          file(BUNDLE).must.exist();
          file(BUNDLE).text.length.must.be.gt(1000);
          done();
        }
      });
    });

    test("browserify(config) - builtins to specified modules", function(done) {
      browserify([{
        src: path.join(DATA, "builtins.js"),
        dst: BUNDLE,
        builtins: ["http"]
      }], function(err) {
        if (err) {
          done(err);
        } else {
          file(BUNDLE).must.exist();
          file(BUNDLE).text.length.must.be.lt(1000);
          done();
        }
      });
    });
  });
})();
