import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  backgroundColor: 'rgb(34,34,34)',
  transform: 'translate(-50%, -50%)',
  zIndex: 1000,
  padding: '20px',
  border: '3px solid #198754',
  borderRadius: '8px',
  width: '90%',
  maxWidth: '500px', // limits max width for larger screens
  boxSizing: 'border-box', // ensures padding is included in width
  
};

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  // backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000,
};

export default function LoginModal({ onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post(`http://localhost:5000/api/login`, {
      email,
      password
    }).then(response => {
      if (response.data.status) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userEmail', email);
        console.log('JWT Token:', response.data.token);
        navigate('/');
        onClose();
      }
    }).catch(err => {
      console.log(err);
    });
  };

  return ReactDOM.createPortal(
    <>
      <div style={OVERLAY_STYLES} onClick={onClose} />
      <div style={MODAL_STYLES}>
        <button className="btn bg-danger" 
        style=
        {{ position: 'absolute',
        top: '-20px',
        right: '1px',
        borderRadius: '50%',
        padding: '5px 10px',

      }}
        onClick={onClose}>
          X
          </button>

          
        <div className="container d-flex justify-content-center align-items-center">
          <div className="card p-4 bg-transparent text-white w-100">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control text-white"
                  id="email"
                  placeholder="Enter your Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control text-white"
                  id="password"
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-success w-100">Login</button>
            </form>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('modal-root')
  );
}
