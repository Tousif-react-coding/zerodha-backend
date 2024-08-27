
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
//const { holdings , positions, watchlist } = require('./data');
const cors = require('cors')
const bodyParser = require('body-parser')
const Holdings = require("./models/holdings")
const Positions = require("./models/positions");
const WatchList = require('./models/watchList');
const Orders = require('./models/orders');
const app = express()
const PORT = 3000;
const auth = require("./auth");
const user = require("./router/user.js")
//middleware

app.use(cors())
app.use(bodyParser.json())

const URL = process.env.URL;
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(URL);
}

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
// Data initialization
// const getData = async()=>{
//   try {
//     // Delete all existing entries in the collections
//     await Holdings.deleteMany({});
//     await Positions.deleteMany({});
//     await WatchList.deleteMany({});

//     // Insert the new data
//     await Holdings.insertMany(holdings);
//     await Positions.insertMany(positions);
//     await WatchList.insertMany(watchlist);
    
//     console.log("Data inserted into Holdings and Positions collections.");
//   } catch (error) {
//     console.error("Error inserting data:", error);
//   }
// }
//Authentication

// getData()
app.get("/allHoldings", async(req, res )=>{
let allHoldings = await Holdings.find({});
res.json(allHoldings);
})

app.get("/allpositions", async(req, res )=>{
let allpositions = await Positions.find({});
res.json(allpositions);
})

app.get("/allWatchList", async(req, res )=>{
let allWatchList = await WatchList.find({});
res.json(allWatchList);
})

app.post('/newOrder', async (req, res) => {
  const { name, qty, price, mode } = req.body;

  // Validate and process the order data
  if (!name || !qty || !price || !mode) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Create a new order instance
    const newOrder = new Orders({
      name,
      qty,
      price,
      mode
    });

    // Save the order to the database
    await newOrder.save();

    // Respond with success
    res.status(200).json({ message: 'Order successfully placed' });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/orders', async (req, res) => {
  try {
    //const delOreder = await Orders.deleteMany({});
    const orders = await Orders.find(); // Fetch all orders
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

app.get("/dashboard", auth, (request, response) => {
  response.json({ message: "You are authorized to access me" });
  console.log("You are authorized to access me");
});
//Login or Signup  for frontend

app.use('/api' , user)



app.listen(PORT, () => {
  console.log(`App started on ${PORT}`)

});