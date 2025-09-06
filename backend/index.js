const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express();
const port = process.env.PORT;

const authRoutes = require("./routes/authRoutes");
const imageRoutes = require("./routes/imageRoutes");
const wasteRoutes = require("./routes/wasteRoutes");
const addressRoutes = require("./routes/addressRoutes");
const reserveRoutes = require("./routes/reserveRoutes");
const mapRoutes = require("./routes/mapRoutes");

app.use(cors({
  origin: 'http://localhost:5173', // ระบุ origin เฉพาะ แทน '*'
  credentials: true // อนุญาตให้ส่ง cookies
}));

app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api", authRoutes);
app.use("/api",imageRoutes);
app.use("/api",wasteRoutes);
app.use("/api",addressRoutes);
app.use("/api",reserveRoutes);
app.use("/api",mapRoutes);


app.get("/", (req, res) => {
  res.send("Hello Piyawat Seepattha");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
