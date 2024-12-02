import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './Style/ListStyle.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Footer from './Components/Footer';
import MyOrders from './Pages/MyOrders';
import { CartProvider } from './Components/ContextReducer';
import LoginModal from './Components/LoginModal';
import SignupModal from './Components/SignupModal';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const openLogin = () => {
    setIsSignupOpen(false);
    setIsLoginOpen(true);
  };

  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/MyOrders' element={<MyOrders />} />
          </Routes>
          <Footer />
          <button onClick={() => { openLogin(); }}>Test Open Login</button>

          {/* {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}
          {isSignupOpen && (
            <SignupModal
              onClose={() => setIsSignupOpen(false)}
              openLogin={openLogin}  // Ensure this is passed correctly
            />
          )} */}
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
