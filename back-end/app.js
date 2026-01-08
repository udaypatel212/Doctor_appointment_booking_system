const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const ejs = require('ejs');
const userRouter = require("./routes/userRouter");
const adminRouter = require("./routes/adminRouter");
const cookieParser = require("cookie-parser");
const db = require("./dbconnect/connection");
const paymentRouter = require("./routes/paymentRouter");






app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/payment", paymentRouter);

module.exports = app;

