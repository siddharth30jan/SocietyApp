const route = require("express").Router();
const societies = require("../models");

//Get all  societies
route.get("/", async (req, res) => {
  try {
    let societies = await societies.find({});
    res.status(200).json({ msg: "success", data: societies });
  } catch (error) {
    res.status(400).json({ msg: "error", err: error });
  }
});

//Add a society [ONLY FOR MAIN ADMIN]
route.post("/", async (req, res) => {
  try {
    let newSociety = new societies({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }).save();
    res.status(200).json({ msg: "success", data: newSociety });
  } catch (error) {
    res.status(400).json({ msg: "error", err: error });
  }
});

//Get a specific society
route.get("/:name", async (req, res) => {
  try {
    let society = societies.findOne({ name: req.params.name });
    res.status(200).json({ msg: "success", data: society });
  } catch (error) {
    res.status(400).json({ msg: "error", err: error });
  }
});

module.exports = route;
