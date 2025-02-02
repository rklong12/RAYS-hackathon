import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import IngredientIdentifier from './Scanner.jsx'
import ImageUpload from './imageUpload.jsx'
import RecipeInput from './oldRecipe.jsx'
import GeminiMeaningOfLife from './suggestion.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>

    <title>recipe scanner</title>
    <img src="spice of life.webp" alt="spice of life" class="logo"/>
    
    <RecipeInput />

    <ImageUpload />
    <IngredientIdentifier />
    <GeminiMeaningOfLife />


  </StrictMode>,
)
