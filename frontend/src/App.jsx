import './App.css';
import { Navbar } from './Components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { Product } from './Pages/Product';
import { LoginSIgnup } from './Pages/LoginSIgnup';
import { Cart } from './Pages/Cart';
import { Shop } from './Pages/Shop';
import { AllProducts } from './Pages/Allproducts';
import { Wishlist } from './Pages/Wishlist';
import { AboutUs } from './Pages/AboutUs';
import { Checkout } from './Pages/Checkout';
import { PaymentSuccess } from './Pages/PaymentSuccess';
import { EsewaPayment } from './Pages/EsewaPayment'
import { Footer } from './Components/Footer';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 2500,
            icon: null,
            style: {
              background: '#fff',
              color: '#000',
              fontFamily: "'Inter', serif",
              fontSize: '16px',
              fontWeight: 400,
              letterSpacing: '0.05em',
              padding: '14px 28px',
              borderRadius: '0px',
              borderBottom: '2px solid #000',
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            },
          }}
        />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/shop' element={<AllProducts />} />

          <Route path="/product" element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>

          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<LoginSIgnup />} />
          <Route path='/wishlist' element={<Wishlist />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/payment/success' element={<PaymentSuccess />} />
          <Route path='/esewa-pay' element={<EsewaPayment />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;