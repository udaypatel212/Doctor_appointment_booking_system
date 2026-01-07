const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role: {
        type: String,
        enum: ["superadmin", "admin"],
        default: "admin"
    },
    specialization:{
        type:String
    },
    experience:{
        type:String
    },
    bio:String,
    image:{
        type:String,
        default:"https://cdn-icons-png.flaticon.com/512/387/387561.png"
    }
});
              
module.exports = mongoose.model("Admin", adminSchema);
              
