import { cn } from "../utils";
import { loadingSpinnerStyles } from "../styles/loading-spinner";

type LoadingSpinnerProps = {
  className?: string;
  text?: string;
  size?: "sm" | "base";
};

export const LoadingSpinner = ({
  className,
  text,
  size = "base",
}: LoadingSpinnerProps) => {
  return (
    <div className={cn(loadingSpinnerStyles.container, className)}>
      <div className={loadingSpinnerStyles.spinnerContainer}>
        <div
          className={cn(
            loadingSpinnerStyles.spinnerTrack,
            size === "sm" && loadingSpinnerStyles.spinnerTrackSm,
          )}
        />
        <div
          className={cn(
            loadingSpinnerStyles.spinnerIndicator,
            size === "sm" && loadingSpinnerStyles.spinnerIndicatorSm,
          )}
        />
      </div>
      {text && <span className={loadingSpinnerStyles.text}>{text}</span>}
    </div>
  );
};

export default LoadingSpinner;
