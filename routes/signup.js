const route = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Students } = require("../models");

route.post("/", async (req, res) => {
  const { email, password, name } = req.body;
  if (!name) return res.status(400).json({ err: "Enter name!" });
  if (!email) return res.status(400).json({ err: "Enter Email!" });
  if (!password) return res.status(400).json({ err: "Enter Password!" });

  let salt = await bcrypt.genSaltSync(10);
  let hash = await bcrypt.hashSync(password, salt);
  try {
    let newStud = await new Students({
      name,
      email,
      password: hash
    }).save();
    return res.status(200).json({ msg: "success", newStud });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = route;
