/**
 * 実行JS
 */

// require
global.$ = global.jQuery = require("jquery");
require("bootstrap");

// import class
import Util from "./class/Util";

// instance
const util = new Util();

// es6 syntax
setTimeout(() => {
    util.debug();
    $("p").text("success");
}, 3000)
