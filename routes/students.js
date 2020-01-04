const route = require("express").Router();
const { Students } = require("../models");
const auth = require("./auth");

//Get all students
route.get("/", auth, async (req, res) => {
  try {
    let students = await Students.find({});
    res.status(200).json({ msg: "success", data: students });
  } catch (error) {
    res.status(400).json({ msg: "error", err: error });
  }
});
//Subscribing route- get all subscribed societies

module.exports = route;
