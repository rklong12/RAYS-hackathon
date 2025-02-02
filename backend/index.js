// server/index.js
const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5000;  // Use port from environment or 5000

const uri = process.env.MONGODB_URI; // Your MongoDB connection string

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if the connection fails
  }
}

connectToDatabase();

app.use(express.json()); // Enable parsing JSON request bodies

// Example route to fetch data
app.get('/api/items', async (req, res) => {
  try {
    const db = client.db("your_database_name"); // Replace with your DB name
    const collection = db.collection("your_collection_name"); // Replace with your collection name
    const items = await collection.find({}).toArray(); // Fetch all items
    res.json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Error fetching items" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});