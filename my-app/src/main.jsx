import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import IngredientIdentifier from './Scanner.jsx'
import ImageUpload from './imageUpload.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/*
    <App /> 
    */}

    <ImageUpload />
    <IngredientIdentifier />
  </StrictMode>,
)
