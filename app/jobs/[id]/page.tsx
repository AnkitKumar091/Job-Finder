import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, Calendar, Clock, MapPin } from "lucide-react"
import { getJobById } from "@/lib/data"
import ApplyJobForm from "@/components/apply-job-form"
import { formatDate, formatSalary } from "@/lib/utils"

interface JobPageProps {
  params: {
    id: string
  }
}

export default function JobPage({ params }: JobPageProps) {
  const job = getJobById(params.id)

  if (!job) {
    notFound()
  }

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Job Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Link href="/jobs" className="text-sm text-muted-foreground hover:underline">
                Jobs
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-sm">{job.title}</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold">{job.title}</h1>
              <div className="flex flex-wrap items-center gap-3 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Building className="h-4 w-4" />
                  <span>{job.company}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{job.type}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>Posted {formatDate(job.postedAt)}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {job.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Job Description */}
          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: job.description }} />
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Responsibilities */}
          <Card>
            <CardHeader>
              <CardTitle>Responsibilities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                {job.responsibilities.map((resp, index) => (
                  <li key={index}>{resp}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Job Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Job Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Job Type</p>
                  <p className="font-medium">{job.type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Experience</p>
                  <p className="font-medium">{job.experience}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Salary</p>
                  <p className="font-medium">{formatSalary(job.salary)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{job.location}</p>
                </div>
              </div>

              <div className="pt-4">
                <Button className="w-full" size="lg">
                  Apply Now
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Company Info */}
          <Card>
            <CardHeader>
              <CardTitle>About the Company</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-muted rounded-md flex items-center justify-center">
                  <Building className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">{job.company}</h3>
                  <p className="text-sm text-muted-foreground">{job.industry}</p>
                </div>
              </div>
              <p className="text-sm">{job.companyDescription}</p>
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/companies/${job.companyId}`}>View Company Profile</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Apply Form */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Apply</CardTitle>
            </CardHeader>
            <CardContent>
              <ApplyJobForm jobId={job.id} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
