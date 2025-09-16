import { cn } from "../utils/merge";

type IndicatorProps = {
  isActive?: boolean;
  elapsedTime?: string;
};

const Indicator = ({ isActive, elapsedTime }: IndicatorProps) => {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-700">
      <div
        className={cn(
          "flex h-4 w-4 items-center justify-center rounded-full",
          isActive ? "bg-brand-200" : "bg-plum-100",
        )}
      >
        <div
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            isActive ? "bg-brand-500" : "bg-plum-400",
          )}
        />
      </div>
      {isActive ? (
        <div className="flex gap-1">
          <span>Connected</span>
          <span>·</span>
          <span>{elapsedTime}</span>
        </div>
      ) : (
        <span>Not connected</span>
      )}
    </div>
  );
};

export default Indicator;
