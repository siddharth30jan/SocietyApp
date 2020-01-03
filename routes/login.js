const route = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtokens");
const students = require("../models");

route.post("/", async (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ err: "Invalid Email!" });
  if (!password) return res.status(400).json({ err: "Invalid Password!" });

  let stud = await students.findOne({ email });
  if (!stud) return res.status(400).json({ err: "Email doesnot exist!" });

  let result = await bcrypt.compare(password, stud.password);
  if (!result) return res.status(400).json({ err: "Password doesnot match!" });

  //All constraints cleared,get the token and send it
  const token = await jwt.sign({ stud }, process.env.JWT);
  res.json({ msg: "success", token });
});

module.exports = route;
