import React, { useState } from 'react';
import SignupModal from './SignupModal';
import LoginModal from './LoginModal';

export default function ParentComponent () {
  const [showSignup, setShowSignup] = useState(true);
  const [showLogin, setShowLogin] = useState(false);

  const handleSignupClose = () => {
    setShowSignup(false);
    setShowLogin(true); // Show LoginModal after closing SignupModal
  };

  const handleLoginClose = () => {
    setShowLogin(false);
  };

  return (
    <div>
      {showSignup && <SignupModal onClose={handleSignupClose} />}
      {showLogin && <LoginModal onClose={handleLoginClose} />}
    </div>
  );
};

