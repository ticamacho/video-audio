import { cn } from "../utils/merge";

type IndicatorProps = {
  isActive?: boolean;
  elapsedTime?: string;
};

const Indicator = ({ isActive, elapsedTime }: IndicatorProps) => {
  return (
    <div className="flex items-center gap-2">
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
      <div className="flex gap-1">
        <span className="text-sm">
          {isActive ? "Connected" : "Not Connected"}
        </span>
        {isActive && (
          <>
            <span>·</span>
            <span>{elapsedTime}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default Indicator;
