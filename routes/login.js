const route = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Students } = require("../models");

route.post("/", async (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ err: "Invalid Email!" });
  if (!password) return res.status(400).json({ err: "Invalid Password!" });

  let stud = await Students.findOne({ email });
  if (!stud) return res.status(400).json({ err: "Email doesnot exist!" });

  let result = await bcrypt.compare(password, stud.password);
  if (!result) return res.status(400).json({ err: "Password doesnot match!" });
  // console.log(process.env.JWT);
  //All constraints cleared,get the token and send it
  const token = await jwt.sign({ id: stud.id }, process.env.JWT);
  res.json({ msg: "success", token });
});

module.exports = route;

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMGZiNTVlNDYyNDgwNzdmODU4NDRhOSIsImlhdCI6MTU3ODIwMTA4Mn0.7iYUcpQXpePDt5IDDv_RS_Ht-QMg8tP7YKLOwCV6NRE
