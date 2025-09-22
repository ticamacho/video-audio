import { useState } from "react";
import { CheckIcon, CopyIcon, IconWeight } from "@phosphor-icons/react";
import { styles as componentStyles } from "../styles";

interface CopyButtonProps {
  url?: string | undefined;
  displayText?: string;
  className?: string;
  disabled?: boolean;
}

export default function CopyButton({
  url,
  displayText,
  disabled = false,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const styles = componentStyles.copyButton;

  const handleCopy = async () => {
    if (disabled || !url) return;

    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (disabled) {
    return (
      <div className={styles.disabledContainer}>
        {displayText && <span className={styles.text}>{displayText}</span>}
      </div>
    );
  }

  return (
    <button className={styles.container} onClick={handleCopy}>
      {displayText && <span className={styles.text}>{displayText}</span>}
      <div className={styles.iconContainer}>
        {copied ? (
          <CheckIcon
            size={styles.iconSize}
            weight={styles.iconWeight as IconWeight}
            color={styles.iconColor}
          />
        ) : (
          <CopyIcon
            size={styles.iconSize}
            weight={styles.iconWeight as IconWeight}
            color={styles.iconColor}
          />
        )}
      </div>
    </button>
  );
}
