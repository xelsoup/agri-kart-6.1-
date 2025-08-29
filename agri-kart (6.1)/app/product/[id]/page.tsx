"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Minus, Plus, ArrowLeft, Truck, Shield, Leaf } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { formatCurrency } from "@/lib/utils"

// Sample product data
const products = [
  {
    id: "1",
    name: "Organic Rice",
    price: 250,
    image: "/placeholder.svg?height=600&width=600",
    category: "Grains",
    certification: ["Organic"],
    description:
      "Premium organic rice grown using traditional farming methods. Free from harmful chemicals and pesticides. Perfect for everyday meals.",
    stock: 50,
    seller: "Green Fields Farm",
    origin: "Isabela, Philippines",
  },
  {
    id: "2",
    name: "Fresh Mangoes",
    price: 120,
    image: "/placeholder.svg?height=600&width=600",
    category: "Fruits",
    certification: ["Pesticide Free"],
    description:
      "Sweet and juicy mangoes harvested at peak ripeness. These mangoes are grown without the use of harmful pesticides, ensuring a healthy and delicious treat.",
    stock: 30,
    seller: "Tropical Harvest",
    origin: "Guimaras, Philippines",
  },
  {
    id: "3",
    name: "Tomatoes",
    price: 80,
    image: "/placeholder.svg?height=600&width=600",
    category: "Vegetables",
    certification: ["Non-GMO"],
    description:
      "Fresh, ripe tomatoes perfect for salads, sauces, or cooking. These non-GMO tomatoes are grown with care to ensure the best flavor and nutritional value.",
    stock: 45,
    seller: "Valley Fresh Farms",
    origin: "Batangas, Philippines",
  },
  {
    id: "4",
    name: "Organic Bananas",
    price: 60,
    image: "/placeholder.svg?height=600&width=600",
    category: "Fruits",
    certification: ["Organic", "Fair Trade"],
    description:
      "Naturally sweet organic bananas grown using sustainable farming practices. These fair trade bananas support local farmers and communities.",
    stock: 60,
    seller: "Eco Harvest Cooperative",
    origin: "Davao, Philippines",
  },
  {
    id: "5",
    name: "Sweet Potatoes",
    price: 75,
    image: "/placeholder.svg?height=600&width=600",
    category: "Vegetables",
    description:
      "Nutritious sweet potatoes rich in vitamins and minerals. These versatile root vegetables can be baked, mashed, or fried for a delicious and healthy addition to any meal.",
    stock: 40,
    seller: "Highland Farms",
    origin: "Benguet, Philippines",
  },
  {
    id: "6",
    name: "Brown Rice",
    price: 220,
    image: "/placeholder.svg?height=600&width=600",
    category: "Grains",
    description:
      "Wholesome brown rice that retains its bran layer for added fiber and nutrients. A healthier alternative to white rice for your everyday meals.",
    stock: 55,
    seller: "Healthy Harvest Co.",
    origin: "Nueva Ecija, Philippines",
  },
  {
    id: "7",
    name: "Fresh Coconuts",
    price: 45,
    image: "/placeholder.svg?height=600&width=600",
    category: "Fruits",
    description:
      "Young, fresh coconuts with sweet water and soft meat. Perfect for refreshing drinks or as a healthy snack.",
    stock: 35,
    seller: "Tropical Paradise Farms",
    origin: "Quezon, Philippines",
  },
  {
    id: "8",
    name: "Organic Lettuce",
    price: 90,
    image: "/placeholder.svg?height=600&width=600",
    category: "Vegetables",
    certification: ["Organic"],
    description: "Crisp and fresh organic lettuce grown in controlled environments. Perfect for salads and sandwiches.",
    stock: 25,
    seller: "Green Leaf Gardens",
    origin: "Laguna, Philippines",
  },
]

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  const product = products.find((p) => p.id === productId) || products[0]

  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  const handleQuantityChange = (value: number) => {
    setQuantity(Math.max(1, Math.min(product.stock, value)))
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      category: product.category,
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="container py-8">
          <Link
            href="/market"
            className="mb-6 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Market
          </Link>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="overflow-hidden rounded-lg border">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <p className="mt-2 text-muted-foreground">{product.category}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.certification?.map((cert) => (
                  <Badge key={cert} variant="outline" className="flex items-center gap-1">
                    <Leaf className="h-3 w-3" />
                    {cert}
                  </Badge>
                ))}
              </div>

              <p className="text-2xl font-bold">{formatCurrency(product.price)}</p>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Quantity</p>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => handleQuantityChange(Number.parseInt(e.target.value) || 1)}
                    className="mx-2 w-16 text-center"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <span className="ml-4 text-sm text-muted-foreground">{product.stock} available</span>
                </div>
              </div>

              <Button size="lg" className="w-full" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>

              <div className="space-y-4 rounded-lg border p-4">
                <div className="flex items-start gap-2">
                  <Truck className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Fast Delivery</p>
                    <p className="text-sm text-muted-foreground">2-3 business days delivery</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Shield className="mt-0.5 h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Quality Guarantee</p>
                    <p className="text-sm text-muted-foreground">Satisfaction guaranteed or your money back</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium">Product Details</h3>
                <div className="mt-2 space-y-4">
                  <p>{product.description}</p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Seller</p>
                      <p className="text-muted-foreground">{product.seller}</p>
                    </div>
                    <div>
                      <p className="font-medium">Origin</p>
                      <p className="text-muted-foreground">{product.origin}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
