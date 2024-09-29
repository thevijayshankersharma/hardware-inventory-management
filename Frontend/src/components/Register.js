import React, { useState } from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { register } from '../services/api'; // Ensure this function is correctly defined
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

export default function Register() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate for routing

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await register(credentials); // Call the register function
      alert('Registration successful! You can now log in.');
      navigate('/'); // Redirect to login page after successful registration
    } catch (error) {
      console.error('Registration failed:', error);
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h2 className="mb-4 text-2xl font-semibold">Register</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 bg-white p-6 rounded-lg shadow-md">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <Input
            id="username"
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <Input
            id="password"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Registering...' : 'Register'}
        </Button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
      <div className="mt-4">
        <p>Already have an account? 
          <Button onClick={() => navigate('/login')} className="ml-1">Login</Button>
        </p>
      </div>
    </div>
  );
}
