export const loadingSpinnerStyles = {
  // Container for the entire spinner component
  container: "flex flex-col items-center justify-center gap-3",

  // Spinner container for positioning
  spinnerContainer: "relative",

  // Base track styling (background circle)
  spinnerTrack: "h-10 w-10 rounded-full border-4 border-gray-50",

  // Base indicator styling (animated circle)
  spinnerIndicator:
    "absolute top-0 left-0 h-10 w-10 animate-spin rounded-full border-4 border-transparent border-t-brand-700",

  // Text styling
  text: "text-gray-500",
} as const;
