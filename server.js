const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect(``)
  .then(() => console.log(`database connected`))
  .catch(err => console.log(`err:  ${err}`));

app.get("/", require("./routes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server up and running on PORT ${PORT}`));
