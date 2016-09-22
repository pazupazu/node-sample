global.$ = global.jQuery = require("jquery");
require("bootstrap");

setTimeout(() => {
    $("p").text("success!")
}, 1000)

