// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">Welcome to MP Police Hardware Inventory Management</h1>
      <p className="text-lg text-center text-gray-600 mb-8">Manage your hardware inventory efficiently and effectively.</p>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">Features:</h2>
      <ul className="list-disc list-inside mb-8">
        <li className="text-lg text-gray-600">User Registration</li>
        <li className="text-lg text-gray-600">Hardware Tracking</li>
        <li className="text-lg text-gray-600">Inventory Management</li>
      </ul>
      <div className="flex space-x-4">
        <Link to="/register">
          <button className="btn bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition duration-200">Register</button>
        </Link>
        <Link to="/login">
          <button className="btn bg-green-500 text-white px-4 py-2 rounded-md shadow hover:bg-green-600 transition duration-200">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
