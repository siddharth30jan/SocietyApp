const route = require("express").Router();

route.use("/students",require("./students"));
route.use("/societies", require("./societies"));
route.use("/login", require("./login"));
route.use("/signup", require("./signup"));

module.exports = route;
