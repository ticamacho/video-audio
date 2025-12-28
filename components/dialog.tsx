"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { XIcon } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "framer-motion";
import { createContext, useContext } from "react";
import { cn } from "../utils";
import { styles as DialogStyles } from "../styles";
import { Button } from "./button";

type DialogContextType = {
  open: boolean;
};

const DialogContext = createContext<DialogContextType>({ open: false });

type DialogRootProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
};

const DialogRoot = ({
  children,
  open = false,
  onOpenChange,
}: DialogRootProps) => {
  return (
    <DialogContext.Provider value={{ open }}>
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        {children}
      </Dialog.Root>
    </DialogContext.Provider>
  );
};

const DialogTrigger = Dialog.Trigger;

type DialogContentProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
};

const DialogContent = ({ title, children, className }: DialogContentProps) => {
  const dialogStyles = DialogStyles.dialog;
  const { open } = useContext(DialogContext);

  return (
    <Dialog.Portal forceMount>
      <AnimatePresence mode="wait">
        {open && (
          <>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className={cn(dialogStyles.overlay)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount>
              <motion.div
                className={cn(dialogStyles.content, className)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
              >
                <div className={cn(dialogStyles.header)}>
                  <Dialog.Title className={cn(dialogStyles.title)}>
                    {title}
                  </Dialog.Title>
                  <Dialog.Close asChild className={cn(dialogStyles.close)}>
                    <Button variant="link" tone="neutral">
                      <XIcon
                        weight="bold"
                        color="var(--color-neutral-primary)"
                      />
                    </Button>
                  </Dialog.Close>
                </div>
                <div className={cn(dialogStyles.body)}>{children}</div>
              </motion.div>
            </Dialog.Content>
          </>
        )}
      </AnimatePresence>
    </Dialog.Portal>
  );
};

export {
  DialogRoot as Root,
  DialogTrigger as Trigger,
  DialogContent as Content,
};
