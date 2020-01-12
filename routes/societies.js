const route = require("express").Router();
const { Societies, Students } = require("../models");
const bcrypt = require("bcryptjs");
const auth = require("./auth");
const jwt = require("jsonwebtoken");

//Get all  societies
route.get("/", async (req, res) => {
  try {
    let societies = await Societies.find({});
    res.status(200).json({ msg: "success", data: societies });
  } catch (error) {
    res.status(400).json({ msg: "error", err: error });
  }
});

//Login route

route.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ err: "Enter values" });

  let society = await Societies.findOne({ email });
  if (!society) return res.status(400).json({ err: "Email doesnot exist" });
  let result = await bcrypt.compare(password, society.password);
  if (!result) return res.status(400).json({ err: "Password Incorrect" });
  const token = await jwt.sign({ id: society.id }, process.env.JWT);
  res.json({ msg: "success", token });
});
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTA2M2ZmZDliY2NhNTM4NGY1ZTlhNSIsImlhdCI6MTU3ODEzMjU4NX0.jCBh7DqPcSLksSq8kWLAceFwRO6WkpKSWi-jhBaX4wk

//Add a society
route.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.json({ meg: "ENter valid field values" });
  try {
    let salt = await bcrypt.genSaltSync(10);
    let hash = await bcrypt.hashSync(password, salt);
    await new Societies({
      name,
      email,
      password: hash
    }).save();
    res.status(200).json({ msg: "success" });
  } catch (error) {
    res.status(400).json({ msg: "error", err: error });
  }
});

//Update - Add notifications to societies
route.put("/add", auth, async (req, res) => {
  const { data } = req.body;
  if (!data) return res.status(400).json({ err: "Enter data" });

  let society = await Societies.findById(req.id);
  //return res.send(society);
  let notifs = [...society.notifs, data];
  try {
    let updatedSociety = await Societies.findByIdAndUpdate(
      req.id,
      { notifs },
      { new: true }
    );
    res.json({ msg: "success", updatedSociety });
  } catch (error) {
    res.status(400).json({ msg: "error", err: error });
  }
});

// Subscribe to a society
route.put("/subscribe/:society", auth, async (req, res) => {
  try {
    const student = await Students.findById(req.id);
    console.log({ msg: "hello", student });

    if (student) {
      let query = { societies: [...student.societies, req.params.society] };
      const newStudent = await Students.findByIdAndUpdate(req.id, query, {
        new: true
      });
      res.json({ msg: "success", newStudent });
    }
  } catch (error) {
    res.status(400).json({ msg: "error", err: error });
  }
});

//Get a specific society

route.get("/:name", auth, async (req, res) => {
  try {
    let society = await Societies.findOne({ name: req.params.name });
    res.status(200).json({ msg: "success", data: society });
  } catch (error) {
    res.status(400).json({ msg: "error", err: error });
  }
});

module.exports = route;

