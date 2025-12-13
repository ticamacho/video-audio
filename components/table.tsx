"use client";

import React from "react";
import { cn } from "../utils";
import { styles as TableStyles } from "../styles";
import { motion } from "framer-motion";

// Root Table component
interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  className?: string;
}

function Table({ className, children, ...props }: TableProps) {
  const styles = TableStyles.table;

  return (
    <div className={styles.tableContainer}>
      <table className={cn(styles.table, className)} {...props}>
        {children}
      </table>
    </div>
  );
}

// TableHeader component
interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  className?: string;
}

function TableHeader({ className, children, ...props }: TableHeaderProps) {
  const styles = TableStyles.table;

  return (
    <thead className={cn(styles.header, className)} {...props}>
      {children}
    </thead>
  );
}

// TableBody component
interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  className?: string;
}

function TableBody({ className, children, ...props }: TableBodyProps) {
  const styles = TableStyles.table;
  const hasChildren = !!React.Children.count(children);

  return (
    <tbody className={cn(styles.body, className)} {...props}>
      {hasChildren ? (
        children
      ) : (
        <TableRow>
          <TableCell className={styles.cell}>
            <div className={styles.noChildren}>No requests found</div>
          </TableCell>
        </TableRow>
      )}
    </tbody>
  );
}

// TableRow component
interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  className?: string;
  href?: string;
  selected?: boolean;
  onClick?: (event: React.MouseEvent<HTMLTableRowElement>) => void;
}

function TableRow({
  className,
  children,
  href,
  selected,
  onClick,
}: TableRowProps) {
  const handleClick = (event: React.MouseEvent<HTMLTableRowElement>) => {
    if (onClick) {
      onClick(event);
    }

    if (href && !event.defaultPrevented) {
      window.location.href = href;
    }
  };

  const themeStyles = TableStyles.table;
  const rowStyles = {
    [themeStyles.row]: true,
    [themeStyles.rowHoverable]: href || onClick,
    [themeStyles.rowSelected]: selected,
  };
  const animationProps = {
    initial: { opacity: 0, scale: 1.025 },
    animate: { opacity: 1, scale: 1 },
  };

  // Use simple animation to call attention to the row
  return (
    <motion.tr
      className={cn(rowStyles, className)}
      onClick={handleClick}
      {...animationProps}
    >
      {children}
    </motion.tr>
  );
}

// TableHeading component
interface TableHeadingProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  className?: string;
}

function TableHeading({ className, children, ...props }: TableHeadingProps) {
  const styles = TableStyles.table;

  return (
    <th
      className={cn(styles.heading, styles.headingCellSpacing, className)}
      {...props}
    >
      {children}
    </th>
  );
}

// TableCell component
interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  className?: string;
}

function TableCell({ className, children, ...props }: TableCellProps) {
  const styles = TableStyles.table;

  return (
    <td className={cn(styles.cell, className)} {...props}>
      {children}
    </td>
  );
}

// TableCaption component
interface TableCaptionProps
  extends React.HTMLAttributes<HTMLTableCaptionElement> {
  className?: string;
}

function TableCaption({ className, children, ...props }: TableCaptionProps) {
  const styles = TableStyles.table;

  return (
    <caption className={cn(styles.caption, className)} {...props}>
      {children}
    </caption>
  );
}

export {
  Table as Root,
  TableHeader as Header,
  TableBody as Body,
  TableRow as Row,
  TableHeading as Heading,
  TableCell as Cell,
  TableCaption as Caption,
};
