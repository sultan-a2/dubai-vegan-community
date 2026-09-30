import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/caveat/400.css'
import About from './About.jsx'
import './styles.css'
import './redesign.css'
import './about.css'
import { finishPageLoading } from './utils/pageLoader.js'
import './arrow-link.css'

createRoot(document.getElementById('root')).render(<StrictMode><About /></StrictMode>)
finishPageLoading()
