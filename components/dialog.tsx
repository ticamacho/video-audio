"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { XIcon } from "@phosphor-icons/react";
import { cn } from "../utils";
import { styles as DialogStyles } from "../styles";
import { Button } from "./button";

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
  title: string;
  children: React.ReactNode;
  className?: string;
};

const DialogContent = ({ title, children, className }: DialogContentProps) => {
  const dialogStyles = DialogStyles.dialog;

  return (
    <Dialog.Portal>
      <Dialog.Overlay className={cn(dialogStyles.overlay)} />
      <Dialog.Content className={cn(dialogStyles.content, className)}>
        <div className={cn(dialogStyles.header)}>
          <Dialog.Title className={cn(dialogStyles.title)}>
            {title}
          </Dialog.Title>
          <Dialog.Close asChild className={cn(dialogStyles.close)}>
            <Button variant="link" tone="neutral">
              <XIcon weight="bold" color="var(--color-neutral-primary)" />
            </Button>
          </Dialog.Close>
        </div>
        <div className={cn(dialogStyles.body)}>{children}</div>
      </Dialog.Content>
    </Dialog.Portal>
  );
};

export {
  DialogRoot as Root,
  DialogTrigger as Trigger,
  DialogContent as Content,
};
