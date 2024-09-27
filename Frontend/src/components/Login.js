import React, { useState } from 'react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { login } from '../services/api';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

export default function Login({ onLogin }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await login(credentials);
      localStorage.setItem('token', data.token);
      onLogin(); // Update the logged-in state
      navigate('/hardware'); // Redirect to the hardware page
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
      <Button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </Button>
      {error && <p className="text-red-500">{error}</p>}

      {/* Link to registration page */}
      <p>
        Don't have an account? <Link to="/register" className="text-blue-500">Register here</Link>
      </p>
    </form>
  );
}
