import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Building, MapPin, Briefcase } from "lucide-react"
import { getFeaturedJobs } from "@/lib/data"
import { formatSalary } from "@/lib/utils"

export default function FeaturedJobs() {
  const featuredJobs = getFeaturedJobs()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {featuredJobs.map((job) => (
        <Card key={job.id} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="space-y-3">
              <div className="space-y-1">
                <h3 className="font-semibold text-lg line-clamp-1">
                  <Link href={`/jobs/${job.id}`} className="hover:underline">
                    {job.title}
                  </Link>
                </h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Building className="h-3 w-3" />
                  <span>{job.company}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="h-3 w-3" />
                  <span>{job.type}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {job.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              {job.salary && <p className="text-sm font-medium">{formatSalary(job.salary)}</p>}

              <Button size="sm" className="w-full" asChild>
                <Link href={`/jobs/${job.id}`}>View Job</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
