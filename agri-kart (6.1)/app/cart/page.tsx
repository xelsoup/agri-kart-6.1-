"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { formatCurrency } from "@/lib/utils"

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart()
  const [checkoutSuccess, setCheckoutSuccess] = useState(false)

  const handleCheckout = () => {
    // In a real app, you would integrate with a payment gateway
    // For now, we'll just simulate a successful checkout
    setCheckoutSuccess(true)
    clearCart()
  }

  if (checkoutSuccess) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />

        <main className="flex-1">
          <div className="container py-12">
            <div className="mx-auto max-w-md text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
                  <ShoppingCart className="h-12 w-12 text-primary" />
                </div>
              </div>

              <h1 className="text-2xl font-bold sm:text-3xl">Order Successful!</h1>
              <p className="mt-4 text-muted-foreground">
                Thank you for your purchase. Your order has been received and is being processed.
              </p>

              <div className="mt-8 space-y-4">
                <Button asChild size="lg" className="w-full">
                  <Link href="/market">Continue Shopping</Link>
                </Button>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />

        <main className="flex-1">
          <div className="container py-12">
            <div className="mx-auto max-w-md text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
                  <ShoppingCart className="h-12 w-12 text-muted-foreground" />
                </div>
              </div>

              <h1 className="text-2xl font-bold sm:text-3xl">Your cart is empty</h1>
              <p className="mt-4 text-muted-foreground">Looks like you haven't added any products to your cart yet.</p>

              <div className="mt-8">
                <Button asChild size="lg">
                  <Link href="/market">Start Shopping</Link>
                </Button>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="container py-8">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Shopping Cart</h1>
            <Link href="/market" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Continue Shopping
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-[1fr_320px]">
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-start gap-4 rounded-lg border p-4">
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between">
                      <Link href={`/product/${item.id}`} className="font-medium hover:underline">
                        {item.name}
                      </Link>
                      <p className="font-medium">{formatCurrency(item.price * item.quantity)}</p>
                    </div>

                    <p className="text-sm text-muted-foreground">{item.category}</p>
                    <p className="text-sm text-muted-foreground">{formatCurrency(item.price)} each</p>

                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="mx-2 w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="mr-1 h-4 w-4" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-lg border bg-card p-6">
              <h2 className="text-lg font-medium">Order Summary</h2>

              <div className="mt-4 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{formatCurrency(50)}</span>
                </div>

                <Separator />

                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>{formatCurrency(totalPrice + 50)}</span>
                </div>

                <Button className="w-full" size="lg" onClick={handleCheckout}>
                  Checkout
                </Button>

                <p className="text-center text-xs text-muted-foreground">Taxes and shipping calculated at checkout</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
