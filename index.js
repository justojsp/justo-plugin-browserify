//imports
import {simple} from "justo";

//api
module.exports = simple({ns: "org.justojs.plugin", name: "browserify"}, require("./lib/op").default);
