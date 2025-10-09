import { cn } from "../utils";
import { styles as CardStyles } from "../styles";

const styles = CardStyles.card;

interface CardProps {
  className?: string;
  children?: React.ReactNode;
}
function Root({ children, className }: CardProps) {
  return (
    <div className={cn(styles.root, styles.rootShadow, className)}>
      {children}
    </div>
  );
}

function Content({ children, className }: CardProps) {
  return <div className={cn(styles.content, className)}>{children}</div>;
}

function Actions({ children, className }: CardProps) {
  return <div className={cn(styles.actions, className)}>{children}</div>;
}

export { Root, Content, Actions };
