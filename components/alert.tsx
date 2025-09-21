import { InfoIcon, WarningIcon, XCircleIcon } from "@phosphor-icons/react";
import { cn } from "../utils";

type AlertVariant = "error" | "warning" | "info";

type AlertProps = {
  children?: React.ReactNode;
  variant?: AlertVariant;
};

const alertConfig = {
  error: {
    icon: WarningIcon,
    className: "bg-red-50 text-gray-700",
    iconClassName: "text-red-500",
  },
  warning: {
    icon: WarningIcon,
    className: "bg-yellow-50 border-yellow-200 text-yellow-800",
    iconClassName: "text-yellow-500",
  },
  info: {
    icon: InfoIcon,
    className: "bg-blue-50 border-blue-200 text-blue-800",
    iconClassName: "text-blue-500",
  },
} as const;

export const Alert = ({ children, variant = "error" }: AlertProps) => {
  const config = alertConfig[variant];
  const IconComponent = config.icon;

  return (
    <div
      role="alert"
      className={cn(
        "w-full flex items-start gap-3 p-6 rounded-2xl",
        config.className,
      )}
    >
      <div className="h-6 w-6 flex items-center justify-center">
        <IconComponent
          weight="duotone"
          size={20}
          className={`flex-shrink-0 ${config.iconClassName}`}
        />
      </div>
      <span className="font-semibold">{children}</span>
    </div>
  );
};
