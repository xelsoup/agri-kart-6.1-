import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroCarousel } from "@/components/hero-carousel"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { ArrowRight, Leaf, Truck, Users } from "lucide-react"

// Sample product data
const featuredProducts = [
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
]

const onHandProducts = [
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
  },
]

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Carousel */}
        <HeroCarousel />

        {/* On Sale Section */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold sm:text-3xl">On Sale</h2>
              <Link href="/market" className="flex items-center text-primary hover:underline">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* On Hand Section */}
        <section className="py-12 md:py-16 bg-muted">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold sm:text-3xl">Fresh Harvest</h2>
              <Link href="/market" className="flex items-center text-primary hover:underline">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {onHandProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">How Agri-Kart Works</h2>
              <p className="mt-4 text-muted-foreground">Simple steps to get fresh produce from farm to your doorstep</p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="mt-4 text-xl font-bold">Create an Account</h3>
                <p className="mt-2 text-muted-foreground">
                  Sign up as a buyer to shop or as a seller to list your farm products.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Leaf className="h-8 w-8" />
                </div>
                <h3 className="mt-4 text-xl font-bold">Browse & Shop</h3>
                <p className="mt-2 text-muted-foreground">
                  Explore our marketplace for fresh, locally-grown produce and add items to your cart.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Truck className="h-8 w-8" />
                </div>
                <h3 className="mt-4 text-xl font-bold">Fast Delivery</h3>
                <p className="mt-2 text-muted-foreground">
                  Receive your order quickly with our optimized farm-to-doorstep logistics.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Button asChild size="lg">
                <Link href="/auth">Get Started</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Join Community Section */}
        <section className="py-12 md:py-16 bg-primary text-primary-foreground">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">Join Our Growing Community</h2>
              <p className="mt-4">
                Connect with local farmers and fellow food enthusiasts. Get access to exclusive deals and support
                sustainable agriculture.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/auth">Sign Up Now</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
