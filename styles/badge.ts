export const badgeStyles = {
  base: "inline-flex h-full items-center rounded-lg px-2 text-xs font-bold capitalize",
  container: "flex items-center justify-center h-6 py-0.5",
  // Weak weight styles
  weakNeutral: "text-grey-800 border-1 bg-grey-50 border-grey-200",
  weakInfo: "text-blue-900 border-1 bg-blue-100 border-blue-400",
  weakPositive: "text-green-900 border-1 bg-green-100 border-green-400",
  weakDanger: "text-red-800 border-1 bg-red-100 border-red-300",
  weakWarning: "text-yellow-800 border-1 bg-yellow-100 border-yellow-300",
  // Strong weight styles
  strongNeutral: "bg-grey-800 text-neutral-inverse",
  strongInfo: "bg-blue-900 text-neutral-inverse",
  strongPositive: "bg-green-900 text-neutral-inverse",
  strongDanger: "bg-red-900 text-neutral-inverse",
  strongWarning: "bg-yellow-900 text-neutral-inverse",

  // Icon styles
  iconSize: "14",
  iconWeight: "duotone",
  // Icon colors for weak badges
  weakIconNeutral: "var(--color-grey-800)",
  weakIconInfo: "var(--color-blue-900)",
  weakIconPositive: "var(--color-green-900)",
  weakIconDanger: "var(--color-red-800)",
  weakIconWarning: "var(--color-yellow-800)",

  // Icon color for strong badges
  strongIcon: "var(--color-neutral-inverse)",
};
