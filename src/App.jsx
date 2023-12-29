import React, { useState } from 'react';
import Login from './Login.jsx';
import './myStyles.css';
import Dashboard from './Dashboard.jsx';

export default function App() {
  //  TODO: Forgot Password Functionality?
  //  TODO: Data seperation?
  //  TODO: Sort by column functionality?
  //  TODO: Add a search bar to search for users by name
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken')); //

  const handleLogin = (accessToken, refreshToken) => {
    localStorage.setItem('authToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    setIsAuthenticated(true);
  };
  
  async function logout() {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:8080/api/v1/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        }
      });
      if (response.ok) {
        console.log("Logged out");
      } else 
        console.log(`Error logging out: ${response.status}`);
    } catch (error) {
        console.error(error);
    }
  }

  const handleLogout = () => {
    logout();
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    setIsAuthenticated(false);
  };

  return (
    <div>
      {isAuthenticated ? <Dashboard onLogout={handleLogout} /> : <Login onLogin={handleLogin} />}
    </div>
  );
}
