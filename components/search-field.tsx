"use client";

import { ReactNode, useState } from "react";
import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";
import { cn } from "../utils";
import { searchFieldStyles } from "../styles/search-field";
import { Button } from "./button";

export interface SearchFieldProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "value" | "onChange" | "onKeyDown" | "defaultValue"
  > {
  children?: ReactNode;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  defaultValue?: string | null;
  onSearch?: (value: string) => void;
  onClear?: () => void;
}

export const SearchField = ({
  children,
  placeholder = "Search",
  disabled = false,
  className,
  defaultValue,
  onSearch,
  onClear,
  ...props
}: SearchFieldProps) => {
  const [value, setValue] = useState(defaultValue ?? "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(value);
    }
  };

  const handleClear = () => {
    setValue("");
    if (onSearch) {
      onSearch("");
    }
    if (onClear) {
      onClear();
    }
  };

  return (
    <div className={searchFieldStyles.container}>
      {children && <span className={searchFieldStyles.label}>{children}</span>}
      <div className={searchFieldStyles.inputWrapper}>
        <div className={searchFieldStyles.iconContainer}>
          {value.length > 0 ? (
            <Button
              variant="link"
              tone="neutral"
              size="sm"
              onClick={handleClear}
            >
              <XIcon weight="bold" color="var(--color-neutral-primary)" />
            </Button>
          ) : (
            <MagnifyingGlassIcon
              size={16}
              weight="bold"
              color="var(--color-neutral-primary)"
            />
          )}
        </div>
        <input
          id="search"
          type="text"
          disabled={disabled}
          className={cn(searchFieldStyles.input, className)}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          {...props}
        />
      </div>
    </div>
  );
};
