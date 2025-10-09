// Export all component styles
import { controlBarStyles } from "./control-bar";
import { contextualMenuStyles } from "./contextual-menu";
import { videoStyles } from "./video";
import { copyButtonStyles } from "./copy-button";
import { loadingSpinnerStyles } from "./loading-spinner";
import { tableStyles } from "./table";
import { cardStyles } from "./card";
import { badgeStyles } from "./badge";

export const styles = {
  controlBar: controlBarStyles,
  video: videoStyles,
  contextualMenu: contextualMenuStyles,
  copyButton: copyButtonStyles,
  loadingSpinner: loadingSpinnerStyles,
  table: tableStyles,
  card: cardStyles,
  badge: badgeStyles,
} as const;

// Utility function to combine styles
export const combineStyles = (...styles: string[]) => {
  return styles.filter(Boolean).join(" ");
};
