const route = require("express").Router();

route.get("/students", require("./students"));
route.get("/societies", require("./societies"));

module.exports = route;
