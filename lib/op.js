//imports
import browserify from "browserify";
import {File} from "justo-fs";

/**
 * Op.
 */
export default function op(params, done) {
  var b;

  //(1) arguments
  if (params.length === 0 || !params[0]) return done(new Error("Expected config object."));
  else params = Object.assign({}, params[0]);

  if (typeof(params.src) == "string") params.src = [params.src];
  if (typeof(params.require) == "string") params.require = [params.require];
  if (typeof(params.path) == "string") params.path = [params.path];
  if (typeof(params.ignore) == "string") params.ignore = [params.ignore];
  if (typeof(params.exclude) == "string") params.exclude = [params.exclude];
  if (typeof(params.transform) == "string") params.transform = [params.transform];
  if (typeof(params.plugins) == "string") params.plugins = [params.plugins];
  if (typeof(params.builtins) == "string") params.builtins = [params.builtins];
  if (params.builtins === false) params.builts = [];

  if (!params.src || params.src.length === 0) return done(new Error("No source file indicated."));
  if (!params.dst) return done(new Error("No bundle file indicated."));

  if (params.transform) {
    if (!(params.transform instanceof Array)) {
      let transform = [];

      for (let name in params.transform) {
        let val = params.transform[name];

        if (typeof(val) == "boolean") {
          if (val) transform.push(name);
        } else {
          transform.push([name, val]);
        }
      }

      params.transform = transform;
    }
  }

  //(2) get browserify instance
  b = browserify([], {
    require: params.require,
    basedir: params.base,
    paths: params.path,
    entries: params.src,
    plugin: params.plugins,
    extensions: params.extensions,
    debug: params.debug,
    standalone: params.standalone,
    builtins: params.builtins,
    insertGlobals: params.hasOwnProperty("globals") ? (params.globals == "insert") : false,
    detectGlobals: params.hasOwnProperty("globals") ? (params.globals == "insert" || !!params.globals) : false
  });

  if (params.exclude instanceof Array) {
    for (let exc of params.exclude) b.exclude(exc);
  }

  if (params.transform) {
    for (let item of params.transform) {
      if (item instanceof Array) b.transform(item[0], item[1]);
      else b.transform(item);
    }
  }

  //(3) generate bundle
  b.bundle(function(err, buf) {
    if (err) {
      done(err);
    } else {
      let dst = new File(params.dst);
      dst.text = buf.toString("utf-8");
      done();
    }
  });
}
