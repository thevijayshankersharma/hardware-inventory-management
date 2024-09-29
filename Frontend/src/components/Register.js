"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { register } from "../services/api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, UserPlus } from "lucide-react";
import { useToast } from "./ui/use-toast";

export default function Register() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await register(credentials);
      toast({
        title: "Success",
        description: "Registration successful! You can now log in.",
      });
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error);
      toast({
        title: "Error",
        description: "Registration failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4"
    >
      <div className="w-full max-w-md">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-8 rounded-lg shadow-2xl space-y-6"
        >
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">Register</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <Input
                id="username"
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                placeholder="Choose a username"
                required
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <Input
                id="password"
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="Choose a password"
                required
                className="w-full"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-200"
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <UserPlus className="mr-2 h-4 w-4" />
              )}
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>
          <p className="text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Button
              onClick={() => navigate('/login')}
              variant="link"
              className="p-0 h-auto font-medium text-blue-600 hover:underline"
            >
              Login
            </Button>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
