"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingBasket, Tractor } from "lucide-react"

type UserType = "buyer" | "seller"

export default function AuthPage() {
  const [userType, setUserType] = useState<UserType>("buyer")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would validate credentials with an API

    // Redirect based on user type
    if (userType === "buyer") {
      router.push("/market")
    } else {
      router.push("/dashboard")
    }
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would register the user with an API

    // Redirect based on user type
    if (userType === "buyer") {
      router.push("/market")
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="container py-12">
          <div className="mx-auto max-w-md">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold">Welcome to Agri-Kart</h1>
              <p className="mt-2 text-muted-foreground">Sign in to your account or create a new one</p>
            </div>

            <div className="mb-6">
              <div className="flex justify-center space-x-4">
                <Button
                  variant={userType === "buyer" ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setUserType("buyer")}
                >
                  <ShoppingBasket className="mr-2 h-4 w-4" />
                  I'm a Buyer
                </Button>
                <Button
                  variant={userType === "seller" ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setUserType("seller")}
                >
                  <Tractor className="mr-2 h-4 w-4" />
                  I'm a Seller
                </Button>
              </div>

              <p className="mt-2 text-center text-sm text-muted-foreground">
                {userType === "buyer"
                  ? "Shop for fresh produce directly from farmers"
                  : "Sell your farm products directly to consumers"}
              </p>
            </div>

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" required />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link href="#" className="text-xs text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Input id="password" type="password" required />
                  </div>

                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input id="signup-email" type="email" placeholder="your@email.com" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input id="signup-password" type="password" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" required />
                  </div>

                  <Button type="submit" className="w-full">
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
