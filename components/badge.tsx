"use client";

import * as React from "react";
import { IconProps } from "@phosphor-icons/react";
import { cn } from "../utils";
import { styles as BadgeStyles } from "../styles";

export type BadgeTone = "neutral" | "info" | "positive" | "danger" | "warning";
type BadgeWeight = "weak" | "strong";

const BadgeContext = React.createContext<{
  tone: BadgeTone;
  weight: BadgeWeight;
}>({
  tone: "neutral",
  weight: "weak",
});

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: BadgeTone;
  weight?: BadgeWeight;
  children: React.ReactNode;
}

function Badge({
  tone = "neutral",
  weight = "weak",
  className,
  children,
}: BadgeProps) {
  const badgeStyles = BadgeStyles.badge;
  const toneClass = React.useMemo(() => {
    const weightToneKey = `${weight}${
      tone.charAt(0).toUpperCase() + tone.slice(1)
    }` as keyof typeof badgeStyles;
    return badgeStyles[weightToneKey];
  }, [tone, weight, badgeStyles]);

  return (
    <BadgeContext.Provider value={{ tone, weight }}>
      <div className={cn(badgeStyles.container)}>
        <div className={cn(badgeStyles.base, toneClass, className)}>
          {children}
        </div>
      </div>
    </BadgeContext.Provider>
  );
}

export interface BadgeIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactElement<IconProps>;
}

function BadgeIcon({ children }: BadgeIconProps) {
  const { tone, weight } = React.useContext(BadgeContext);
  const badgeStyles = BadgeStyles.badge;
  const iconSize = parseInt(badgeStyles.iconSize);
  const iconWeight = badgeStyles.iconWeight;

  const iconColour = React.useMemo(() => {
    if (weight === "strong") return badgeStyles.strongIcon;

    const iconColorKey = `weakIcon${
      tone.charAt(0).toUpperCase() + tone.slice(1)
    }` as keyof typeof badgeStyles;
    return badgeStyles[iconColorKey];
  }, [tone, weight, badgeStyles]);

  return React.Children.map(children, (child) =>
    React.cloneElement(child, {
      size: child.props.size || iconSize,
      color: child.props.color || iconColour,
      weight: child.props.weight || iconWeight,
    } as IconProps),
  );
}

export { Badge, BadgeIcon };
