import { cn } from "../utils";

interface CardProps {
  className?: string;
  children?: React.ReactNode;
}

function Root({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border-2 border-gray-50 bg-white",
        className,
      )}
    >
      {children}
    </div>
  );
}

function Content({ children, className }: CardProps) {
  return <div className={cn("bg-white px-6 pt-6", className)}>{children}</div>;
}

function Actions({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-2 px-6 pt-8 pb-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

export { Root, Content, Actions };
