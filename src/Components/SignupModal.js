import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';

const SignupModal = ({ onClose, openLogin }) => {
  console.log('openLogin:', openLogin); // Debug

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [geoLocation, setGeoLocation] = useState('');
  const [error, setError] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767); // Check if screen width is mobile size

  // Update isMobile state on window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 767);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    console.log('SignupModal rendered, openLogin:', openLogin);
  }, [openLogin]);
  

  // Axios.defaults.withCredentials = true;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      
      const response = await Axios.post(`http://localhost:5000/api/signup`, {
        name,
        email,
        password,
        location: geoLocation,
      });
  
      if (response.data.status) {
        if (typeof openLogin === 'function') {
          openLogin();  // Call openLogin to open the LoginModal
        } else {
          console.error('openLogin is not a function');
        }
        onClose(); // Close the modal on successful signup
      } else {
        setError(response.data.message || 'An error occurred');
      }
    } catch (err) {
      setError('An error occurred');
      console.error(err);
    }
  };
  
  // Dynamic styles
  const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    backgroundColor: 'rgb(34,34,34)',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
    width: '90%',
    maxWidth: '500px',
    height: isMobile ? 'auto' : '80%',
    maxHeight: '80%',
    border: '3px solid #198754', // bg-success color for border
    padding: '20px',
    borderRadius: '8px',
    overflowY: isMobile ? 'auto' : 'hidden', // Enable scrolling if content overflows on mobile
  };

  const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1000,
  };

  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <button
          className="btn bg-danger"
          style={{
            position: 'absolute',
            zIndex: 50,
            top: '3px',
            right: '3px',
            borderRadius: '50%',
            padding: '5px 10px',
          }}
          onClick={onClose}
        >
          X
        </button>

        <div className="container d-flex justify-content-center align-items-center h-100">
          <div className="card p-4 bg-transparent text-white w-100">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="Name" className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="Name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="geolocation" className="form-label">Location</label>
                <input
                  type="text"
                  className="form-control"
                  id="geolocation"
                  placeholder="Enter your location"
                  value={geoLocation}
                  onChange={(e) => setGeoLocation(e.target.value)}
                />
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <button type="submit" className="btn btn-success w-100">Sign up</button>
            </form>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('modal-root')
  );
}

export default SignupModal;
