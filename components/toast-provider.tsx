"use client";

import { createContext, useContext, useState } from "react";
import * as RadixToast from "@radix-ui/react-toast";
import {
  XIcon,
  CheckCircleIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../utils";
import { styles as ToastStyles } from "../styles";
import { Button } from "./button";

type ToastMessage = {
  title: React.ReactNode;
  description?: React.ReactNode;
  error?: boolean;
};

type ToastContextValue = {
  showToast: (message: ToastMessage) => void;
};

const TOAST_DURATION_MS = 5000;

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

  const showToast = (newMessage: ToastMessage) => {
    setMessage(newMessage);
    setOpen(true);
  };

  const toastStyles = ToastStyles.toast;

  return (
    <ToastContext.Provider value={{ showToast }}>
      <RadixToast.Provider>
        {children}
        <AnimatePresence>
          {open && (
            <RadixToast.Root
              asChild
              open={open}
              onOpenChange={setOpen}
              duration={TOAST_DURATION_MS}
              forceMount
            >
              <motion.div
                className={cn(toastStyles.root)}
                initial={{ opacity: 0.5, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.25 }}
              >
                <div className={cn(toastStyles.iconContainer)}>
                  {!message?.error ? (
                    <CheckCircleIcon
                      size={20}
                      weight="bold"
                      color="var(--color-brand-700)"
                    />
                  ) : (
                    <WarningCircleIcon
                      size={20}
                      weight="bold"
                      color="var(--color-red-500)"
                    />
                  )}
                </div>
                <div className={cn(toastStyles.content)}>
                  {message && (
                    <>
                      <RadixToast.Title className={cn(toastStyles.title)}>
                        {message.title}
                      </RadixToast.Title>
                      {message.description && (
                        <RadixToast.Description
                          className={cn(toastStyles.description)}
                        >
                          {message.description}
                        </RadixToast.Description>
                      )}
                    </>
                  )}
                </div>
                <RadixToast.Close
                  asChild
                  className={cn(toastStyles.close, toastStyles.iconContainer)}
                >
                  <Button size="sm" variant="link">
                    <XIcon
                      size={20}
                      weight="bold"
                      color="var(--color-neutral-primary)"
                    />
                  </Button>
                </RadixToast.Close>
              </motion.div>
            </RadixToast.Root>
          )}
        </AnimatePresence>
        <RadixToast.Viewport className={cn(toastStyles.viewport)} />
      </RadixToast.Provider>
    </ToastContext.Provider>
  );
};
