"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { register } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, UserPlus, Eye, EyeOff, Shield, Home } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { Card } from "./ui/card";

export default function Register() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const validatePassword = (password) => {
    const strongPasswordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    if (!strongPasswordRegex.test(password)) {
      setPasswordError("Password must be at least 8 characters long, contain a number, a special character, and an uppercase letter.");
    } else {
      setPasswordError("");
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    if (e.target.name === "password") {
      validatePassword(e.target.value);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (credentials.password !== e.target.value) {
      setConfirmPasswordError("Passwords do not match!");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (credentials.password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match!",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    if (passwordError || confirmPasswordError) {
      toast({
        title: "Error",
        description: passwordError || confirmPasswordError,
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      await register(credentials);
      toast({
        title: "Success",
        description: "Registration successful! You can now log in.",
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
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
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-200 p-4"
    >
      <Card className="w-full max-w-md p-8 bg-white/80 backdrop-blur-sm shadow-xl rounded-xl">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <div className="flex flex-col items-center mb-8 relative">
            <Shield className="h-12 w-12 text-blue-600 mb-4" />
            <button
              className="absolute right-0 top-0 flex items-center bg-white border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition duration-200 p-2 rounded-full shadow-lg"
              onClick={() => navigate("/")}
            >
              <Home className="mr-2 h-5 w-5" />
              Home
            </button>
          </div>
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">Register for MP Police Hardware Inventory</h2>
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
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="Choose a password"
                  required
                  className="w-full"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
              {passwordError && <p className="text-red-600 text-sm">{passwordError}</p>}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"} // Use the new visibility state
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  placeholder="Confirm your password"
                  required
                  className="w-full"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle the new state
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
              {confirmPasswordError && <p className="text-red-600 text-sm">{confirmPasswordError}</p>}
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-md transition duration-200"
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
            <Link
              to="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Login here
            </Link>
          </p>
        </motion.div>
      </Card>
    </motion.div>
  );
}