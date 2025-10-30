export const selectStyles = {
  trigger:
    "w-full border-neutral-hint text-base h-10 border rounded-xl px-4 flex items-center justify-between bg-white hover:bg-gray-25 focus:outline-none focus:ring-2 focus:ring-blue-500 data-[placeholder]:text-neutral-secondary disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed",
  content:
    "overflow-hidden bg-white rounded-xl border border-gray-100 shadow-lg z-50",
  viewport: "p-1",
  item: "text-base text-neutral-primary relative flex items-center h-10 px-3 rounded-lg select-none outline-none cursor-pointer hover:bg-gray-50 focus:bg-gray-100 data-[disabled]:opacity-50 data-[disabled]:pointer-events-none data-[highlighted]:bg-gray-100",
  itemIndicator: "absolute left-0 w-6 inline-flex items-center justify-center",
  label: "px-3 py-2 text-sm font-semibold text-gray-500",
  separator: "h-px bg-gray-100 my-1",
} as const;
