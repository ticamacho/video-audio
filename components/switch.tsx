"use client";

import * as Switch from "@radix-ui/react-switch";
import { cn } from "../utils";
import { styles as SwitchStyles } from "../styles";

export interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

const SwitchComponent = ({ className, ...props }: SwitchProps) => {
  const switchStyles = SwitchStyles.switch;

  return (
    <Switch.Root className={cn(switchStyles.root, className)} {...props}>
      <Switch.Thumb className={cn(switchStyles.thumb)} />
    </Switch.Root>
  );
};

SwitchComponent.displayName = "Switch";

export { SwitchComponent as Switch };
