import { ReactNode } from "react";
import { cn } from "../utils";

interface FieldsetProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children: ReactNode;
  hintMessage?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  value?: string | number | readonly string[] | undefined;
}

export const Fieldset = ({
  children,
  placeholder,
  required,
  className,
  disabled = false,
  onChange,
  value,
}: FieldsetProps) => {
  const showRequiredMessage = required;

  return (
    <div className={cn("flex flex-col gap-2")}>
      <span className="font-medium">{children}</span>
      <div className="flex flex-col gap-0">
        <input
          type="text"
          required={required}
          disabled={disabled}
          className={cn(
            "w-full border-gray-100 text-base text-neutral-primary h-12 border rounded-xl px-3 disabled:opacity-50",
            className,
            showRequiredMessage && "validator",
          )}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};
