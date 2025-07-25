const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express();
const port = process.env.PORT;

const authRoutes = require("./routes/authRoutes");
const imageRoutes = require("./routes/imageRoutes");

app.use(cors({
  origin: 'http://localhost:5173', // ระบุ origin เฉพาะ แทน '*'
  credentials: true // อนุญาตให้ส่ง cookies
}));

app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api", authRoutes);
app.use("/api",imageRoutes);

app.get("/", (req, res) => {
  res.send("Hello Piyawat Seepattha");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
