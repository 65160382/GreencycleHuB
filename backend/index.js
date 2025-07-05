const express = require('express');
const cors = require('cors');
// const path = require('path');
// const pool =  require('./config/database');

require('dotenv').config();
const app = express();
const port = process.env.PORT;

app.use(cors());

app.get('/',(req,res)=>{
    res.send('Hello Piyawat Seepattha');
})

app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`);
});