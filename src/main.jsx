import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import Routes from './Routes/Routes.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={Routes}>
        <App />
    </RouterProvider>
  </StrictMode>,
)
