export const contextualMenuStyles = {
  // Trigger styles
  triggerBase: "flex items-center justify-center rounded-xl p-2 relative",

  // Menu styles
  menuBase: "bg-surface-white shadow-menu rounded-xl py-2 z-100",

  // Divider styles
  dividerBase: "bg-neutral-hint h-px my-1.5",
  dividerSm: "my-1",

  // Item styles
  itemBase:
    "w-full font-medium text-base pr-6 h-9 flex items-center cursor-pointer focus:outline-none min-w-36",
  itemSm: "text-sm px-3 font-medium h-8 min-w-28",
  itemHover: "hover:bg-neutral-100",
  itemFocus: "focus:not-hover:bg-neutral-200",
  itemContainer: "flex flex-col w-full items-center",
  itemContainerAdjust: "pl-3",
  itemContainerBaseGap: "2",
  itemContainerSmGap: "1",

  // Tone styles
  toneNeutral: "text-neutral-secondary",
  toneDanger: "text-red-800",

  // Icons properties
  iconTriggerBase: "18",
  iconTriggerSm: "14",
  iconTriggerWeight: "bold",
  iconMenuSize: "14",
  iconMenuWeight: "bold",
  iconContainer: "flex items-center justify-center w-4 h-6",

  // Button dimension overrides
  buttonSizeSm: "w-6 h-5",
};
