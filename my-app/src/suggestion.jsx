import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

function GeminiMeaningOfLife() {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recipes, setRecipes] = useState('');
  const [predictions, setPredictions] = useState('');
  const [selectedCuisines, setSelectedCuisines] = useState([]);

  // List of cuisines for the checklist
  const availableCuisines = [
    'Japanese',
    'Chinese',
    'Indian',
    'Mediterranean',
    'American',
    'Italian',
    'Spanish',
    'Mexican',
    'Korean',
    'Thai',
    'French',
    'Turkish'
  ];

  // Toggle checkbox selection
  const handleCheckboxChange = (e, cuisine) => {
    if (e.target.checked) {
      setSelectedCuisines((prev) => [...prev, cuisine]);
    } else {
      setSelectedCuisines((prev) => prev.filter((item) => item !== cuisine));
    }
  };

  const handleClick = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Retrieve recipes and prediction data from localStorage
      const storedRecipes = localStorage.getItem('recipes');
      const storedPredictions = localStorage.getItem('predictionList');
      setRecipes(storedRecipes);
      setPredictions(storedPredictions);

      let historicalRecipesString = "";
      if (storedRecipes) {
        const recipeList = JSON.parse(storedRecipes);
        historicalRecipesString = recipeList
          .map(recipe => `${recipe.name} with ${recipe.ingredients}`)
          .join(", ");
      }

      let newIngredientsString = "";
      if (storedPredictions) {
        const predictionList = JSON.parse(storedPredictions);
        newIngredientsString = predictionList.join(", ");
      }

      // Create a string from the selected cuisines. If none are selected, a default value is used.
      const cuisinesString = selectedCuisines.length > 0 ? selectedCuisines.join(", ") : "various cuisines";

      // Build the prompt using the historical recipes, new ingredients, and selected cuisines.
      const prompt = `Historically, I have cooked ${historicalRecipesString || 'no recipes'}. Recently, I have identified new ingredients: ${newIngredientsString || 'none'}. I prefer the following cuisines: ${cuisinesString}. Please suggest 3-4 new recipes that are adjacent to my historical recipes and incorporate these cuisines.`;
      console.log("Prompt:", prompt);

      // Initialize Gemini generative AI
      const apiKey = "AIzaSyCK4-pO3rdjk_zrxWseDEfgAwPAlYWvOQs"; // Store API key securely in production!
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      setResponse(result.response.text());
      
    } catch (err) {
      console.error("Error querying Gemini API:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div>
        <p>Select desired cuisines:</p>
        {availableCuisines.map((cuisine) => (
          <label key={cuisine} style={{ marginRight: '1rem' }}>
            <input
              type="checkbox"
              value={cuisine}
              checked={selectedCuisines.includes(cuisine)}
              onChange={(e) => handleCheckboxChange(e, cuisine)}
            />
            {cuisine}
          </label>
        ))}
      </div>
      <button onClick={handleClick} disabled={isLoading}>
        {isLoading ? 'Asking Gemini...' : 'Suggest recipes!'}
      </button>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {response && (
        <div>
          <h3>Gemini's Response:</h3>
          <pre>{response}</pre>
        </div>
      )}
    </div>
  );
}

export default GeminiMeaningOfLife;
