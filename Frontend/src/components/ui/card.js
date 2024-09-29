import React from 'react';
import { Button } from "./button"; // Ensure button.js is in the correct path

export function Card({ children, className }) {
  return (
    <div className={`bg-white shadow-lg rounded-lg overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children }) {
  return (
    <div className="p-4 border-b">
      {children}
    </div>
  );
}

export function CardTitle({ children, className }) {
  return (
    <h2 className={`text-xl font-semibold text-gray-800 ${className}`}>
      {children}
    </h2>
  );
}

export function CardDescription({ children, className }) {
  return (
    <p className={`text-gray-600 mt-2 ${className}`}>
      {children}
    </p>
  );
}

export function CardContent({ children, className }) {
  return (
    <div className={`p-4 ${className}`}>
      {children}
    </div>
  );
}

export function CardFooter({ children, className }) {
  return (
    <div className={`p-4 border-t ${className}`}>
      {children}
    </div>
  );
}

// Main Card Component
export function MainCard({ title, description, content, footerContent, icon, actionLabel, onAction, className }) {
  return (
    <Card className={`w-full max-w-sm mx-auto hover:shadow-xl transition-shadow duration-300 ${className}`}>
      <CardHeader>
        {icon && (
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              {icon}
            </div>
          </div>
        )}
        <CardTitle className="text-center text-gray-800">{title}</CardTitle>
        {description && (
          <CardDescription className="text-center text-gray-600 mt-2">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-gray-700">{content}</div>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center space-y-2">
        {footerContent}
        {actionLabel && (
          <Button 
            onClick={onAction} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {actionLabel}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}