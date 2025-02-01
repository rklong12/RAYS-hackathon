import React, { useState } from 'react';
import axios from 'axios';

function AddRecipeForm() {
  const [recipe, setRecipe] = useState({
    title: '',
    ingredients: '',
    steps: '',
    cookingTime: '',
    difficulty: '',
    cuisine: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/recipes', recipe)
      .then(response => {
        console.log('Recipe added successfully!');
      })
      .catch(error => {
        console.error('Error adding recipe:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" value={recipe.title} onChange={handleChange} placeholder="Recipe Title" required />
      <input type="text" name="cuisine" value={recipe.cuisine} onChange={handleChange} placeholder="Cuisine" required />
      <input type="text" name="cookingTime" value={recipe.cookingTime} onChange={handleChange} placeholder="Cooking Time" required />
      <textarea name="ingredients" value={recipe.ingredients} onChange={handleChange} placeholder="Ingredients" required />
      <textarea name="steps" value={recipe.steps} onChange={handleChange} placeholder="Steps" required />
      <button type="submit">Add Recipe</button>
    </form>
  );
}

export default AddRecipeForm;
