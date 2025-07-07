const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const port = process.env.PORT;

const userRoutes = require("./routes/userRoutes");
const pool = require("./config/database");

app.use(cors());
app.use(bodyParser.json());
app.use(session({
  secret: "",
  resave:"false",
  saveUninitialized: true
}))

app.use(userRoutes);

app.get("/", (req, res) => {
  res.send("Hello Piyawat Seepattha");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
