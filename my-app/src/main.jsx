import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import IngredientIdentifier from './Scanner.jsx'
import RecipeList from './fetch.jsx'
import AddRecipeForm from './post.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/*<App /> */}

    <RecipeList />
    <AddRecipeForm />

    <IngredientIdentifier />




  </StrictMode>,
)
