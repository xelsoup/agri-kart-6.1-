"use client"

import { useState } from "react"
import { Clock, Eye, MoreHorizontal, Package, Search, ShoppingCart, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"

// Sample order data
const orders = [
  {
    id: "ORD-001",
    customer: "Juan Dela Cruz",
    date: "2023-05-14",
    total: 750,
    status: "Delivered",
    items: 3,
  },
  {
    id: "ORD-002",
    customer: "Maria Santos",
    date: "2023-05-13",
    total: 420,
    status: "Shipped",
    items: 2,
  },
  {
    id: "ORD-003",
    customer: "Pedro Reyes",
    date: "2023-05-12",
    total: 1250,
    status: "Processing",
    items: 5,
  },
  {
    id: "ORD-004",
    customer: "Ana Gonzales",
    date: "2023-05-11",
    total: 380,
    status: "Delivered",
    items: 2,
  },
  {
    id: "ORD-005",
    customer: "Jose Rizal",
    date: "2023-05-10",
    total: 890,
    status: "Delivered",
    items: 4,
  },
  {
    id: "ORD-006",
    customer: "Sofia Andres",
    date: "2023-05-09",
    total: 560,
    status: "Shipped",
    items: 3,
  },
  {
    id: "ORD-007",
    customer: "Miguel Lopez",
    date: "2023-05-08",
    total: 320,
    status: "Processing",
    items: 1,
  },
  {
    id: "ORD-008",
    customer: "Camila Mendoza",
    date: "2023-05-07",
    total: 1450,
    status: "Delivered",
    items: 6,
  },
]

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Processing":
        return <Clock className="mr-2 h-4 w-4" />
      case "Shipped":
        return <Truck className="mr-2 h-4 w-4" />
      case "Delivered":
        return <Package className="mr-2 h-4 w-4" />
      default:
        return null
    }
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Processing":
        return "outline"
      case "Shipped":
        return "default"
      case "Delivered":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="flex flex-col">
      <header className="border-b">
        <div className="flex h-16 items-center px-4 md:px-6">
          <h1 className="text-lg font-semibold md:text-2xl">Orders</h1>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search orders..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Export
            </Button>
          </div>
        </div>

        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell>{formatCurrency(order.total)}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(order.status)} className="flex w-fit items-center">
                        {getStatusIcon(order.status)}
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Truck className="mr-2 h-4 w-4" />
                            Update Status
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    <ShoppingCart className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="mt-2 text-lg font-medium">No orders found</p>
                    <p className="text-sm text-muted-foreground">Try adjusting your search criteria.</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  )
}
