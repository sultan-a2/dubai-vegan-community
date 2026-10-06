import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Events from './Events.jsx'
import './styles.css'
import './redesign.css'
import './directory.css'
import './events.css'
import { finishPageLoading } from './utils/pageLoader.js'
import './arrow-link.css'
import './reference.css'

createRoot(document.getElementById('root')).render(<StrictMode><Events /></StrictMode>)
finishPageLoading()
