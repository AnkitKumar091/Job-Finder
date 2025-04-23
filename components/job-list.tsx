import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, Building, Clock, MapPin } from "lucide-react"
import { getFilteredJobs } from "@/lib/data"
import { formatDate, formatSalary } from "@/lib/utils"

interface JobListProps {
  searchParams?: {
    q?: string
    location?: string
    category?: string | string[]
    type?: string | string[]
    experience?: string | string[]
    salaryMin?: string
    salaryMax?: string
    page?: string
  }
}

export default function JobList({ searchParams }: JobListProps = {}) {
  const jobs = getFilteredJobs(searchParams)
  const currentPage = Number.parseInt(searchParams?.page || "1")
  const totalPages = Math.ceil(jobs.length / 10)
  const paginatedJobs = jobs.slice((currentPage - 1) * 10, currentPage * 10)

  if (jobs.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-10">
          <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No jobs found</h3>
          <p className="text-muted-foreground text-center mb-4">
            We couldn&apos;t find any jobs matching your search criteria.
          </p>
          <Button asChild>
            <Link href="/jobs">Clear Filters</Link>
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">
          Showing <span className="font-medium">{paginatedJobs.length}</span> of{" "}
          <span className="font-medium">{jobs.length}</span> jobs
        </p>
      </div>

      <div className="space-y-4">
        {paginatedJobs.map((job) => (
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

      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <nav className="flex items-center gap-1">
            <Button variant="outline" size="sm" disabled={currentPage <= 1} asChild>
              <Link
                href={{
                  pathname: "/jobs",
                  query: { ...searchParams, page: currentPage - 1 },
                }}
              >
                Previous
              </Link>
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button key={page} variant={currentPage === page ? "default" : "outline"} size="sm" asChild>
                <Link
                  href={{
                    pathname: "/jobs",
                    query: { ...searchParams, page },
                  }}
                >
                  {page}
                </Link>
              </Button>
            ))}
            <Button variant="outline" size="sm" disabled={currentPage >= totalPages} asChild>
              <Link
                href={{
                  pathname: "/jobs",
                  query: { ...searchParams, page: currentPage + 1 },
                }}
              >
                Next
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </div>
  )
}
