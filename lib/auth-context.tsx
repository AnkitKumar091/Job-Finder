"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

type UserType = "jobseeker" | "employer" | "admin"

interface User {
  id: string
  name: string
  email: string
  type: UserType
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, userType: string) => Promise<void>
  register: (name: string, email: string, password: string, userType: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        localStorage.removeItem("user")
      }
    }
  }, [])

  const login = async (email: string, password: string, userType: string) => {
    // In a real app, this would make an API call to authenticate
    // For demo purposes, we'll simulate a successful login

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Create a mock user based on the login type
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: email.split("@")[0],
      email,
      type: userType as UserType,
    }

    // Save user to state and localStorage
    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
  }

  const register = async (name: string, email: string, password: string, userType: string) => {
    // In a real app, this would make an API call to register a new user
    // For demo purposes, we'll simulate a successful registration

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Create a new user
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      type: userType as UserType,
    }

    // Save user to state and localStorage
    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
  }

  const logout = () => {
    // Clear user from state and localStorage
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
