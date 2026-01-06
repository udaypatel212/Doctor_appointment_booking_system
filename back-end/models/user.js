const mongoose=require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone:Number,
  appointment:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "appointment"
      },
  slot:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "slot"
      }
});

module.exports=mongoose.model("user",userSchema);    
