export const controlBarStyles = {
  // Container for the entire control bar
  controlBar: "flex items-center justify-center gap-12 h-20",

  // control groupings
  controlGroup: "flex items-center gap-2",

  // Base button group styling
  buttonGroup: "border-2 rounded-2xl border-gray-400 flex overflow-hidden",

  // Base button styling - clean without overrides needed
  button:
    "bg-white! text-gray-500 rounded-none! border-none pl-4 pr-3 py-2 transition-colors hover:bg-gray-50! hover:cursor-pointer data-[lk-enabled=true]:bg-gray-100!",

  // Menu button styling
  menuButton:
    "bg-white text-gray-500 border-none pr-4 pl-3 py-2 hover:bg-gray-50 hover:cursor-pointer",

  // Icon button styling (for buttons that only have an icon, no menu)
  iconButton:
    "bg-white! gap-0! text-gray-500 border-none px-4  hover:bg-gray-50! hover:cursor-pointer data-[lk-enabled=true]:bg-gray-100!",

  // Leave button
  leaveGroup: "border-2 rounded-2xl border-plum-600 flex overflow-hidden",
  leaveButton:
    "bg-white! gap-0! border-none! px-4 text-plum-700 hover:bg-plum-50! disabled:opacity-100!",

  iconDefaultColor: "var(--color-gray-500)",
  iconDangerColor: "var(--color-plum-700)",
  iconWeight: "bold",
  iconSize: 20,
};
