import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { ShopProvider } from './context/ShopContext.tsx'

createRoot(document.getElementById('root')!).render(
  <Router>
    <ShopProvider>
      <App />
    </ShopProvider>
  </Router>
)
