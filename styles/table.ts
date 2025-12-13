export const tableStyles = {
  // Root table styles
  tableContainer: "overflow-x-auto",
  table: "overflow-hidden",

  // TableHeader styles
  header: "",

  // TableBody styles
  body: "",

  // TableRow styles
  row: "group",
  rowHoverable: "cursor-pointer",
  rowSelected: "selected",

  // TableHeading styles
  heading:
    "text-neutral-primary flex items-center border-neutral-hint h-11 border-b text-left text-base font-medium px-2",
  headingCellSpacing: "not-last:not-first:px-3 first:pr-3 last:pl-3",

  // TableCell styles
  cell: "group-hover:bg-neutral-fade checked:not-group-hover:bg-neutral-fade group-[.selected]:bg-neutral-fade transition-colors duration-200 ease-in-out text-neutral-secondary h-16 flex items-center text-base not-last:not-first:px-3 first:pr-3 last:pl-3 border-b border-neutral-hint px-2",

  // TableCaption styles
  caption: "text-neutral-secondary mt-4 text-sm",

  // No children styles
  noChildren: " text-neutral-secondary",
};
