"use client";

import { cn } from "../utils";
import { styles as EmptyStateStyles } from "../styles";
import { Button } from "./button";

const styles = EmptyStateStyles.emptyState;

interface EmptyStateProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  actionLabel: string;
  onClick: () => void;
  className?: string;
}

export function EmptyState({
  imageSrc,
  imageAlt,
  title,
  description,
  actionLabel,
  onClick,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn(styles.emptyStyleBase, className)}>
      <div className={styles.imageContainer}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageSrc} alt={imageAlt} className={styles.image} />
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.copyContainer}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.buttonContainer}>
          <Button onClick={onClick}>{actionLabel}</Button>
        </div>
      </div>
    </div>
  );
}
