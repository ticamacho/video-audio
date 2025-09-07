export const controlBarStyles = {
  // Container for the entire control bar
  controlBar: "flex items-center justify-center gap-6 h-20",

  // control groupings
  controlGroup: "flex items-center gap-2",

  // Base button group styling - reusable
  buttonGroup: "border-2 rounded-2xl border-gray-400 flex overflow-hidden",

  // Base button styling - clean without overrides needed
  button:
    "bg-gray-50! text-gray-500 rounded-none! border-none px-4 py-2 transition-colors hover:bg-gray-100 hover:cursor-pointer",

  // Menu button styling
  menuButton:
    "bg-white text-gray-500 border-none px-3 py-2 hover:bg-gray-50 after:text-gray-500 hover:cursor-pointer",

  // Screen share button (standalone)
  screenShareButton:
    "bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors",

  // Leave button (standalone)
  leaveButton:
    "bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2",

  // Camera button group
  cameraGroup: "flex items-center gap-0",
  cameraButton:
    "bg-gray-800 text-white px-4 py-2 rounded-l-lg hover:bg-gray-700 transition-colors",
  cameraMenu:
    "bg-gray-700 text-white px-3 py-2 rounded-r-lg hover:bg-gray-600 transition-colors",

  iconColor: "var(--color-gray-500)",
  iconWeight: "bold",
  iconSize: 20,

  // Device menu dropdown styles (applied via CSS file)
  // Note: These need to be applied globally since the menu is rendered in a portal
  // Classes used: .device-menu, .device-menu-heading, .media-device-select li > .button
  // See: livekit-overrides.css
};
