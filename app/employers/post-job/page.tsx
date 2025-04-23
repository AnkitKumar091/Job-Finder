"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth-context"
import { createJob } from "@/lib/actions"

export default function PostJobPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  // Redirect if not logged in or not an employer
  if (!user || user.type !== "employer") {
    router.push("/auth/login?type=employer")
    return null
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)

    try {
      const jobId = await createJob(formData)

      toast({
        title: "Job posted successfully",
        description: "Your job listing has been created and is now live.",
      })

      router.push(`/employers/jobs/${jobId}`)
    } catch (error) {
      toast({
        title: "Error posting job",
        description: "There was an error creating your job listing. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Post a New Job</h1>
          <p className="text-muted-foreground">Create a job listing to find the perfect candidate</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
              <CardDescription>Provide the basic information about the job</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title *</Label>
                <Input id="title" name="title" placeholder="e.g. Senior Software Engineer" required />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Job Type *</Label>
                  <Select name="type" required defaultValue="full-time">
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="internship">Internship</SelectItem>
                      <SelectItem value="temporary">Temporary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input id="location" name="location" placeholder="e.g. New York, NY (or Remote)" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="salary-min">Salary Range (Min)</Label>
                  <Input id="salary-min" name="salaryMin" type="number" placeholder="e.g. 50000" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salary-max">Salary Range (Max)</Label>
                  <Input id="salary-max" name="salaryMax" type="number" placeholder="e.g. 80000" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Experience Level *</Label>
                <Select name="experience" required defaultValue="mid-level">
                  <SelectTrigger id="experience">
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry-level">Entry Level</SelectItem>
                    <SelectItem value="mid-level">Mid Level</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                    <SelectItem value="executive">Executive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Job Category *</Label>
                <Select name="category" required defaultValue="technology">
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select job category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="customer-service">Customer Service</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
              <CardDescription>Provide detailed information about the job</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Job Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe the job role, responsibilities, and company culture..."
                  className="min-h-[200px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements">Requirements *</Label>
                <Textarea
                  id="requirements"
                  name="requirements"
                  placeholder="List the skills, qualifications, and experience required..."
                  className="min-h-[150px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="benefits">Benefits (Optional)</Label>
                <Textarea
                  id="benefits"
                  name="benefits"
                  placeholder="Describe the benefits, perks, and advantages of working with your company..."
                  className="min-h-[150px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags (Comma separated)</Label>
                <Input id="tags" name="tags" placeholder="e.g. React, JavaScript, Remote, Healthcare" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Application Settings</CardTitle>
              <CardDescription>Configure how candidates can apply to this job</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="application-url">External Application URL (Optional)</Label>
                <Input
                  id="application-url"
                  name="applicationUrl"
                  type="url"
                  placeholder="e.g. https://your-company.com/careers/job-application"
                />
                <p className="text-sm text-muted-foreground">
                  Leave empty to use JobConnect&apos;s built-in application system
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deadline">Application Deadline (Optional)</Label>
                <Input id="deadline" name="deadline" type="date" />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Posting..." : "Post Job"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
