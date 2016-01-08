[![Build Status](https://travis-ci.org/justojsp/justo-plugin-browserify.svg)](https://travis-ci.org/justojsp/justo-plugin-browserify)

Simple task to run the `browserify` command.

*Proudly made with ♥ in Valencia, Spain, EU.*

## Install

```
npm install justo-plugin-browserify
```

Dependencies:

```
npm install -g browserify
```

## Use

```
const browserify = require("justo-plugin-browserify");
```

To run `browserify`, the task must be called as follows:

```
browserify(opts, config) : number
```

Configuration object:

- `files` or `src` (string or string[]). The source file(s).
- `dst` or `outfile` (string). The bundle file.
- `output` (boolean). Display the `browserify` output: `true`, yep; `false`, nope. Default: `true`.
- `require` (string or string[]). Module names to bundle.require().
- `entry` (string). An entry point of your app.
- `ignore` (string or string[]). Ignored files.
- `exclude` (string or string[]). Excluded files.
- `èxternal` (string). Reference a file from another bundle.
- `transform` (string or string[]). Use a transform module on top-level files.
- `command` (string or string[]). Use a transform command on top-level files.
- `standalone` (boolean). Generate a UMD bundle for the supplied export name.
- `debug` (boolean). Enable source maps that allow you to debug your files separately.

Examples:

```
browserify("Generate React bundle", {
  src: ["app/one.jsx", "app/two.jsx"],
  dst: "build/es5/resact-app.js",
  transform: "babelify"
});
```
