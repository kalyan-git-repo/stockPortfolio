"use client"

import { createColumnHelper, ColumnDef } from "@tanstack/react-table"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type DataRow = {
  particulars: string
  purchaseprice: number
  quantity: number
  investment: number
  portfoliopercentage: string
  nseorbse: string
  cmp: number
  presentvalue: number
  gainorloss: string
  peratio: string
  latestearnings: string
}

const columnHelper = createColumnHelper<DataRow>();

export const columns: ColumnDef<DataRow, any>[] = [
  {
    accessorKey: "particulars",
    header: "Particulars",
  },
  {
    accessorKey: "purchaseprice",
    header: "Purchase Price",
  },
  {
    accessorKey: "quantity",
    header: "Quantity (Qty)",
  },
  columnHelper.accessor(row => row.purchaseprice * row.quantity, { // <-- The calculation logic
    id: 'investment', // Give the column a unique ID
    header: 'Investment',
    cell: info => info.getValue(),
  }),
  {
    accessorKey: "portfoliopercentage",
    header: "Portfolio (%)",
  },
  {
    accessorKey: "nseorbse",
    header: "NSE/BSE",
  },
  {
    accessorKey: "cmp",
    header: "CMP",
  },
  columnHelper.accessor(row => row.cmp * row.quantity, { // <-- The calculation logic
    id: 'presentvalue', // Give the column a unique ID
    header: 'Present Value',
    cell: info => info.getValue(),
  }),
  {
    // Optional: add id for sorting/filtering if needed
    id: 'gainorloss',
    header: 'Gain/Loss',
    // The cell function receives an object with properties including `row`
    cell: ({ row }) => {
      // Access the original data for the current row
      const valA: any = row._valuesCache.presentvalue;
      const valB: any = row._valuesCache.investment;

      // Perform the subtraction
      const difference = (valA - valB);
      const status = (difference !== Math.abs(difference))
      const className = (status === true ? 'text-red-500 font-bold' : 'text-green-500 font-bold');
      
      return (
        <span className={className}>
          {difference.toString()}
        </span>
      )
      // Return the calculated value to be rendered in the cell // Format as needed
    },
  },
  {
    accessorKey: "peratio",
    header: "P/E Ratio",
  },
  {
    accessorKey: "latestearnings",
    header: "Latest Earnings",
  },
]