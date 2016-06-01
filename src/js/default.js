global.$ = global.jQuery = require("jquery");
require("bootstrap");
require("fittext.js");
var w = require("wowjs");

//require("chart.js");
// fittext
$(".header-content-inner h1").fitText(1.0)

// bootstrap
$('[data-toggle="tooltip"]').tooltip()

// wow
new w.WOW({
    boxClass:     'wow',      // animated element css class (default is wow)
    animateClass: 'animated', // animation css class (default is animated)
    offset:       100,          // distance to the element when triggering the animation (default is 0)
    mobile:       true,       // trigger animations on mobile devices (default is true)
    live:         false,       // act on asynchronously loaded content (default is true)
}).init();

console.log(`test`)
