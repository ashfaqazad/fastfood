import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post('http://localhost:5000/api/login', {
      email,
      password
    }).then(response => {
      if (response.data.status) {
        // JWT Token and Email stored in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userEmail', email);

        console.log('JWT Token:', response.data.token);
        navigate('/');
      }
    }).catch(err => {
      console.log(err);
    });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 bg-transparent text-white" style={{ width: '50%' }}>
        <h1 className="mb-4">Login form</h1>
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
          <button type="submit" className="btn btn-success mr-3">Login</button>
          <Link to="/forgotPassword" className='m-2'>Forgot Password</Link>
          <p>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Login;
