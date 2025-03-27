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


// Routes
app.use("/api/v1/categories" , require("./routes/CategoryRoute"));
app.use("/api/v1/auth" , require("./routes/AuthRoute"));
app.use("/api/v1/users" , require("./routes/UsersRoute"));
app.use("/api/v1/books" , require("./routes/BookRoute"));
app.use("/api/v1/orders" , require("./routes/OrdersRoute"));




// Run server
const port = process.env.PORT || 8000;
app.listen(port , () => console.log(`Server is run on port ${port}`));
