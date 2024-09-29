"use client"

import React from "react"
import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import { Shield, Database, BarChart2, Zap, ChevronRight, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const pulse = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-200">
      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center"
            initial="initial"
            animate="animate"
            variants={staggerChildren}
          >
            <motion.h1 
              className="text-5xl font-extrabold sm:text-6xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
              variants={fadeInUp}
            >
              MP Police Hardware
              <br />
              Inventory Management
            </motion.h1>
            <motion.p 
              className="mt-6 max-w-md mx-auto text-lg text-gray-600 sm:text-xl md:mt-8 md:max-w-3xl"
              variants={fadeInUp}
            >
              Empower your department with cutting-edge technology for seamless hardware tracking and management.
            </motion.p>
            <motion.div 
              className="mt-10 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6"
              variants={fadeInUp}
            >
              <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
                <Link to="/login">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                <Link to="/register">Learn More <ChevronRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            className="mt-24 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerChildren}
            initial="initial"
            animate="animate"
          >
            {[
              {
                icon: <Shield className="h-12 w-12 text-blue-600" />,
                title: "Secure",
                description: "Protect sensitive hardware information",
                content: "Advanced encryption and access controls safeguard your inventory data."
              },
              {
                icon: <Database className="h-12 w-12 text-blue-600" />,
                title: "Centralized",
                description: "Manage all hardware assets",
                content: "A unified platform for comprehensive hardware lifecycle management."
              },
              {
                icon: <BarChart2 className="h-12 w-12 text-blue-600" />,
                title: "Insightful",
                description: "Gain valuable insights",
                content: "Real-time analytics and customizable reports for informed decision-making."
              },
              {
                icon: <Zap className="h-12 w-12 text-blue-600" />,
                title: "Efficient",
                description: "Streamline operations",
                content: "Automated workflows and quick barcode scanning for maximum efficiency."
              }
            ].map((card, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full p-6 flex flex-col justify-between bg-white/80 backdrop-blur-sm shadow-xl rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl border-t-4 border-blue-600">
                  <div>
                    <motion.div animate={pulse}>{card.icon}</motion.div>
                    <h3 className="mt-4 text-xl font-semibold text-gray-900">{card.title}</h3>
                    <p className="mt-2 text-gray-600">{card.description}</p>
                  </div>
                  <p className="mt-4 text-sm text-gray-500">{card.content}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="mt-24"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <Card className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-2xl p-8 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105">
              <h2 className="text-3xl font-bold mb-4">Ready to revolutionize your inventory management?</h2>
              <p className="text-xl mb-6">Join the Madhya Pradesh Police Department in embracing cutting-edge technology for efficient asset tracking.</p>
              <Button asChild size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50 transition-all duration-300 ease-in-out transform hover:scale-105">
                <Link to="/register">Create an Account <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <p className="mt-6 text-sm">
                Already have an account?{" "}
                <Link to="/login" className="font-medium underline hover:text-blue-100 transition-colors duration-300">
                  Log in
                </Link>
              </p>
            </Card>
          </motion.div>
        </div>
      </main>
      <footer className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">&copy; {new Date().getFullYear()} MP Police. All rights reserved.</p>
            <div className="mt-4 md:mt-0 space-x-4">
              <Link to="/privacy" className="text-sm hover:underline transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm hover:underline transition-colors duration-300">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}