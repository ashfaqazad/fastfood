// Necessary imports for the Navbar component
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';  // For managing authentication token
import { Badge } from 'react-bootstrap';  // Bootstrap Badge for showing cart count
import Modal from '../Modal';  // Custom modal for Cart display
import Cart from '../Pages/Cart';  // Cart component for displaying cart items
import { useCart } from './ContextReducer';  // Custom hook to access cart data
import LoginModal from '../Components/LoginModal';  // Import LoginModal component
import SignupModal from '../Components/SignupModal';  // Import SignupModal component
import IconButton from '@mui/material/IconButton';  // IconButton for mobile view toggle
import MenuIcon from '@mui/icons-material/Menu';  // Menu icon for mobile drawer toggle
import { Drawer, List, ListItem, ListItemText } from '@mui/material';  // Drawer and List components for mobile menu

export default function Navbar() {
  let data = useCart();  // Access cart items using useCart hook

  // State for various UI controls
  const [cartView, setCartView] = useState(false);  // Toggles Cart modal
  const [isLoginOpen, setIsLoginOpen] = useState(false);  // Toggles Login modal
  const [isSignupOpen, setIsSignupOpen] = useState(false);  // Toggles Signup modal
  const [drawerOpen, setDrawerOpen] = useState(false);  // Toggles Drawer for mobile view
  const navigate = useNavigate();  // Navigation function from react-router

  // Logout function that removes auth token and navigates to home
  const handleLogout = () => {
    Cookies.remove('token');  // Removes token from cookies
    navigate('/');  // Redirect to home page
  };

  const authToken = Cookies.get('token');  // Retrieve auth token from cookies

  // Drawer toggle handler for mobile view
  const toggleDrawer = (open) => (event) => {
    // Prevents drawer from closing due to tab or shift keys
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);  // Set drawer open/close state
  };

  // Function to render items in the drawer menu
  const renderDrawerList = () => (
    <List>
      {/* Home link */}
      <ListItem button component={Link} to="/">
        <ListItemText primary="Home" />
      </ListItem>
      {/* My Orders link - visible if logged in */}
      {authToken && (
        <ListItem button component={Link} to="/MyOrders">
          <ListItemText primary="My Orders" />
        </ListItem>
      )}
      {/* Conditional rendering based on authToken - show Cart/Logout if logged in, else Login/Signup */}
      {authToken ? (
        <>
          <ListItem button onClick={() => setCartView(true)}>
            <ListItemText primary="My Cart" />
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemText primary="Logout" />
          </ListItem>
        </>
      ) : (
        <>
          <ListItem button onClick={() => setIsLoginOpen(true)}>
            <ListItemText primary="Login" />
          </ListItem>
          <ListItem button onClick={() => setIsSignupOpen(true)}>
            <ListItemText primary="Signup" />
          </ListItem>
        </>
      )}
    </List>
  );

  return (
    <div>
      {/* Main navigation bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow-lg">
        <div className="container-fluid">
          {/* Brand link */}
          <Link to="/" className="navbar-brand fs-1 fw-bold fst-italic">FastFood</Link>
          

          {/* IconButton for mobile view to toggle drawer */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            className="ms-auto d-lg-none"
          >
            <MenuIcon />
          </IconButton>

          {/* Desktop view navigation - visible on large screens only */}
          <div className="collapse navbar-collapse d-none d-lg-flex" id="navbarSupportedContent">
            <div className="d-flex align-items-center mt-1 w-100">

              
              <ul className="navbar-nav mb-2 mb-lg-0 me-auto">
                {/* Home link */}
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-5" aria-current="page" to="/"
                    style={{ textDecoration: 'none', fontSize: '1.2rem' }}
                  >
                    Home
                  </Link>
                </li>


                {/* My Orders link - visible if logged in */}
                {authToken && (
                  <li className="nav-item">
                    <Link
                      className="nav-link active fs-5" aria-current="page" to="/MyOrders"
                      style={{ textDecoration: 'none', fontSize: '1.2rem' }}
                    >
                      My Orders
                    </Link>
                  </li>
                )}
              </ul>


              {/* Auth controls - conditional rendering based on authToken */}
              <div className='d-flex ms-auto'>
                {authToken ? (
                  <>
                    {/* My Cart button with item count badge */}
                    <button 
                      className="btn bg-white text-success mx-1" 
                      onClick={() => setCartView(true)} 
                      style={{ textDecoration: 'none' }}
                    >
                      My Cart {"  "}
                      <Badge pill bg='danger'>{data.length}</Badge>
                    </button>
                    {/* Cart modal - visible when cartView is true */}
                    {cartView && (
                      <Modal onClose={() => setCartView(false)}>
                        <Cart />
                      </Modal>
                    )}
                    {/* Logout button */}
                    <button onClick={handleLogout} className="btn bg-white text-danger mx-1" style={{ textDecoration: 'none' }}>Logout</button>
                  </>
                ) : (
                  <>
                    {/* Login button - opens LoginModal */}
                    <button 
                      onClick={() => setIsLoginOpen(true)} 
                      className="btn bg-white text-success mx-1" 
                      style={{ textDecoration: 'none' }}
                    >
                      Login
                    </button>
                    {/* Signup button - opens SignupModal */}
                    <button 
                      onClick={() => setIsSignupOpen(true)} 
                      className="btn bg-white text-success mx-1" 
                      style={{ textDecoration: 'none' }}
                    >
                      Signup
                    </button>
                  </>
                )}
                
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Drawer for mobile view */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {renderDrawerList()}
      </Drawer>

      {/* Login and Signup modals */}
      {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}
      {isSignupOpen && <SignupModal onClose={() => setIsSignupOpen(false)} />}
    </div>
  );
}
