import { ReactNode } from "react";
import { cn } from "../utils";

type FieldsetProps = {
  children: ReactNode;
  hintMessage?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  value?: string | null | undefined;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};

export const Fieldset = ({
  children,
  hintMessage = "* Required",
  onChange,
  value,
  placeholder,
  required,
  className,
  disabled = false,
}: FieldsetProps) => {
  const showRequiredMessage = required && !value;

  return (
    <div className={cn("flex flex-col gap-2")}>
      <div className="flex items-baseline justify-between">
        <span className="font-medium">{children}</span>
        {showRequiredMessage && (
          <span className="validator-hint text-sm">{hintMessage}</span>
        )}
      </div>
      <div className="flex flex-col gap-0">
        <input
          type="text"
          required={required}
          disabled={disabled}
          className={cn(
            "w-full border-gray-100 text-base text-neutral-primary h-12 border rounded-xl px-3",
            className,
            showRequiredMessage && "validator",
          )}
          value={value ?? ""}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};
