const route = require("express").Router();
const students = require("../models");

//Get all students
route.get("/", async (req, res) => {
  try {
    let students = await students.find({});
    res.status(200).json({ msg: "success", data: students });
  } catch (error) {
    res.status(400).json({ msg: "error", err: error });
  }
});


//Add s 

module.exports = route;
