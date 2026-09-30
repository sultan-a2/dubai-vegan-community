import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Products from './Products.jsx'
import './styles.css'
import './redesign.css'
import './directory.css'
import { finishPageLoading } from './utils/pageLoader.js'
import './arrow-link.css'

createRoot(document.getElementById('root')).render(<StrictMode><Products /></StrictMode>)
finishPageLoading()
