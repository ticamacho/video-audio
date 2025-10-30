import { ReactNode } from "react";
import * as Select from "@radix-ui/react-select";
import { cn } from "../utils";
import { selectStyles } from "../styles/select";
import { CaretDownIcon, CheckIcon } from "@phosphor-icons/react";

type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

type SelectProps = {
  children?: ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  hintMessage?: string;
  className?: string;
};

export const SelectField = ({
  children,
  value,
  defaultValue,
  onValueChange,
  options,
  placeholder = "Select an option",
  required = false,
  disabled = false,
  hintMessage = "* Required",
  className,
}: SelectProps) => {
  const showRequiredMessage = required && !value;

  return (
    <div className="flex flex-col gap-2">
      {children && (
        <div className="flex items-baseline justify-between">
          <span className="font-semibold">{children}</span>
          {showRequiredMessage && (
            <span className="validator-hint text-sm">{hintMessage}</span>
          )}
        </div>
      )}
      <Select.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        disabled={disabled}
        required={required}
      >
        <Select.Trigger
          className={cn(
            selectStyles.trigger,
            className,
            showRequiredMessage && "validator",
          )}
        >
          <Select.Value placeholder={placeholder} />
          <Select.Icon>
            <CaretDownIcon size={16} weight="bold" />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content className={selectStyles.content} position="popper">
            <Select.Viewport className={selectStyles.viewport}>
              {options.map((option) => (
                <Select.Item
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className={selectStyles.item}
                >
                  <Select.ItemText>{option.label}</Select.ItemText>
                  <Select.ItemIndicator className={selectStyles.itemIndicator}>
                    <CheckIcon size={16} weight="bold" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};
