const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const watchListSchema = new Schema({
    name: String,
    price: Number,
    percent: String,
    isDown: Boolean,
})

const WatchList = mongoose.model("watchlist" , watchListSchema);
module.exports = WatchList