import { ReactNode } from "react";

type ButtonVariant = "primary" | "link";

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
};

export const Button = ({
  children,
  variant = "primary",
  onClick,
  disabled = false,
  loading = false,
  type = "button",
}: ButtonProps) => {
  const baseClasses =
    "btn rounded-3xl font-bold px-4 min-w-20 py-3 text-sm border-0";

  const variantClasses = {
    primary: "bg-primary hover:bg-brand-800 text-white",
    link: "btn-ghost px-2",
  };

  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      className={`${baseClasses} ${variantClasses[variant]} disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};
