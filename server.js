// server.js
import 'dotenv/config'; // Loads variables from .env into process.env
import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai'; // Gemini API library

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' })); // Allow large payloads (for images)
app.use(express.static('public')); // Serve static files from the public folder

app.post('/analyze', async (req, res) => {
  console.log('Received request:', req.body);
  const { imageData, cuisines, previousDishes } = req.body;

  // Construct a prompt that tells Gemini what you need.
  // If you had OCRed text from the image, you might include that here.
  const prompt = `I have a grocery product with ingredients listed (image not processed). My preferred cuisines are: ${cuisines.join(', ')}. 
I have previously cooked: ${previousDishes.length ? previousDishes.join(', ') : 'none'}. 
Based on these details, please suggest some recipes or ingredient substitution ideas.`;

  try {
    // Retrieve your Gemini API key from the environment variables.
    const apiKey = process.env.GEMINI_API_KEY;
    // Initialize the Gemini API client with your API key.
    const genAI = new GoogleGenerativeAI(apiKey);
    // Get the generative model you want to use (for example, "gemini-1.5-flash").
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Generate content by sending your prompt to Gemini.
    const result = await model.generateContent(prompt);
    // Extract the text response from the result.
    const responseText = result.response.text();
    console.log('Gemini API result:', responseText);

    // Send the result back to the client.
    res.json({ response: responseText });
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    res.status(500).json({ error: 'Gemini API error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
