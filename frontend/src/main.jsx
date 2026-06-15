import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ShopContextProvider from './Context/ShopContext'
import WishlistContextProvider from './Context/WishlistContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="106102425157-m77duf1p0hsjo3ag3dqkm24f3o3qfg0t.apps.googleusercontent.com">  
    <ShopContextProvider>
      <WishlistContextProvider> 
        <App />
      </WishlistContextProvider>
    </ShopContextProvider>
    
</GoogleOAuthProvider>
  </StrictMode>,
)