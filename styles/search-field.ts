export const searchFieldStyles = {
  container: "flex flex-col gap-2",
  label: "font-semibold",
  inputWrapper:
    "flex gap-2 items-center pl-2 pr-3 h-8 border rounded-lg border-neutral-hint bg-neutral-fade",
  input:
    "w-full text-base hover:bg-gray-hint focus:outline-none focus:ring-0 focus:none placeholder:text-neutral-secondary disabled:opacity-50 disabled:cursor-not-allowed",
  iconContainer: "inline-flex items-center justify-center w-8",
} as const;
