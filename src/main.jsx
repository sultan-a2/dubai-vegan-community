import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/caveat/400.css'
import App from './App.jsx'
import './styles.css'
import './redesign.css'
import './recipes.css'
import './directory.css'
import './explore.css'
import './feedback.css'
import { finishPageLoading } from './utils/pageLoader.js'
import './arrow-link.css'
import './reference.css'
import './home-restored.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
finishPageLoading()
