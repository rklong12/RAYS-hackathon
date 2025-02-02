import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import IngredientIdentifier from './Scanner.jsx'
import RecipeInput from './oldRecipe.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RecipeInput />
    <App />
    <IngredientIdentifier />

  </StrictMode>,
)
