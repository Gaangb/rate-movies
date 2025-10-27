import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './scss/styles.scss'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import { SnackbarProvider } from 'notistack'

createRoot(document.getElementById('root')).render(
  <SnackbarProvider
    maxSnack={3}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    autoHideDuration={3000}
  >
    <StrictMode>
      <App />
    </StrictMode>
  </SnackbarProvider>,
)
