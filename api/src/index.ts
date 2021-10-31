import * as express from "express";
import * as mongoose from "mongoose";
import * as cors from "cors";

const bodyParser = require("body-parser");

const playersRoute = require("./routes/players");
const matchesRoute = require("./routes/matches");

const app = express();

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
