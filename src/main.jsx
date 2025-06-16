import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import Routes from './Routes/Routes.jsx'
import CursorDetector from './Dashboard/Hooks/CursorDetectore.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CursorDetector>
      <RouterProvider router={Routes}>
        <App />
      </RouterProvider>
    </CursorDetector>
  </StrictMode>,
)
