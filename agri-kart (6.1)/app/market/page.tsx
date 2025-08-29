"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { cn } from "@/lib/utils"

// Sample product data
const allProducts = [
  {
    id: "1",
    name: "Organic Rice",
    price: 250,
    image: "/placeholder.svg?height=300&width=300",
    category: "Grains",
    certification: ["Organic"],
  },
  {
    id: "2",
    name: "Fresh Mangoes",
    price: 120,
    image: "/placeholder.svg?height=300&width=300",
    category: "Fruits",
    certification: ["Pesticide Free"],
  },
  {
    id: "3",
    name: "Tomatoes",
    price: 80,
    image: "/placeholder.svg?height=300&width=300",
    category: "Vegetables",
    certification: ["Non-GMO"],
  },
  {
    id: "4",
    name: "Organic Bananas",
    price: 60,
    image: "/placeholder.svg?height=300&width=300",
    category: "Fruits",
    certification: ["Organic", "Fair Trade"],
  },
  {
    id: "5",
    name: "Sweet Potatoes",
    price: 75,
    image: "/placeholder.svg?height=300&width=300",
    category: "Vegetables",
  },
  {
    id: "6",
    name: "Brown Rice",
    price: 220,
    image: "/placeholder.svg?height=300&width=300",
    category: "Grains",
  },
  {
    id: "7",
    name: "Fresh Coconuts",
    price: 45,
    image: "/placeholder.svg?height=300&width=300",
    category: "Fruits",
  },
  {
    id: "8",
    name: "Organic Lettuce",
    price: 90,
    image: "/placeholder.svg?height=300&width=300",
    category: "Vegetables",
    certification: ["Organic"],
  },
  {
    id: "9",
    name: "White Corn",
    price: 65,
    image: "/placeholder.svg?height=300&width=300",
    category: "Grains",
  },
  {
    id: "10",
    name: "Avocados",
    price: 150,
    image: "/placeholder.svg?height=300&width=300",
    category: "Fruits",
    certification: ["Pesticide Free"],
  },
  {
    id: "11",
    name: "Carrots",
    price: 55,
    image: "/placeholder.svg?height=300&width=300",
    category: "Vegetables",
    certification: ["Organic"],
  },
  {
    id: "12",
    name: "Black Rice",
    price: 280,
    image: "/placeholder.svg?height=300&width=300",
    category: "Grains",
    certification: ["Organic", "Fair Trade"],
  },
]

export default function MarketPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0, 300])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([])
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Filter products based on selected filters
  const filteredProducts = allProducts.filter((product) => {
    // Search query filter
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    // Price range filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false
    }

    // Category filter
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      return false
    }

    // Certification filter
    if (selectedCertifications.length > 0) {
      if (!product.certification) return false

      const hasCertification = selectedCertifications.some((cert) => product.certification?.includes(cert))

      if (!hasCertification) return false
    }

    return true
  })

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handleCertificationChange = (certification: string) => {
    setSelectedCertifications((prev) =>
      prev.includes(certification) ? prev.filter((c) => c !== certification) : [...prev, certification],
    )
  }

  const handleApplyFilters = () => {
    // Filters are already applied reactively, but we can close mobile filters here
    setMobileFiltersOpen(false)
  }

  const handleResetFilters = () => {
    setSearchQuery("")
    setPriceRange([0, 300])
    setSelectedCategories([])
    setSelectedCertifications([])
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="container py-8">
          {/* Search bar */}
          <div className="mb-6 flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for products..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Button variant="outline" size="icon" className="md:hidden" onClick={() => setMobileFiltersOpen(true)}>
              <SlidersHorizontal className="h-4 w-4" />
              <span className="sr-only">Filters</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-[240px_1fr]">
            {/* Filters - Desktop */}
            <div className="hidden md:block">
              <div className="rounded-lg border bg-card p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Filters</h3>
                  <Button variant="ghost" size="sm" onClick={handleResetFilters}>
                    Reset
                  </Button>
                </div>

                <div className="mt-4 space-y-6">
                  {/* Category filter */}
                  <div>
                    <h4 className="mb-2 text-sm font-medium">Product Category</h4>
                    <div className="space-y-2">
                      {["Fruits", "Vegetables", "Grains"].map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={`category-${category}`}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => handleCategoryChange(category)}
                          />
                          <Label htmlFor={`category-${category}`}>{category}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price range filter */}
                  <div>
                    <h4 className="mb-2 text-sm font-medium">Price Range</h4>
                    <div className="space-y-4">
                      <Slider
                        defaultValue={[0, 300]}
                        max={300}
                        step={5}
                        value={priceRange}
                        onValueChange={setPriceRange}
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-sm">₱{priceRange[0]}</span>
                        <span className="text-sm">₱{priceRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Certification filter */}
                  <div>
                    <h4 className="mb-2 text-sm font-medium">Certifications</h4>
                    <div className="space-y-2">
                      {["Organic", "Non-GMO", "Fair Trade", "Regenerative", "Pesticide Free"].map((cert) => (
                        <div key={cert} className="flex items-center space-x-2">
                          <Checkbox
                            id={`cert-${cert}`}
                            checked={selectedCertifications.includes(cert)}
                            onCheckedChange={() => handleCertificationChange(cert)}
                          />
                          <Label htmlFor={`cert-${cert}`}>{cert}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full" onClick={handleApplyFilters}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>

            {/* Products grid */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold">Products</h2>
                <p className="text-sm text-muted-foreground">
                  {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} found
                </p>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="flex h-40 items-center justify-center rounded-lg border">
                  <p className="text-center text-muted-foreground">No products found matching your filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile filters */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-background transition-transform md:hidden",
          mobileFiltersOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <h3 className="font-medium">Filters</h3>
            <Button variant="ghost" size="icon" onClick={() => setMobileFiltersOpen(false)}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>

          <div className="flex-1 overflow-auto p-4">
            <div className="space-y-6">
              {/* Category filter */}
              <div>
                <h4 className="mb-2 text-sm font-medium">Product Category</h4>
                <div className="space-y-2">
                  {["Fruits", "Vegetables", "Grains"].map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`mobile-category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => handleCategoryChange(category)}
                      />
                      <Label htmlFor={`mobile-category-${category}`}>{category}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price range filter */}
              <div>
                <h4 className="mb-2 text-sm font-medium">Price Range</h4>
                <div className="space-y-4">
                  <Slider defaultValue={[0, 300]} max={300} step={5} value={priceRange} onValueChange={setPriceRange} />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">₱{priceRange[0]}</span>
                    <span className="text-sm">₱{priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Certification filter */}
              <div>
                <h4 className="mb-2 text-sm font-medium">Certifications</h4>
                <div className="space-y-2">
                  {["Organic", "Non-GMO", "Fair Trade", "Regenerative", "Pesticide Free"].map((cert) => (
                    <div key={cert} className="flex items-center space-x-2">
                      <Checkbox
                        id={`mobile-cert-${cert}`}
                        checked={selectedCertifications.includes(cert)}
                        onCheckedChange={() => handleCertificationChange(cert)}
                      />
                      <Label htmlFor={`mobile-cert-${cert}`}>{cert}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t p-4">
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={handleResetFilters}>
                Reset
              </Button>
              <Button className="flex-1" onClick={handleApplyFilters}>
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
