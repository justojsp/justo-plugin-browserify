"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = 






op;var _os = require("os");var _os2 = _interopRequireDefault(_os);var _child_process = require("child_process");var _child_process2 = _interopRequireDefault(_child_process);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function op(params) {
  var cmd, args = [], opts = {}, res, stdout;


  if (!params) throw new Error("Expected config object.");

  params = Object.assign({}, params);

  if (params.hasOwnProperty("src")) params.files = params.src;
  if (params.hasOwnProperty("dst")) params.outfile = params.dst;

  if (typeof params.files == "string") params.files = [params.files];
  if (typeof params.require == "string") params.require = [params.require];
  if (typeof params.ignore == "string") params.ignore = [params.ignore];
  if (typeof params.exclude == "string") params.exclude = [params.exclude];
  if (typeof params.transform == "string") params.transform = [params.transform];
  if (typeof params.command == "string") params.command = [params.command];

  if (!params.files || params.files.length === 0) throw new Error("No source file indicated.");
  if (!params.outfile) throw new Error("No bundle file indicated.");var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {

    for (var _iterator = params.files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var f = _step.value;args.push(f);}} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}
  args.push("--outfile"), args.push(params.outfile);
  if (params.require) {var _iteratorNormalCompletion2 = true;var _didIteratorError2 = false;var _iteratorError2 = undefined;try {for (var _iterator2 = params.require[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {var r = _step2.value;args.push("-r"), args.push(r);}} catch (err) {_didIteratorError2 = true;_iteratorError2 = err;} finally {try {if (!_iteratorNormalCompletion2 && _iterator2.return) {_iterator2.return();}} finally {if (_didIteratorError2) {throw _iteratorError2;}}}}
  if (params.entry) args.push("-e"), args.push(params.entry);
  if (params.ignore) {var _iteratorNormalCompletion3 = true;var _didIteratorError3 = false;var _iteratorError3 = undefined;try {for (var _iterator3 = params.ignore[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {var i = _step3.value;args.push("-i"), args.push(i);}} catch (err) {_didIteratorError3 = true;_iteratorError3 = err;} finally {try {if (!_iteratorNormalCompletion3 && _iterator3.return) {_iterator3.return();}} finally {if (_didIteratorError3) {throw _iteratorError3;}}}}
  if (params.exclude) {var _iteratorNormalCompletion4 = true;var _didIteratorError4 = false;var _iteratorError4 = undefined;try {for (var _iterator4 = params.exclude[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {var e = _step4.value;args.push("-u"), args.push(e);}} catch (err) {_didIteratorError4 = true;_iteratorError4 = err;} finally {try {if (!_iteratorNormalCompletion4 && _iterator4.return) {_iterator4.return();}} finally {if (_didIteratorError4) {throw _iteratorError4;}}}}
  if (params.external) args.push("-x"), args.push(params.external);
  if (params.transform) {var _iteratorNormalCompletion5 = true;var _didIteratorError5 = false;var _iteratorError5 = undefined;try {for (var _iterator5 = params.transform[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {var t = _step5.value;args.push("-t"), args.push(t);}} catch (err) {_didIteratorError5 = true;_iteratorError5 = err;} finally {try {if (!_iteratorNormalCompletion5 && _iterator5.return) {_iterator5.return();}} finally {if (_didIteratorError5) {throw _iteratorError5;}}}}
  if (params.command) {var _iteratorNormalCompletion6 = true;var _didIteratorError6 = false;var _iteratorError6 = undefined;try {for (var _iterator6 = params.command[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {var c = _step6.value;args.push("-c"), args.push(c);}} catch (err) {_didIteratorError6 = true;_iteratorError6 = err;} finally {try {if (!_iteratorNormalCompletion6 && _iterator6.return) {_iterator6.return();}} finally {if (_didIteratorError6) {throw _iteratorError6;}}}}
  if (params.standalone) args.push("-s");
  if (params.debug) args.push("-d");


  if (/^win/.test(_os2.default.platform())) cmd = "browserify.cmd";else 
  cmd = "browserify";


  res = _child_process2.default.spawnSync(cmd, args);

  if (res.status && !!params.output) console.log(res.stdout.toString());
  if (res.error) throw res.error;


  return res.status;}