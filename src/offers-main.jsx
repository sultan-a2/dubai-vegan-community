import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Offers from './Offers.jsx'
import './styles.css'
import './redesign.css'
import './directory.css'
import './arrow-link.css'
import './reference.css'
import { finishPageLoading } from './utils/pageLoader.js'

createRoot(document.getElementById('root')).render(<StrictMode><Offers /></StrictMode>)
finishPageLoading()
