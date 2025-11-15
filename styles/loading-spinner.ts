export const loadingSpinnerStyles = {
  // Container for the entire spinner component
  container: "flex flex-col items-center justify-center gap-3",

  // Spinner container for positioning
  spinnerContainer: "relative",

  // Base track styling (background circle)
  spinnerTrack: "h-9 w-9 rounded-full border-2 border-gray-50",
  spinnerTrackSm: "h-6 w-6",

  // Base indicator styling (animated circle)
  spinnerIndicator:
    "absolute top-0 left-0 h-9 w-9 animate-spin rounded-full border-2 border-transparent border-t-brand-700",
  spinnerIndicatorSm: "h-6 w-6",

  // Text styling
  text: "text-gray-500",
} as const;
