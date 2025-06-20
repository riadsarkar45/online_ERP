import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import Routes from './Routes/Routes.jsx'
import CursorDetector from './Dashboard/Hooks/CursorDetectore.jsx'
import Theme from './Dashboard/Hooks/Theme.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Theme>
      <CursorDetector>
        <RouterProvider router={Routes}>
          <App />
        </RouterProvider>
      </CursorDetector>
    </Theme>
  </StrictMode>,
)
