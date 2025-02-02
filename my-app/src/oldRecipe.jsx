import React, { useState, useEffect } from 'react';

function RecipeInput() {
  const [recipeName, setRecipeName] = useState('');
  const [ingredients, setIngredients] = useState('');

  // Load existing recipes from localStorage on component mount
  useEffect(() => {
    const storedRecipes = localStorage.getItem('recipes');
    if (storedRecipes) {
      const parsedRecipes = JSON.parse(storedRecipes);

      // Find the last used recipe name and ingredients (if any)
      const lastRecipe = parsedRecipes[parsedRecipes.length - 1] || {};
      setRecipeName(lastRecipe.name || '');
      setIngredients(lastRecipe.ingredients || '');
    }

  }, []); // Empty dependency array ensures this runs only once on mount


  const handleSaveRecipe = () => {

    const newRecipe = {
      name: recipeName,
      ingredients: ingredients
    };

    const storedRecipes = localStorage.getItem('recipes');
    const recipesArray = storedRecipes ? JSON.parse(storedRecipes) : [];


    recipesArray.push(newRecipe);
    localStorage.setItem('recipes', JSON.stringify(recipesArray));
    console.log(localStorage.getItem("recipes"));
    // Optional: Clear the input fields after saving
    setRecipeName('');
    setIngredients('');

  };

  return (
    <div>
      <label htmlFor="recipeName">Recipe Name:</label>
      <input
        type="text"
        id="recipeName"
        value={recipeName}
        onChange={(e) => setRecipeName(e.target.value)}
      />

      <br />

      <label htmlFor="ingredients">Ingredients (comma-separated):</label>
      <textarea
        id="ingredients"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />

      <br />

      <button onClick={handleSaveRecipe}>Save Recipe</button>
    </div>
  );
}

export default RecipeInput;

