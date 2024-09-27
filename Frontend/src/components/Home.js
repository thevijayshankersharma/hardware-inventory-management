// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Optional: Add some styles for your home page

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to MP Police Hardware Inventory Management</h1>
      <p>Manage your hardware inventory efficiently and effectively.</p>
      <h2>Features:</h2>
      <ul>
        <li>User Registration</li>
        <li>Hardware Tracking</li>
        <li>Inventory Management</li>
      </ul>
      <div className="button-container">
        <Link to="/register">
          <button className="btn">Register</button>
        </Link>
        <Link to="/login">
          <button className="btn">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
