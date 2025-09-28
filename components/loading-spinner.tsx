import { cn } from "../utils";
import { loadingSpinnerStyles } from "../styles/loading-spinner";

type LoadingSpinnerProps = {
  className?: string;
  text?: string;
};

export const LoadingSpinner = ({ className, text }: LoadingSpinnerProps) => {
  return (
    <div className={cn(loadingSpinnerStyles.container, className)}>
      <div className={loadingSpinnerStyles.spinnerContainer}>
        <div className={loadingSpinnerStyles.spinnerTrack} />
        <div className={loadingSpinnerStyles.spinnerIndicator} />
      </div>
      {text && <span className={loadingSpinnerStyles.text}>{text}</span>}
    </div>
  );
};

export default LoadingSpinner;
