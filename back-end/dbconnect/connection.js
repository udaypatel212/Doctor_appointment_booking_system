const mongoose=require("mongoose");

mongoose.connect(`${process.env.MONGO_URI}/dentist`).then(()=>{
    console.log("connection successful");
}).catch((e)=>{
    console.log("no connection");
});

module.exports=mongoose.connection;
