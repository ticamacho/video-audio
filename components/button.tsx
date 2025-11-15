"use client";

import { IconProps } from "@phosphor-icons/react";
import React, {
  useMemo,
  cloneElement,
  ReactElement,
  isValidElement,
} from "react";
import { styles as ButtonStyles } from "../styles";
import { cn } from "../utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "border" | "link";
  tone?: "neutral" | "brand" | "warning" | "danger";
  size?: "sm" | "base";
  loading?: boolean;
  className?: string | undefined;
  ariaLabel?: string;
}

const Button = ({
  variant = "primary",
  size = "base",
  tone = "brand",
  loading = false,
  type = "button",
  className,
  disabled = false,
  children,
  ariaLabel,
  onClick,
  ...props
}: ButtonProps) => {
  const styles = ButtonStyles.button;

  // Check if a child is a Phosphor icon
  const isPhosphorIcon = (
    child: React.ReactNode,
  ): child is ReactElement<IconProps> => {
    return isValidElement(child);
  };

  // Process children to handle icon components
  const processedChildren = React.Children.map(children, (child) => {
    // Simply return child if not icon
    if (!isPhosphorIcon(child)) return child;

    const iconSize = size === "sm" ? styles.iconSizeSm : styles.iconSizeBase;
    let iconColour: string;

    if (tone === "brand" && variant === "primary") {
      iconColour = styles.iconBrandPrimary;
    } else if (tone === "brand" && variant !== "primary") {
      iconColour = styles.iconBrandNeutral;
    } else if (tone === "neutral" && variant === "primary") {
      iconColour = styles.iconNeutralPrimary;
    } else if (tone === "warning" && variant === "primary") {
      iconColour = styles.iconWarningPrimary;
    } else if (tone === "warning" && variant !== "primary") {
      iconColour = styles.iconWarningNeutral;
    } else if (tone === "danger" && variant === "primary") {
      iconColour = styles.iconDangerPrimary;
    } else if (tone === "danger" && variant !== "primary") {
      iconColour = styles.iconDangerNeutral;
    } else {
      iconColour = styles.iconDefault;
    }

    return cloneElement(child, {
      size: child.props.size || iconSize,
      color: child.props.color || iconColour,
      weight: child.props.weight || styles.iconWeight,
    } as IconProps);
  });

  // Determine whether the button only has an icon
  const hasOnlyIcon =
    React.Children.count(children) === 1 &&
    React.Children.toArray(children).every((child) => isPhosphorIcon(child));

  // Determine classes based on props
  let sizeClasses: string;
  let variantClasses: string;

  if (hasOnlyIcon) {
    sizeClasses = size === "sm" ? styles.iconOnlySm : styles.iconOnlyBase;
  } else {
    sizeClasses = size === "sm" ? styles.sizeSm : styles.sizeBase;
  }

  if (tone === "brand" && variant === "primary") {
    variantClasses = styles.brandPrimary;
  } else if (tone === "brand" && variant === "border") {
    variantClasses = styles.brandBorder;
  } else if (tone === "brand" && variant === "link") {
    variantClasses = styles.brandLink;
  } else if (tone === "neutral" && variant === "primary") {
    variantClasses = styles.neutralPrimary;
  } else if (tone === "neutral" && variant === "border") {
    variantClasses = styles.neutralBorder;
  } else if (tone === "neutral" && variant === "link") {
    variantClasses = styles.neutralLink;
  } else if (tone === "warning" && variant === "primary") {
    variantClasses = styles.warningPrimary;
  } else if (tone === "warning" && variant === "border") {
    variantClasses = styles.warningBorder;
  } else if (tone === "warning" && variant === "link") {
    variantClasses = styles.warningLink;
  } else if (tone === "danger" && variant === "primary") {
    variantClasses = styles.dangerPrimary;
  } else if (tone === "danger" && variant === "border") {
    variantClasses = styles.dangerBorder;
  } else if (tone === "danger" && variant === "link") {
    variantClasses = styles.dangerLink;
  } else {
    variantClasses = styles.neutralPrimary;
  }

  // Compute disabled classes
  const disabledClasses = useMemo(() => {
    return disabled || loading ? styles.disabled : "";
  }, [disabled, loading, styles.disabled]);

  // Combine all classes
  const buttonClasses = cn(
    styles.baseStyles,
    !disabled && !loading && styles.tappableArea,
    sizeClasses,
    variantClasses,
    disabledClasses,
    className,
  );

  return (
    <button
      className={buttonClasses}
      disabled={loading || disabled}
      type={type}
      aria-disabled={disabled || loading ? "true" : undefined}
      aria-label={ariaLabel}
      onClick={onClick}
      {...props}
    >
      {processedChildren}
      {loading && <span className={cn(styles.loading)} />}
    </button>
  );
};
Button.displayName = "Button";

export { Button };

// import { ReactNode } from "react";

// type ButtonVariant = "primary" | "soft" | "link";
// type ButtonTone = "neutral" | "brand" | "warning" | "danger";

// interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   children: ReactNode;
//   variant?: ButtonVariant;
//   tone?: ButtonTone;
//   size?: "sm" | "base";
//   loading?: boolean;
//   className?: string | undefined;
//   type?: "button" | "submit" | "reset";
//   ariaLabel?: string;
// }

// const Button = ({
//   children,
//   variant = "primary",
//   loading = false,
//   type = "button",
//   ...props
// }: ButtonProps) => {
//   const baseClasses =
//     "btn rounded-3xl font-bold px-4 min-w-20 text-sm h-10 inline-flex items-center justify-center cursor-pointer relative transition-all duration-200 active:scale-[98%]";

//   const variantClasses = {
//     primary: "bg-brand-700 hover:bg-brand-800 text-white",
//     soft: "bg-brand-50 hover:bg-brand-100 text-brand-700",
//     link: "px-2 hover:bg-gray-50",
//   };

//   return (
//     <button
//       type={type}
//       disabled={loading}
//       className={`${baseClasses} ${variantClasses[variant]} disabled:cursor-not-allowed`}
//       {...props}
//     >
//       {loading && (
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
//         </div>
//       )}
//       <span className={loading ? "invisible" : ""}>{children}</span>
//     </button>
//   );
// };

// export { Button };
