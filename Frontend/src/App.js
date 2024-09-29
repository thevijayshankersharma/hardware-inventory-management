import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import HardwareList from './components/HardwareList';
import BarcodeScanner from './components/BarcodeScanner';
import { Button } from "./components/ui/button";

const Header = ({ isLoggedIn, onLogout }) => (
  <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
    <h1 className="text-2xl">MP Police Hardware Inventory Management</h1>
    {isLoggedIn && <Button onClick={onLogout} className="bg-red-500 hover:bg-red-600">Logout</Button>}
  </header>
);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <main className="p-4">
          <Routes>
            <Route path="/" element={isLoggedIn ? <Navigate to="/hardware" replace /> : <Home />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/hardware" element={isLoggedIn ? (
              <>
                <HardwareList />
                <BarcodeScanner onDetected={(code) => console.log('Detected:', code)} />
              </>
            ) : (
              <Navigate to="/" replace />
            )} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
