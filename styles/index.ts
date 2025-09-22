// Export all component styles
import { controlBarStyles } from "./control-bar";
import { videoStyles } from "./video";
import { copyButtonStyles } from "./copy-button";

export const styles = {
  controlBar: controlBarStyles,
  video: videoStyles,
  copyButton: copyButtonStyles,
} as const;

// Utility function to combine styles
export const combineStyles = (...styles: string[]) => {
  return styles.filter(Boolean).join(" ");
};
