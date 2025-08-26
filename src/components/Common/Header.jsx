import React from 'react';
import { getCurrentUser, logout } from '../../utils/auth';
import './Common.css';

const Header = () => {
  const user = getCurrentUser();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <h1 className="header-title">Image Manager</h1>
        </div>
        
        <div className="header-right">
          <span className="user-welcome">
            Welcome, {user?.username || 'User'}
          </span>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;