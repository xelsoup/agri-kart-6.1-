"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

type UserType = "buyer" | "seller" | null

type User = {
  id: string
  name: string
  email: string
  type: UserType
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string, type: UserType) => Promise<void>
  signup: (name: string, email: string, password: string, type: UserType) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check if user is logged in on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (e) {
        console.error("Failed to parse user from localStorage")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, type: UserType) => {
    // In a real app, you would validate credentials with an API
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newUser = {
      id: Math.random().toString(36).substring(2, 9),
      name: email.split("@")[0],
      email,
      type,
    }

    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
    setIsLoading(false)

    // Redirect based on user type
    if (type === "buyer") {
      router.push("/market")
    } else {
      router.push("/dashboard")
    }
  }

  const signup = async (name: string, email: string, password: string, type: UserType) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newUser = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      email,
      type,
    }

    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
    setIsLoading(false)

    // Redirect based on user type
    if (type === "buyer") {
      router.push("/market")
    } else {
      router.push("/onboarding/seller")
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
