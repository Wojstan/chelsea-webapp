const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("dotenv/config");

const playersRoute = require("./routes/players");
const matchesRoute = require("./routes/matches");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PATCH");
  next();
});

app.use(bodyParser.json());
app.use("/players", playersRoute);
app.use("/matches", matchesRoute);

//ROUTES
app.get("/", (req, res) => {
  res.send("We are on home");
});

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("connected to DB")
);

app.listen(4442);
