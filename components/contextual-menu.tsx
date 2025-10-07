"use client";

import { DotsThreeIcon, Icon } from "@phosphor-icons/react";
import { IconWeight } from "@phosphor-icons/react";
import { cn } from "../utils";
import { DropdownMenu } from "radix-ui";
import { Button } from "./button";
import { styles as ContextualMenuStyles } from "../styles";

export type ContextualMenuItem =
  | {
      id: string;
      label?: string;
      icon?: Icon;
      disabled?: boolean;
      tone?: "neutral" | "danger";
      type?: "divider" | "item";
    }
  | {
      type: "divider";
      id?: never;
    };

interface ComponentProps {
  menuItems: ContextualMenuItem[];
  size?: "base" | "sm";
  tone?: "neutral" | "danger";
  triggerComponent?: React.ReactNode;
  modal?: boolean;
  onAction?: (action: ContextualMenuItem) => void;
}

export function ContextualMenu({
  menuItems = [],
  size = "base",
  triggerComponent,
  modal = false,
  onAction,
}: ComponentProps) {
  const styles = ContextualMenuStyles.contextualMenu;

  // Combine item styles
  const iconsArePresent = menuItems.some(
    (item) => item.type !== "divider" && item.icon,
  );
  const getItemClassName = cn(
    styles.itemBase,
    styles.itemHover,
    styles.itemFocus,
    size === "sm" && styles.itemSm,
    iconsArePresent && styles.itemContainerAdjust,
  );

  // Function to render menu items
  const renderMenuItems = () => {
    return menuItems.map((item, index) => {
      // Render a divider
      if (item.type === "divider") {
        return (
          <DropdownMenu.Separator
            key={`divider-${index}`}
            className={styles.dividerBase}
          />
        );
      }

      // Normal item
      const toneClass =
        (item.tone || "neutral") === "neutral"
          ? styles.toneNeutral
          : styles.toneDanger;
      return (
        <DropdownMenu.Item
          key={item.id || `item-${index}`}
          className={getItemClassName}
          onClick={() => item.id && onAction && onAction(item)}
          disabled={item.disabled}
        >
          <div
            className={cn(
              styles.itemContainer,
              toneClass,
              size === "base"
                ? styles.itemContainerBaseGap
                : styles.itemContainerSmGap,
            )}
          >
            {size === "base" && (
              <div className={styles.iconContainer}>
                {item.icon && iconsArePresent && (
                  <item.icon
                    size={Number(styles.iconMenuSize)}
                    weight={styles.iconMenuWeight as IconWeight}
                  />
                )}
              </div>
            )}
            {item.label}
          </div>
        </DropdownMenu.Item>
      );
    });
  };

  return (
    <DropdownMenu.Root modal={modal}>
      <DropdownMenu.Trigger asChild>
        {triggerComponent ? (
          triggerComponent
        ) : (
          <Button
            variant="link"
            ariaLabel="Menu"
            className={size === "sm" ? styles.buttonSizeSm : undefined}
          >
            <DotsThreeIcon
              size={Number(
                size === "sm" ? styles.iconTriggerSm : styles.iconTriggerBase,
              )}
              weight={styles.iconTriggerWeight as IconWeight}
            />
          </Button>
        )}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={styles.menuBase}
          sideOffset={0}
          collisionPadding={24}
          align="end"
        >
          {menuItems.length > 0 ? (
            renderMenuItems()
          ) : (
            <DropdownMenu.Item className={getItemClassName}>
              Menu is empty
            </DropdownMenu.Item>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
