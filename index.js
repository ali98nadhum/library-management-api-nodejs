const express = require("express");
const cors = require("cors");
require("dotenv").config();
const DataBase = require("./config/dataBase");



// Connect to DB 
DataBase();


// Run express server
const app = express();


// middleware
app.use(express.json());
app.use(cors({
    origin: "*"
}));




// Run server
const port = process.env.PORT || 8000;
app.listen(port , () => console.log(`Server is run on port ${port}`));
