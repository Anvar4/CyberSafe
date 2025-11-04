import * as React from "react"

import { cn } from "@/lib/utils"

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto rounded-lg shadow-xl dark:shadow-2xl">
    <table
      ref={ref}
      // Ikkala rejimda ham to'liq kenglik va pastki sarlavha uslubi
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  // Sarlavha satrlarining pastki chegarasi: kunduzgi rejimda oddiy, tungi rejimda to'qroq chegara
  <thead 
    ref={ref} 
    className={cn("[&_tr]:border-b border-gray-200 dark:border-gray-700", className)} 
    {...props} 
  />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    // So'nggi satr chegarasini olib tashlashni ikkala rejimda ham saqlaymiz
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      // Fon: kunduzgi rejimda och kulrang, tungi rejimda to'q kulrang fon
      // Chegara: to'qroq chegara, tungi rejimda farqlanadigan chegara
      "border-t border-gray-300 dark:border-gray-600 bg-gray-100/70 dark:bg-gray-800/70 font-semibold [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      // Chegara: kunduzgi rejimda och kulrang, tungi rejimda to'q kulrang
      // Hover: kunduzgi rejimda ochroq fon, tungi rejimda to'qroq fon
      "border-b border-gray-200 dark:border-gray-700 transition-colors cursor-pointer",
      "hover:bg-gray-50 dark:hover:bg-gray-800/50", // Yangilangan hover effekti
      "data-[state=selected]:bg-gray-100 dark:data-[state=selected]:bg-gray-800", // Tanlangan satr foni
      className
    )}
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      // Balandlik va padding saqlangan
      "h-12 px-4 text-left align-middle font-semibold whitespace-nowrap",
      // Matn rangi: kunduzgi rejimda kulrang, tungi rejimda ochroq matn
      "text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-900/50", // Sarlavha qatoriga fon qo'shildi
      "[&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    // Padding saqlangan. Matn rangini aniq ko'rsatish mumkin, agar umumiy fon to'q bo'lsa
    className={cn(
      "p-4 align-middle [&:has([role=checkbox])]:pr-0",
      "text-gray-800 dark:text-gray-200", // Cell ichidagi matn rangi
      className
    )}
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    // Matn rangi: kunduzgi rejimda kulrang, tungi rejimda ochroq kulrang
    className={cn("mt-4 text-sm text-gray-900 dark:text-blue-900", className)}
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}