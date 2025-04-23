"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth-context"
import { applyForJob } from "@/lib/actions"

interface ApplyJobFormProps {
  jobId: string
}

export default function ApplyJobForm({ jobId }: ApplyJobFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to apply for jobs.",
        variant: "destructive",
      })
      router.push(`/auth/login?redirect=/jobs/${jobId}`)
      return
    }

    setIsLoading(true)

    const formData = new FormData(event.currentTarget)

    try {
      await applyForJob(jobId, formData)

      toast({
        title: "Application submitted",
        description: "Your job application has been submitted successfully.",
      })

      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Application failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" name="name" defaultValue={user?.name || ""} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" defaultValue={user?.email || ""} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" name="phone" type="tel" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="resume">Resume/CV</Label>
        <Input id="resume" name="resume" type="file" accept=".pdf,.doc,.docx" required />
        <p className="text-xs text-muted-foreground">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="coverLetter">Cover Letter (Optional)</Label>
        <Textarea
          id="coverLetter"
          name="coverLetter"
          placeholder="Tell us why you're a good fit for this position..."
          className="min-h-[120px]"
        />
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Submitting..." : "Apply Now"}
      </Button>
    </form>
  )
}
