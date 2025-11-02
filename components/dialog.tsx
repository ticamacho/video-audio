"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { cn } from "../utils";

type DialogRootProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
};

const DialogRoot = ({ children, ...props }: DialogRootProps) => {
  return <Dialog.Root {...props}>{children}</Dialog.Root>;
};

const DialogTrigger = Dialog.Trigger;

type DialogContentProps = {
  children: React.ReactNode;
  className?: string;
};

const DialogContent = ({ children, className }: DialogContentProps) => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <Dialog.Content
        className={cn(
          "fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] bg-white rounded-lg shadow-lg p-6",
          className
        )}
      >
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
};

const DialogTitle = Dialog.Title;
const DialogDescription = Dialog.Description;
const DialogClose = Dialog.Close;

export {
  DialogRoot as Root,
  DialogTrigger as Trigger,
  DialogContent as Content,
  DialogTitle as Title,
  DialogDescription as Description,
  DialogClose as Close,
};
