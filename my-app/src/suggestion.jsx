import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';


function GeminiMeaningOfLife() {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = "AIzaSyCK4-pO3rdjk_zrxWseDEfgAwPAlYWvOQs"; // Store API key securely

  const handleClick = async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("suggestion is handling click");
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Or the appropriate Gemini model name
      const prompt = "What is the meaning of life?";

      const result = await model.generateContent(prompt);
      setResponse(result.response.text());
      
      console.log(result.response.text());

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

