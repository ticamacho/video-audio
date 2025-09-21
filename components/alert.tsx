import {
  InfoIcon,
  ShieldWarningIcon,
  WarningIcon,
} from "@phosphor-icons/react";
import { cn } from "../utils";

type AlertVariant = "error" | "warning" | "info";

type AlertProps = {
  children?: React.ReactNode;
  variant?: AlertVariant;
};

const alertConfig = {
  error: {
    icon: WarningIcon,
    className: "bg-red-50",
    iconClassName: "text-red-600",
  },
  warning: {
    icon: ShieldWarningIcon,
    className: "bg-yellow-50",
    iconClassName: "text-yellow-700",
  },
  info: {
    icon: InfoIcon,
    className: "bg-blue-50",
    iconClassName: "text-blue-700",
  },
} as const;

export const Alert = ({ children, variant = "error" }: AlertProps) => {
  const config = alertConfig[variant];
  const IconComponent = config.icon;

  return (
    <div
      role="alert"
      className={cn(
        "flex w-full items-start gap-3 rounded-2xl p-6",
        config.className,
      )}
    >
      <div className="flex h-6 w-6 items-center justify-center">
        <IconComponent
          weight="bold"
          size={20}
          className={`flex-shrink-0 ${config.iconClassName}`}
        />
      </div>
      <p className="text-base">{children}</p>
    </div>
  );
};
