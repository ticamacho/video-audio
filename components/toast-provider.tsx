"use client";

import { createContext, useContext, useState, useCallback } from "react";
import * as Toast from "./toast";

type ToastMessage = {
  title: React.ReactNode;
  description?: React.ReactNode;
};

type ToastContextValue = {
  showToast: (message: ToastMessage) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};

type ToastProviderProps = {
  children: React.ReactNode;
};

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<ToastMessage | null>(null);

  const showToast = useCallback((newMessage: ToastMessage) => {
    setMessage(newMessage);
    setOpen(true);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast.Provider>
        {children}
        <Toast.Root open={open} onOpenChange={setOpen}>
          {message && (
            <>
              <Toast.Title>{message.title}</Toast.Title>
              {message.description && (
                <Toast.Description>{message.description}</Toast.Description>
              )}
            </>
          )}
        </Toast.Root>
      </Toast.Provider>
    </ToastContext.Provider>
  );
};
