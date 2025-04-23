import { redirect } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Clock, FileText, Users } from "lucide-react"
import { getCurrentUser, getPostedJobs, getJobApplicationsByEmployer } from "@/lib/data"
import { formatDate } from "@/lib/utils"

export default function EmployerDashboard() {
  const user = getCurrentUser()

  // Redirect if not logged in or not an employer
  if (!user || user.type !== "employer") {
    redirect("/auth/login?type=employer")
  }

  const postedJobs = getPostedJobs(user.id)
  const applications = getJobApplicationsByEmployer(user.id)

  // Calculate stats
  const activeJobs = postedJobs.filter((job) => job.status === "active").length
  const totalApplications = applications.length
  const newApplications = applications.filter((app) => app.status === "pending").length

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Employer Dashboard</h1>
          <p className="text-muted-foreground">Manage your job listings and applications</p>
        </div>
        <Button asChild>
          <Link href="/employers/post-job">Post a New Job</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Jobs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{activeJobs}</div>
            <p className="text-muted-foreground">Currently active job listings</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalApplications}</div>
            <p className="text-muted-foreground">Applications received</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">New Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{newApplications}</div>
            <p className="text-muted-foreground">Pending review</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="jobs" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="jobs">My Job Listings</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
        </TabsList>

        <TabsContent value="jobs" className="space-y-4">
          {postedJobs.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <CardDescription>You haven&apos;t posted any jobs yet</CardDescription>
                <Button asChild className="mt-4">
                  <Link href="/employers/post-job">Post Your First Job</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            postedJobs.map((job) => (
              <Card key={job.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{job.title}</h3>
                        <Badge
                          variant={
                            job.status === "active" ? "success" : job.status === "draft" ? "outline" : "secondary"
                          }
                        >
                          {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>Posted on {formatDate(job.postedAt)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>{job.applications} applications</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/employers/jobs/${job.id}/edit`}>Edit</Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/employers/jobs/${job.id}/applications`}>View Applications</Link>
                      </Button>
                      <Button size="sm" asChild>
                        <Link href={`/jobs/${job.id}`}>Preview</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="applications" className="space-y-4">
          {applications.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <Users className="h-12 w-12 text-muted-foreground mb-4" />
                <CardDescription>No applications received yet</CardDescription>
              </CardContent>
            </Card>
          ) : (
            applications.map((application) => (
              <Card key={application.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{application.applicant.name}</h3>
                        <Badge
                          variant={
                            application.status === "pending"
                              ? "outline"
                              : application.status === "reviewing"
                                ? "secondary"
                                : application.status === "rejected"
                                  ? "destructive"
                                  : "success"
                          }
                        >
                          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                        </Badge>
                      </div>
                      <p>
                        Applied for: <span className="font-medium">{application.job.title}</span>
                      </p>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>Applied on {formatDate(application.appliedAt)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/employers/applications/${application.id}`}>View Details</Link>
                      </Button>
                      {application.status === "pending" && (
                        <Button size="sm" asChild>
                          <Link href={`/employers/applications/${application.id}/review`}>Review</Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
