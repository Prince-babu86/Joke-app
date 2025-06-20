import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import  { DataProvider } from './Context/Wrapper.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
   <DataProvider>
     <App />
   </DataProvider>
  </BrowserRouter>,
)
