import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import VomzerContextProvider from './context/VomzerContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <VomzerContextProvider>
      <App />
    </VomzerContextProvider>
  </BrowserRouter>,
)
