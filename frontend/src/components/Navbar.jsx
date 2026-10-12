/**
 * Navbar Component
 * Application header with title and health status
 */

import React from 'react';

const Navbar = ({ healthStatus }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-title">
          👥 Employee Management System
        </h1>
        <div className="navbar-status">
          <span className={`status-indicator ${healthStatus ? 'online' : 'offline'}`}>
            {healthStatus ? '🟢 Online' : '🔴 Offline'}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
