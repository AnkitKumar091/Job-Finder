"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth-context"

export default function RegisterPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const { register } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  // Get the default tab from URL params or default to "jobseeker"
  const defaultTab = searchParams.get("type") || "jobseeker"

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, userType: string) => {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      await register(name, email, password, userType)

      toast({
        title: "Registration successful",
        description: "Your account has been created successfully.",
      })

      // Redirect based on user type
      if (userType === "employer") {
        router.push("/employers/dashboard")
      } else {
        router.push("/dashboard")
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "There was an error creating your account. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-200px)] py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
          <CardDescription className="text-center">
            Enter your information to create your JobConnect account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="jobseeker">Job Seeker</TabsTrigger>
              <TabsTrigger value="employer">Employer</TabsTrigger>
            </TabsList>

            <TabsContent value="jobseeker">
              <form onSubmit={(e) => handleSubmit(e, "jobseeker")} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="jobseeker-name">Full Name</Label>
                  <Input id="jobseeker-name" name="name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobseeker-email">Email</Label>
                  <Input id="jobseeker-email" name="email" type="email" placeholder="name@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobseeker-password">Password</Label>
                  <Input id="jobseeker-password" name="password" type="password" required />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="employer">
              <form onSubmit={(e) => handleSubmit(e, "employer")} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="employer-name">Company Name</Label>
                  <Input id="employer-name" name="name" placeholder="Acme Inc." required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employer-email">Email</Label>
                  <Input id="employer-email" name="email" type="email" placeholder="contact@company.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employer-password">Password</Label>
                  <Input id="employer-password" name="password" type="password" required />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-center text-sm mt-2">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
