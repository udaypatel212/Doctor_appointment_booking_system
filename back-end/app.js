// const express = require('express');
// const app = express();
// require('dotenv').config();
// const cors = require('cors');
// const path = require('path');
// const ejs = require('ejs');
// const userRouter = require("./routes/userRouter");
// const adminRouter = require("./routes/adminRouter");
// const cookieParser = require("cookie-parser");
// const db = require("./dbconnect/connection");
// app.use(cookieParser());
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use("/admin", adminRouter);
// app.use("/user", userRouter);
// module.exports = app;

const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
// DB
require("./dbconnect/connection");
// middleware
app.use(cookieParser());
app.use(cors({
  origin: CLIENT_URL, // will change later
  credentials: true
}));
// app.use(cors({
//   origin: "http://localhost:5173", // will change later
//   credentials: true
// }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/admin", require("./routes/adminRouter"));
app.use("/user", require("./routes/userRouter"));
const distPath = path.join(__dirname, "../front-end/dist");
app.use(express.static(distPath));
app.use((req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

module.exports = app;
