"use client";

import {
  CaretDownIcon,
  CaretUpDownIcon,
  CaretUpIcon,
} from "@phosphor-icons/react";
import { Column, SortDirection } from "@tanstack/react-table";
import { ReactNode } from "react";
import { cn } from "../utils";

interface TableColumnHeaderProps<T, TValue = unknown> {
  label: ReactNode;
  className?: string;
  align?: "left" | "center" | "right";
  column?: Column<T, TValue>;
  sortable?: boolean;
}

function TableColumnHeader<T, TValue = unknown>({
  label,
  className,
  align = "left",
  column,
  sortable = false,
}: TableColumnHeaderProps<T, TValue>) {
  const sortDirection = column?.getIsSorted() as SortDirection | false;

  const alignmentClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  // If not sortable, just render the header content
  if (!sortable || !column) {
    return (
      <div
        className={cn(
          "flex grow items-center",
          alignmentClasses[align],
          className,
        )}
      >
        {label}
      </div>
    );
  }

  // Handle click on sortable header
  const handleSortClick = () => {
    // If already descending (second click), clear sorting on next click
    if (sortDirection === "desc") {
      column.clearSorting();
    } else {
      // Otherwise toggle between ascending and descending
      column.toggleSorting(sortDirection === "asc");
    }
  };

  // Otherwise, render with sorting controls
  return (
    <div
      className={cn(
        "flex grow cursor-pointer items-center gap-1",
        alignmentClasses[align],
        className,
      )}
      onClick={handleSortClick}
    >
      <span>{label}</span>
      {sortDirection === "asc" ? (
        <CaretUpIcon size={14} />
      ) : sortDirection === "desc" ? (
        <CaretDownIcon size={14} />
      ) : (
        <CaretUpDownIcon size={14} />
      )}
    </div>
  );
}

export { TableColumnHeader };
