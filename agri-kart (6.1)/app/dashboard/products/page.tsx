"use client"

import { useState } from "react"
import Image from "next/image"
import { Edit, MoreHorizontal, Package, Plus, Search, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { formatCurrency } from "@/lib/utils"

// Sample product data
const products = [
  {
    id: "1",
    name: "Organic Rice",
    price: 250,
    image: "/placeholder.svg?height=40&width=40",
    category: "Grains",
    certification: ["Organic"],
    stock: 50,
    status: "In Stock",
  },
  {
    id: "2",
    name: "Fresh Mangoes",
    price: 120,
    image: "/placeholder.svg?height=40&width=40",
    category: "Fruits",
    certification: ["Pesticide Free"],
    stock: 30,
    status: "In Stock",
  },
  {
    id: "3",
    name: "Tomatoes",
    price: 80,
    image: "/placeholder.svg?height=40&width=40",
    category: "Vegetables",
    certification: ["Non-GMO"],
    stock: 45,
    status: "In Stock",
  },
  {
    id: "4",
    name: "Organic Bananas",
    price: 60,
    image: "/placeholder.svg?height=40&width=40",
    category: "Fruits",
    certification: ["Organic", "Fair Trade"],
    stock: 60,
    status: "In Stock",
  },
  {
    id: "5",
    name: "Sweet Potatoes",
    price: 75,
    image: "/placeholder.svg?height=40&width=40",
    category: "Vegetables",
    stock: 40,
    status: "In Stock",
  },
  {
    id: "6",
    name: "Brown Rice",
    price: 220,
    image: "/placeholder.svg?height=40&width=40",
    category: "Grains",
    stock: 55,
    status: "In Stock",
  },
  {
    id: "7",
    name: "Fresh Coconuts",
    price: 45,
    image: "/placeholder.svg?height=40&width=40",
    category: "Fruits",
    stock: 35,
    status: "In Stock",
  },
  {
    id: "8",
    name: "Organic Lettuce",
    price: 90,
    image: "/placeholder.svg?height=40&width=40",
    category: "Vegetables",
    certification: ["Organic"],
    stock: 25,
    status: "Low Stock",
  },
  {
    id: "9",
    name: "White Corn",
    price: 65,
    image: "/placeholder.svg?height=40&width=40",
    category: "Grains",
    stock: 0,
    status: "Out of Stock",
  },
]

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col">
      <header className="border-b">
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          <h1 className="text-lg font-semibold md:text-2xl">Products</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Export
            </Button>
            <Button variant="outline" size="sm">
              Import
            </Button>
          </div>
        </div>

        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[80px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 overflow-hidden rounded-md border">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            width={40}
                            height={40}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <div className="flex flex-wrap gap-1">
                            {product.certification?.map((cert) => (
                              <Badge key={cert} variant="outline" className="text-xs">
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{formatCurrency(product.price)}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          product.status === "In Stock"
                            ? "default"
                            : product.status === "Low Stock"
                              ? "outline"
                              : "destructive"
                        }
                      >
                        {product.status}
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
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    <Package className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="mt-2 text-lg font-medium">No products found</p>
                    <p className="text-sm text-muted-foreground">Try adjusting your search or add a new product.</p>
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
