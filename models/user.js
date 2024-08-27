const mongoose = require("mongoose");
const Schema = mongoose.Schema


const userSchema = new Schema({
  name:{
    type:String},
    email: {
        type: String,
        required: [true, "Please provide an Email!"],
        unique: [true, "Email Exist"],
      },
    
      password: {
        type: String,
        required: [true, "Please provide a password!"],
        unique: false,
      },
  
});

const User = mongoose.model("user" , userSchema);
module.exports = User;