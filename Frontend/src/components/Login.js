"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { login } from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, LogIn, Eye, EyeOff, Shield } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { Card } from "./ui/card";

export default function Login({ onLogin }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await login(credentials);
      localStorage.setItem("token", data.token);
      onLogin();
      navigate("/hardware");
      toast({
        title: "Success",
        description: "You have successfully logged in.",
      });
    } catch (error) {
      console.error("Login failed:", error);
      toast({
        title: "Error",
        description:
          "Login failed. Please check your credentials and try again.",
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
          <div className="flex justify-center mb-8">
            <Shield className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
            Login to MP Police Hardware Inventory
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <Input
                id="username"
                type="text"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                placeholder="Enter your username"
                required
                className="w-full"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="w-full"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-md transition duration-200"
            >
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <LogIn className="mr-2 h-4 w-4" />
              )}
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <p className="text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:underline font-medium"
            >
              Register here
            </Link>
          </p>
        </motion.div>
      </Card>
    </motion.div>
  );
}