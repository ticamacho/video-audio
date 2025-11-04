"use client";

import * as Toast from "@radix-ui/react-toast";
import { XIcon, CheckCircleIcon } from "@phosphor-icons/react";
import { cn } from "../utils";
import { styles as ToastStyles } from "../styles";
import { Button } from "./button";

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
        <CheckCircleIcon
          size={20}
          weight="bold"
          color="var(--color-brand-700)"
        />
      </div>
      <div className={cn(toastStyles.content)}>{children}</div>
      <Toast.Close
        asChild
        className={cn(toastStyles.close, toastStyles.iconContainer)}
      >
        <Button size="sm" variant="link">
          <XIcon size={20} weight="bold" color="var(--color-neutral-primary)" />
        </Button>
      </Toast.Close>
    </Toast.Root>
  );
};

type ToastTitleProps = {
  children: React.ReactNode;
};

const ToastTitle = ({ children }: ToastTitleProps) => {
  const toastStyles = ToastStyles.toast;
  return (
    <Toast.Title className={cn(toastStyles.title)}>{children}</Toast.Title>
  );
};

type ToastDescriptionProps = {
  children: React.ReactNode;
};

const ToastDescription = ({ children }: ToastDescriptionProps) => {
  const toastStyles = ToastStyles.toast;
  return (
    <Toast.Description className={cn(toastStyles.description)}>
      {children}
    </Toast.Description>
  );
};

export {
  ToastProvider as Provider,
  ToastRoot as Root,
  ToastTitle as Title,
  ToastDescription as Description,
};
