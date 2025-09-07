// Export all component styles
import { controlBarStyles } from "./control-bar";

export const styles = {
  controlBar: controlBarStyles,
  // Add other component styles here as you create them
  // videoLayout: { ... },
  // participantTile: { ... },
} as const;

// Utility function to combine styles
export const combineStyles = (...styles: string[]) => {
  return styles.filter(Boolean).join(" ");
};
