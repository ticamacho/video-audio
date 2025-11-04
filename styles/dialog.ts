export const dialogStyles = {
  overlay:
    "fixed inset-0 bg-black/30 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
  content:
    "fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] bg-white rounded-2xl shadow-lg",
  header: "flex items-center justify-between px-8 h-20",
  title: "text-lg font-semibold",
  close: "hover:bg-neutral-hint -mr-3",
  body: "px-8 pt-0 pb-8",
};
