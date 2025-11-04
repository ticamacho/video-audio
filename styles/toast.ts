export const toastStyles = {
  viewport: "fixed bottom-0 right-0 flex flex-col p-6 gap-2 w-96 max-w-full z-50",
  root: "bg-white rounded-2xl shadow-lg p-4 flex items-start gap-3 data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
  title: "text-base font-semibold",
  description: "text-sm text-neutral-secondary",
  action: "ml-auto",
  close: "rounded-md p-1 hover:bg-neutral-hint transition-colors",
  iconContainer: "flex h-6 w-6 items-center justify-center flex-shrink-0",
  content: "flex-1",
};
