[![Build Status](https://travis-ci.org/justojsp/justo-plugin-browserify.svg)](https://travis-ci.org/justojsp/justo-plugin-browserify)

Plugin for running *Browserify*.

*Proudly made with ♥ in Valencia, Spain, EU.*

## Install

```
npm install justo-plugin-browserify
```

## Use

The plugin is a simple task to run *Browserify*:

```
browserify(opts, config)
```

Configuration object:

- `src` (string or string[]). The entry file(s).
- `dst` (string). The bundle file.
- `base` (string). The directory to start bundling from for filenames that start with `.`.
- `path` (string or string[]). The directories to search when looking for modules which are not referenced using relative path.
   Can be absolute or relative to `base`. Equivalent of setting `NODE_PATH` environmental variable when calling `browserify` command.
- `require` (string or string[]). Module name(s) available from outside the bundle with `require(file)`.
- `ignore` (string or string[]). Ignored files.
- `exclude` (string or string[]). Excluded files.
- `transform` (string or string[] or object). Use a transform module on top-level files.
- `plugins` (string or string[]). Plugin name(s) to use.
- `standalone` (string). Generate a UMD bundle for the supplied export name.
- `extensions` (string or string[]). File extensions for the module lookup machinery to use when the extension has not been specified.
  By default, it considers only `.js` and `.json` files in such cases.
- `debug` (boolean). Enable source maps that allow you to debug your files separately.
- `builtins` (string or string[] or boolean). The built-in module names to define. If `true`, all. If `false`, none.
- `globals`. This can have one of those values:
  - `true` (as boolean), then this scans all files for process, `global`, `__filename`, and `__dirname`, defining as necessary.
  - `false` (as boolean), this doesn't scan.
  - `insert` (as string), this always inserts process, `global`, `__filename`, and `__dirname` without analyzing the AST for faster builds but larger output bundles.

To indicate a transform, we can use its name or an object:

```
transform: ["coffeeify", "babelify"]

transform: {
  "coffeeify": true,
  "babelify": {
    presets: ["react"]
  }
}
```

Examples:

```
const browserify = require("justo-plugin-browserify");

browserify("Generate bundle", {
  src: "app/app.js",
  base: "app/",
  dst: "build/es5/app.js"
});
```
