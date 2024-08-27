const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ordersSchema = new Schema({
   
      name: String,
      qty: Number,
      price: Number,
      mode: String,
      createdAt: { type: Date, default: new Date() }
      
})

const Orders = mongoose.model("order" , ordersSchema);
module.exports = Orders