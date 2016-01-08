//imports
import os from "os";
import child_process from "child_process";

/**
 * Runs jshint CLI.
 */
export default function browserify(params) {
  var cmd, args = [], opts = {}, res, stdout;

  //(1) arguments
  if (!params) throw new Error("Expected config object.");

  params = Object.assign({}, params);

  if (params.hasOwnProperty("src")) params.files = params.src;
  if (params.hasOwnProperty("dst")) params.outfile = params.dst;

  if (typeof(params.files) == "string") params.files = [params.files];
  if (typeof(params.require) == "string") params.require = [params.require];
  if (typeof(params.ignore) == "string") params.ignore = [params.ignore];
  if (typeof(params.exclude) == "string") params.exclude = [params.exclude];
  if (typeof(params.transform) == "string") params.transform = [params.transform];
  if (typeof(params.command) == "string") params.command = [params.command];

  if (!params.files || params.files.length === 0) throw new Error("No source file indicated.");
  if (!params.outfile) throw new Error("No bundle file indicated.");

  for (let f of params.files) args.push(f);
  args.push("--outfile"), args.push(params.outfile);
  if (params.require) for (let r of params.require) args.push("-r"), args.push(r);
  if (params.entry) args.push("-e"), args.push(params.entry);
  if (params.ignore) for (let i of params.ignore) args.push("-i"), args.push(i);
  if (params.exclude) for (let e of params.exclude) args.push("-u"), args.push(e);
  if (params.external) args.push("-x"), args.push(params.external);
  if (params.transform) for (let t of params.transform) args.push("-t"), args.push(t);
  if (params.command) for (let c of params.command) args.push("-c"), args.push(c);
  if (params.standalone) args.push("-s");
  if (params.debug) args.push("-d");

  //(2) get command
  if (/^win/.test(os.platform())) cmd = "browserify.cmd";
  else cmd = "browserify";

  //(3) run
  res = child_process.spawnSync(cmd, args);

  if (res.status && !!params.output) console.log(res.stdout.toString());
  if (res.error) throw res.error;

  //(4) return result
  return res.status;
}
