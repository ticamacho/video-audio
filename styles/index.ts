// Export all component styles
import { controlBarStyles } from "./control-bar";
import { videoStyles } from "./video";
import { copyButtonStyles } from "./copy-button";
import { loadingSpinnerStyles } from "./loading-spinner";

export const styles = {
  controlBar: controlBarStyles,
  video: videoStyles,
  copyButton: copyButtonStyles,
  loadingSpinner: loadingSpinnerStyles,
} as const;

// Utility function to combine styles
export const combineStyles = (...styles: string[]) => {
  return styles.filter(Boolean).join(" ");
};
