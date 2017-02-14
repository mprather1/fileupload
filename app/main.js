global.jQuery = require("jquery");
require("bootstrap");
require("./public/css/style.scss");

var App = require("./App");

var app = new App();
app.start();

module.exports = app;