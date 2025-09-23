import { ReactNode } from "react";

type ButtonVariant = "primary" | "soft" | "link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button = ({
  children,
  variant = "primary",
  loading = false,
  type = "button",
  ...props
}: ButtonProps) => {
  const baseClasses =
    "btn rounded-3xl font-bold px-4 min-w-20 text-sm h-10 inline-flex items-center justify-center cursor-pointer relative";

  const variantClasses = {
    primary: "bg-brand-700 hover:bg-brand-800 text-white",
    soft: "bg-brand-50 hover:bg-brand-100 text-brand-700",
    link: "btn-ghost px-2",
  };

  return (
    <button
      type={type}
      disabled={loading}
      className={`${baseClasses} ${variantClasses[variant]} disabled:cursor-not-allowed`}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
        </div>
      )}
      <span className={loading ? "invisible" : ""}>{children}</span>
    </button>
  );
};

export default Button;
