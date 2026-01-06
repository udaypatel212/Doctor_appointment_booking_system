const express = require('express');
const router = express.Router();

const { registerUser, loginUser,logout } = require('../controllers/user');
const appointment = require('../models/appointment');
const {isLoggedIn} = require("../middlewares/isLoggedIn");
const { book_appointment} = require('../controllers/appointment');
const {show_appointment}=require("../controllers/appointment");



router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout",logout);
router.get("/show_appointment",isLoggedIn, show_appointment);
router.post("/book_appointment",isLoggedIn, book_appointment);
module.exports = router;