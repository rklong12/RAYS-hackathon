const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/recipeDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Define a Recipe schema
const recipeSchema = new mongoose.Schema({
  title: String,
  ingredients: [{ name: String, amount: String }],
  steps: [String],
  cookingTime: String,
  difficulty: String,
  cuisine: String
});

// Create a Recipe model
const Recipe = mongoose.model('Recipe', recipeSchema);

// API route to get all recipes
app.get('/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).send('Error retrieving recipes');
  }
});

// API route to add a new recipe
app.post('/recipes', async (req, res) => {
  try {
    const newRecipe = new Recipe(req.body);
    await newRecipe.save();
    res.status(201).send('Recipe added');
  } catch (err) {
    res.status(500).send('Error adding recipe');
  }
});

// Start server
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
