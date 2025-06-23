import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import Routes from './Routes/Routes.jsx'
import CursorDetector from './Dashboard/Hooks/CursorDetectore.jsx'
import Theme from './Dashboard/Hooks/Theme.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Theme>
        <CursorDetector>
          <RouterProvider router={Routes}>
            <App />
          </RouterProvider>
        </CursorDetector>
      </Theme>
    </QueryClientProvider>

  </StrictMode>,
)
