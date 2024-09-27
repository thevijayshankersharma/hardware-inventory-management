import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home'; // Import Home component
import Login from './components/Login';
import Register from './components/Register'; // Import Register component
import HardwareList from './components/HardwareList';
import BarcodeScanner from './components/BarcodeScanner';
import { Button } from "./components/ui/button";
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is already logged in by verifying the token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Handle user login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        {/* Header with conditional Login and Logout buttons */}
        <header className="App-header">
          <h1>MP Police Hardware Inventory Management</h1>
          {isLoggedIn && <Button onClick={handleLogout}>Logout</Button>}
        </header>
        <main>
          {/* Routes */}
          <Routes>
            {/* Redirect to hardware page if logged in, otherwise show Home */}
            <Route path="/" element={isLoggedIn ? <Navigate to="/hardware" replace /> : <Home />} />
            
            {/* Login route */}
            <Route path="/login" element={<Login onLogin={handleLogin} />} />

            {/* Registration route */}
            <Route path="/register" element={<Register />} />

            {/* Hardware section, available only if logged in */}
            <Route path="/hardware" element={
              isLoggedIn ? (
                <>
                  <HardwareList />
                  <BarcodeScanner onDetected={(code) => console.log('Detected:', code)} />
                </>
              ) : (
                <Navigate to="/" replace /> // Redirect to Home if not logged in
              )
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
