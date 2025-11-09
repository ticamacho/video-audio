"use client";

import { createContext, useContext, useState } from "react";
import * as RadixToast from "@radix-ui/react-toast";
import {
  XIcon,
  CheckCircleIcon,
  WarningCircleIcon,
} from "@phosphor-icons/react";
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
        <RadixToast.Root
          className={cn(toastStyles.root)}
          open={open}
          onOpenChange={setOpen}
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
        </RadixToast.Root>
        <RadixToast.Viewport className={cn(toastStyles.viewport)} />
      </RadixToast.Provider>
    </ToastContext.Provider>
  );
};
