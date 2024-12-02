// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// import Axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';

// function SignUp() {
//   const [name, setname] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [geoLocation, setgeoLocation] = useState('');

//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await Axios.post('http://localhost:5000/api/signup', {
//         name,
//         email,
//         password,
//         location: geoLocation 
//       });
      
//       if (response.data.status) {
//         navigate('/login');
//       } else {
//         setError(response.data.message || 'An error occurred');
//       }
//     } catch (err) {
//       setError('An error occurred');
//       console.error(err);
//     }
//   };

//   return (
//     <div className="container d-flex justify-content-center align-items-center vh-100">
//       <div className="card p-4 bg-transparent text-white" style={{ width: '50%' }}>
//         <h1 className="mb-4">Sign up form</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="Name" className="form-label">Name</label>
//             <input
//               type="text"
//               className="form-control"
//               id="Name"
//               placeholder="Enter your name"
//               value={name}
//               onChange={(e) => setname(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="email" className="form-label">Email</label>
//             <input
//               type="email"
//               className="form-control"
//               id="email"
//               placeholder="Enter your email address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="password" className="form-label">Password</label>
//             <input
//               type="password"
//               className="form-control"
//               id="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           <div className="mb-3">
//             <label htmlFor="geolocation" className="form-label">Location</label>
//             <input
//               type="text"
//               className="form-control"
//               id="location"
//               placeholder="Enter your location"
//               value={geoLocation}
//               onChange={(e) => setgeoLocation(e.target.value)}
//             />
//           </div>


//           {error && <div className="alert alert-danger">{error}</div>}
//           <button type="submit" className="btn btn-success">Sign up</button>
//           <p className="mt-3">Have an account? <Link to='/login'>Login</Link></p>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default SignUp;
