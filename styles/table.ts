export const tableStyles = {
  // Root table styles
  tableContainer: "overflow-x-auto",
  table: "overflow-hidden",

  // TableHeader styles
  header: "",

  // TableBody styles
  body: "",

  // TableRow styles
  row: "",
  rowHoverable:
    "hover:bg-neutral-hint checked:not-hover:bg-neutral-hint cursor-pointer transition-colors duration-200 ease-in-out",
  rowSelected: "bg-neutral-hint",

  // TableHeading styles
  heading:
    "text-neutral-primary flex items-center border-neutral-hint h-11 border-b text-left text-base font-semibold",
  headingCellSpacing:
    "not-last:not-first:px-3 first:pr-3 first:pl-3 last:pr-3 last:pl-3",

  // TableCell styles
  cell: "text-neutral-secondary h-14 flex items-center text-base not-last:not-first:px-3 first:pr-3 first:pl-3 last:pr-3 last:pl-3 border-b border-neutral-hint",

  // TableCaption styles
  caption: "text-neutral-secondary mt-4 text-sm",

  // No children styles
  noChildren: " text-neutral-secondary",
};
