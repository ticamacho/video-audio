"use client";

import * as Toast from "@radix-ui/react-toast";
import { XIcon, CheckCircleIcon } from "@phosphor-icons/react";
import { cn } from "../utils";
import { styles as ToastStyles } from "../styles";

type ToastProviderProps = {
  children: React.ReactNode;
};

const ToastProvider = ({ children }: ToastProviderProps) => {
  return (
    <Toast.Provider>
      {children}
      <Toast.Viewport className={cn(ToastStyles.toast.viewport)} />
    </Toast.Provider>
  );
};

type ToastRootProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
};

const ToastRoot = ({ children, ...props }: ToastRootProps) => {
  const toastStyles = ToastStyles.toast;

  return (
    <Toast.Root className={cn(toastStyles.root)} {...props}>
      <div className={cn(toastStyles.iconContainer)}>
        <CheckCircleIcon size={20} weight="bold" color="var(--color-brand-600)" />
      </div>
      <div className={cn(toastStyles.content)}>{children}</div>
      <Toast.Close className={cn(toastStyles.close)}>
        <XIcon size={16} weight="bold" />
      </Toast.Close>
    </Toast.Root>
  );
};

const ToastTitle = Toast.Title;
const ToastDescription = Toast.Description;

export {
  ToastProvider as Provider,
  ToastRoot as Root,
  ToastTitle as Title,
  ToastDescription as Description,
};
