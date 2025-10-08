export const tableStyles = {
  // Root table styles
  tableContainer: "overflow-x-auto",
  table: "overflow-hidden",

  // TableHeader styles
  header: "",

  // TableBody styles
  body: "",

  // TableRow styles
  // row: "not-last:border-neutral-hint not-last:border-b-1",
  row: "border-neutral-hint border-b-1",
  rowHoverable:
    "hover:bg-grey-50 checked:not-hover:bg-grey-50 cursor-pointer transition-colors duration-200 ease-in-out",
  rowSelected: "bg-grey-50",

  // TableHeading styles
  heading:
    "text-neutral-primary flex items-center border-neutral-hint h-11 border-b text-left text-base font-semibold",
  headingCellSpacing:
    "not-last:not-first:px-3 first:pr-3 first:pl-3 last:pr-3 last:pl-3",

  // TableCell styles
  cell: "text-neutral-primary h-11 flex items-center text-base not-last:not-first:px-3 first:pr-3 first:pl-3 last:pr-3 last:pl-3",

  // TableCaption styles
  caption: "text-neutral-secondary mt-4 text-sm",

  // No children styles
  noChildren: " text-neutral-secondary",
};
