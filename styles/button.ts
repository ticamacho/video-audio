export const buttonStyles = {
  // Base styling
  baseStyles:
    "inline-flex font-semibold items-center justify-center relative gap-2 overflow-visible group transition-all duration-[250ms] ease-in-out active:scale-[97%]",
  // Size variants
  sizeBase: "text-sm min-w-20 rounded-3xl h-10 px-3",
  sizeSm: "text-sm rounded-2xl h-8 px-[10px] min-w-16 font-medium",
  // Icon-only button sizes
  iconOnlyBase: "h-10 w-10 rounded-xl px-0",
  iconOnlySm: "h-8 w-10 rounded-xl px-0",
  // Icon sizes
  iconSizeBase: "18",
  iconSizeSm: "14",
  // Icon colors
  iconBrandPrimary: "var(--color-brand-950)",
  iconBrandNeutral: "var(--color-brand-700)",
  iconNeutralPrimary: "var(--color-brand-500)",
  iconWarningPrimary: "var(--color-yellow-950)",
  iconWarningNeutral: "var(--color-yellow-800)",
  iconDangerPrimary: "var(--color-red-950)",
  iconDangerNeutral: "var(--color-red-700)",
  iconDefault: "var(--color-neutral-primary)",
  iconWeight: "duotone",
  // Button variants
  brandPrimary:
    "bg-brand-700 text-white hover:bg-brand-800 active:bg-brand-800",
  brandBorder:
    "text-neutral-secondary border border-brand-700 hover:bg-brand-800/30 active:bg-brand-800/30",
  brandLink:
    "text-neutral-primary hover:bg-brand-700/50 active:bg-brand-700/50",
  neutralPrimary: "bg-neutral-primary text-neutral-inverse",
  neutralBorder:
    "text-neutral-primary border border-gray-100 hover:bg-gray-100 active:bg-gray-100",
  neutralLink:
    "text-neutral-primary hover:bg-neutral-hint active:bg-neutral-hint",
  warningPrimary:
    "bg-yellow-500 text-yellow-950 hover:bg-yellow-600/80 active:bg-yellow-600/80",
  warningBorder:
    "text-neutral-primary border border-yellow-500 hover:bg-yellow-500/20 active:bg-yellow-500/20",
  warningLink: "text-yellow-700 hover:bg-yellow-500/50 active:bg-yellow-500/50",
  dangerPrimary:
    "bg-red-600 text-neutral-inverse hover:bg-red-700/80 active:bg-red-700/80",
  dangerBorder:
    "text-neutral-primary border border-red-600 hover:bg-red-600/15 active:bg-red-600/15",
  dangerLink: "text-red-600 hover:bg-red-600/50 active:bg-red-600/50",
  tappableArea:
    "before:absolute before:content-[''] before:w-full before:cursor-pointer before:h-12 before:min-w-12",
  disabled: "opacity-50 cursor-not-allowed hover:none",
  loading:
    "inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent",
};
