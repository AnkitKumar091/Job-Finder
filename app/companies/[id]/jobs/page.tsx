import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Building, MapPin, Clock } from "lucide-react"
import { getCompanyById, getJobsByCompany } from "@/lib/data"
import { formatDate, formatSalary } from "@/lib/utils"

interface CompanyJobsPageProps {
  params: {
    id: string
  }
}

export default function CompanyJobsPage({ params }: CompanyJobsPageProps) {
  const company = getCompanyById(params.id)

  if (!company) {
    notFound()
  }

  const jobs = getJobsByCompany(params.id)

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col space-y-4 mb-8">
        <div className="flex items-center gap-2">
          <Link href="/companies" className="text-sm text-muted-foreground hover:underline">
            Companies
          </Link>
          <span className="text-muted-foreground">/</span>
          <Link href={`/companies/${company.id}`} className="text-sm text-muted-foreground hover:underline">
            {company.name}
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-sm">Jobs</span>
        </div>
        <h1 className="text-3xl font-bold">Jobs at {company.name}</h1>
        <p className="text-muted-foreground">
          Explore current job openings at {company.name} and find your next career opportunity
        </p>
      </div>

      {jobs.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No open positions at the moment</p>
            <Button asChild className="mt-4">
              <Link href="/companies">Browse Other Companies</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <Card key={job.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">
                      <Link href={`/jobs/${job.id}`} className="hover:underline">
                        {job.title}
                      </Link>
                    </h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Building className="h-4 w-4" />
                        <span>{job.company}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="h-4 w-4" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>Posted {formatDate(job.postedAt)}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {job.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    {job.salary && <p className="text-sm font-medium">{formatSalary(job.salary)}</p>}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/jobs/${job.id}`}>View Details</Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href={`/jobs/${job.id}#apply`}>Apply Now</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
