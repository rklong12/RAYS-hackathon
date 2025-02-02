import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';


function GeminiMeaningOfLife() {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recipes, setRecipes] = useState('');
  const [predictions, setPredictions] = useState('');

  const apiKey = "AIzaSyCK4-pO3rdjk_zrxWseDEfgAwPAlYWvOQs"; // Store API key securely

  const handleClick = async () => {
    setIsLoading(true);
    setError(null);

    try {
      setRecipes(localStorage.getItem('recipes'));
      setPredictions(localStorage.getItem('predictionList'));

      let historicalRecipesString = "";
      if (recipes) {
        const recipeList = JSON.parse(recipes);
        historicalRecipesString = recipeList.map(recipe => `${recipe.name} with ${recipe.ingredients}`).join(", ");
      }

      let newIngredientsString = "";
      if (predictions) {
            const predictionList = JSON.parse(predictions);
            newIngredientsString = predictionList.join(", ");
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Or the appropriate Gemini model name
      const prompt = `Historically I have cooked ${historicalRecipesString}. Please suggest me 3-4 new recipes that utilize ${newIngredientsString} and are adjacent to my historical recipes.`;
      console.log(prompt)
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
      <button onClick={handleClick} disabled={isLoading}>
        {isLoading ? 'Asking Gemini...' : 'What is the meaning of life?'}
      </button>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {response && (
        <div>
          <h3>Gemini's Response:</h3>
          <pre>{response}</pre> {/* Use <pre> to preserve formatting */}
        </div>
      )}
    </div>
  );
}

export default GeminiMeaningOfLife;

