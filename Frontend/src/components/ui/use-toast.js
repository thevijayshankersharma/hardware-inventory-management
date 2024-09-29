import React, { createContext, useContext, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Create a Toast Context
const ToastContext = createContext();

// Toast Provider
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    setToasts((prev) => [...prev, { id: uuidv4(), ...toast }]);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
};

// Toast Component
const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed bottom-0 right-0 p-4 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`bg-${toast.variant || 'gray'}-500 text-white p-3 rounded-lg shadow-md`}
          onClick={() => removeToast(toast.id)}
        >
          <h4 className="font-bold">{toast.title}</h4>
          <p>{toast.description}</p>
        </div>
      ))}
    </div>
  );
};

// Custom hook for using toasts
export const useToast = () => {
  const { addToast } = useContext(ToastContext);
  
  const toast = ({ title, description, variant }) => {
    addToast({ title, description, variant });
  };

  return { toast };
};
