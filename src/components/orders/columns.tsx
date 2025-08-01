"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Order } from "@/lib/types"

const getStatusVariant = (status: Order["status"]) => {
  switch (status) {
    case "Delivered":
      return "default";
    case "Shipped":
      return "secondary";
    case "Processing":
      return "outline";
    case "Cancelled":
      return "destructive";
    default:
      return "default";
  }
}

export const getColumns = (
  onEdit: (order: Order) => void,
  onDelete: (order: Order) => void
): ColumnDef<Order>[] => [
  {
    accessorKey: "id",
    header: "Order ID",
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
  },
  {
    accessorKey: "productName",
    header: "Product"
  },
  {
    accessorKey: "quantity",
    header: "Quantity"
  },
  {
    accessorKey: "date",
    header: "Date",
     cell: ({ row }) => {
        const date = row.original.date
        return date ? new Date(date).toLocaleDateString() : 'N/A'
    }
  },
  {
    accessorKey: "total",
    header: "Total",
    cell: ({ row }) => {
        return `$${row.original.total.toFixed(2)}`
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
        const status = row.original.status
        return <Badge variant={getStatusVariant(status) as any}>{status}</Badge>
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onEdit(order)}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(order)} className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
