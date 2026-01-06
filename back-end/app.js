const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const ejs = require('ejs');
const userRouter = require("./routes/userRouter");
const adminRouter = require("./routes/adminRouter");
const db = require("./dbconnect/connection");
const cookieParser = require("cookie-parser");
require('dotenv').config();





app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));




app.get("/", (req, res) => {
    res.render("home");
});

app.use("/admin", adminRouter);
app.use("/user", userRouter);

module.exports = app;

