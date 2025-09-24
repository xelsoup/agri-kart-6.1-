"use client"

import type React from "react"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingBasket, Tractor } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

type UserType = "buyer" | "seller"

export default function AuthPage() {
  const [userType, setUserType] = useState<UserType>("buyer")
  const router = useRouter()
  const { login, signup, isLoading } = useAuth()

  // form state
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [farmName, setFarmName] = useState("")
  const [farmLocation, setFarmLocation] = useState("")
  const [produceType, setProduceType] = useState("")
  const [businessTaxId, setBusinessTaxId] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // simulate login via auth context
    login(loginEmail, loginPassword, userType)
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) return
    // capture seller-specific fields in onboarding later; here we just create account
    signup(name, email, password, userType)
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
                    <Input id="email" type="email" placeholder="your@email.com" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link href="#" className="text-xs text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Input id="password" type="password" required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Login"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" required value={name} onChange={(e) => setName(e.target.value)} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input id="signup-email" type="email" placeholder="your@email.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input id="signup-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input id="confirm-password" type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                  </div>

                  {userType === "seller" && (
                    <div className="space-y-4 border-t pt-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Seller Details</p>
                        <p className="text-xs text-muted-foreground">These help us set up your farm profile. You can refine them during onboarding.</p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="farm-name">Farm Name</Label>
                        <Input id="farm-name" placeholder="e.g., Green Valley Farms" value={farmName} onChange={(e) => setFarmName(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="farm-location">Farm Location</Label>
                        <Input id="farm-location" placeholder="City, Region" value={farmLocation} onChange={(e) => setFarmLocation(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="produce-type">Primary Produce</Label>
                        <Input id="produce-type" placeholder="e.g., Tomatoes, Corn" value={produceType} onChange={(e) => setProduceType(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tax-id">Business/Tax ID</Label>
                        <Input id="tax-id" placeholder="Optional now; can be uploaded in onboarding" value={businessTaxId} onChange={(e) => setBusinessTaxId(e.target.value)} />
                      </div>
                      <p className="text-xs text-muted-foreground">After creating your account, you'll complete verification (ID, farm docs, phone/email) in a short onboarding.</p>
                    </div>
                  )}

                  <Button type="submit" className="w-full" disabled={isLoading || (password !== confirmPassword)}>
                    {isLoading ? "Creating account..." : "Create Account"}
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
