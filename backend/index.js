const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require('express-session');
require("dotenv").config();


const app = express();
const port = process.env.PORT;

const userRoutes = require("./routes/userRoutes");

app.use(cors());
app.use(bodyParser.json()); 
app.use(session({ // เรียกใช้ session 
  secret: 'mysession', // ใช้คีย์ลับสำหรับการเข้ารหัส session
  resave:"false", // เป็นการป้องกันการบันทึก session ที่ยังไม่เปลี่ยนแปลง
  saveUninitialized: true // เป็นการบันทึก session แม้จะยังไม่มีข้อมูล
}))

app.use(userRoutes);

app.get("/", (req, res) => {
  res.send("Hello Piyawat Seepattha");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
