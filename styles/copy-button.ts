export const copyButtonStyles = {
  container:
    "bg-gray-50 border border-gray-100 pl-2 pr-1 h-8 flex items-center justify-center cursor-pointer rounded-lg gap-2 group max-w-[172px]",
  disabledContainer:
    "bg-gray-50 border border-gray-100 px-2 h-8 flex items-center justify-center cursor-not-allowed rounded-lg max-w-[172px]",
  text: "text-sm text-gray-700 truncate min-w-0",
  iconContainer:
    "flex h-6 w-6 items-center justify-center rounded-DEFAULT group-hover:bg-gray-200 transition-colors flex-shrink-0",
  iconSize: 16,
  iconWeight: "bold",
  iconColor: "var(--color-gray-600)",
} as const;
