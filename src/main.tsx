import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import SEOProvider from './components/SEOProvider.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(
  <SEOProvider>
    <App />
  </SEOProvider>
);
