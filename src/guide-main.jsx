import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Guide from './Guide.jsx'
import './styles.css'
import './redesign.css'
import './directory.css'
import './guide.css'
import { finishPageLoading } from './utils/pageLoader.js'
import './arrow-link.css'
import './reference.css'

createRoot(document.getElementById('root')).render(<StrictMode><Guide /></StrictMode>)
finishPageLoading()
