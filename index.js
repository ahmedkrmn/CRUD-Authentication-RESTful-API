const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const producer = require("./routes/producer");
const user = require("./routes/user");
const config = require("./config");

const app = express();
app.use(bodyParser.json());

app.listen(config.PORT, () => {
  mongoose.connect(config.DB_URI, { useNewUrlParser: true });
});

mongoose.connection.on(
  "error",
  console.error.bind(console, "connection error:")
);

mongoose.connection.once("open", () => {
  app.use("/", user);
  app.use("/producer", producer);
  console.log(`Server started on ${config.PORT}`);
});
