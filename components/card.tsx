import { createContext, useContext } from "react";
import { cn } from "../utils";
import { styles as CardStyles } from "../styles";

const styles = CardStyles.card;

type CardSize = "base" | "lg";

interface CardContextValue {
  size: CardSize;
}

const CardContext = createContext<CardContextValue>({ size: "base" });

interface RootProps {
  className?: string;
  size?: CardSize;
  children?: React.ReactNode;
}

interface CardChildProps {
  className?: string;
  children?: React.ReactNode;
}

function Root({ children, size = "base", className }: RootProps) {
  return (
    <CardContext.Provider value={{ size }}>
      <div className={cn(styles.root, styles.rootShadow, className)}>
        {children}
      </div>
    </CardContext.Provider>
  );
}

function Content({ children, className }: CardChildProps) {
  const { size } = useContext(CardContext);

  return (
    <div
      className={cn(
        styles.contentBase,
        size === "lg" && styles.contentLarge,
        className,
      )}
    >
      {children}
    </div>
  );
}

function Actions({ children, className }: CardChildProps) {
  const { size } = useContext(CardContext);

  return (
    <div
      className={cn(
        styles.actionsBase,
        size === "lg" && styles.actionsLarge,
        className,
      )}
    >
      {children}
    </div>
  );
}

export { Root, Content, Actions };
