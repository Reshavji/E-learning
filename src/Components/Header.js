import React, { useState } from 'react';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import Login from './Login';
import { Link } from 'react-router-dom';
import { useStateValue } from '../Context/StateProvider';
import { Dialog } from '@material-ui/core';
import { auth } from '../config/firebase';
import './Header.css';

function Header() {
  const [{ user }, dispatch] = useStateValue();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUserOptions, setShowUserOptions] = useState(false); // Add state for user options visibility

  const handleLoginButtonClick = () => {
    setShowLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        console.log("User logged out successfully!");
        // Clear user data from the global state by setting user to null
        dispatch({
          type: 'SET_USER',
          user: null,
        });
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  const handleAdminClick = () => {
    setShowUserOptions(!showUserOptions); // Toggle the visibility of user options div
  };

  const handleUserOptionsMouseEnter = () => {
    if (user) {
      setShowUserOptions(true);
    }
  };

  const handleUserOptionsMouseLeave = () => {
    setShowUserOptions(false);
  };

  const linkStyle = {
    textDecoration: 'none',
  };

  return (
    <div className='header-container'>
      <div className='header-one'>
        <div className='navbar-one'></div>
        <div className="search-bar">
          <input type="text" id='search-input' placeholder='search Course..' />
          <SearchOutlinedIcon className="search-icon" />
        </div>
        <div className='header-icons'>
          <div className='cart'>
            <ShoppingCartOutlinedIcon className="cart-icon" />
            <span className='header-text'>Cart</span>
          </div>
          <div
            className='avatar'
            onMouseEnter={handleUserOptionsMouseEnter}
            onMouseLeave={handleUserOptionsMouseLeave}
          >
            {user ? (
              <div className='admin' onClick={handleAdminClick}>
                <PersonOutlineIcon className="cart-icon" />
                <span className='header-text'>{user.displayName || user.name}</span>
              </div>
            ) : (
              <button className='login-btn' onClick={handleLoginButtonClick}>
                Login
              </button>
            )}
            {showUserOptions && user && (
              <div className="user-options">
                <Link to="/profile" style={linkStyle}>
                  <span className="option">Profile</span>
                </Link>
                <Link to="/dashboard" style={linkStyle}>
                  <span className="option">Dashboard</span>
                </Link>
                <Link to="/courses" style={linkStyle}>
                  <span className="option">Courses</span>
                </Link>
                <button className='logout-btn' onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='header-two'>
        <span id="logo">Xpert</span>
        <nav>
          <ul>
            <Link to="/" style={linkStyle}><li>Home</li></Link>
            <li>About</li>
            <li>Course</li>
            <li>Teachers</li>
            <li>Contact</li>
          </ul>
        </nav>
      </div>

      {/* Login Modal */}
      <Dialog open={showLoginModal} onClose={handleCloseLoginModal}>
        <Login handleCloseLoginModal={handleCloseLoginModal} />
      </Dialog>
    </div>
  );
}

export default Header;
