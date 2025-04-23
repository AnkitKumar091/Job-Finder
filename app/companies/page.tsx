import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, Briefcase, Users, MapPin, Globe } from "lucide-react"
import { getAllCompanies } from "@/lib/data"

export default function CompaniesPage() {
  const companies = getAllCompanies()

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col space-y-4 mb-8">
        <h1 className="text-3xl font-bold">Companies</h1>
        <p className="text-muted-foreground">Discover top companies hiring now and explore their open positions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <Card key={company.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-16 w-16 bg-muted rounded-md flex items-center justify-center">
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{company.name}</h3>
                  <p className="text-sm text-muted-foreground">{company.industry}</p>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{company.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{company.size}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span>{company.jobCount} open positions</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <Link href={company.website} className="text-primary hover:underline" target="_blank">
                    {company.website.replace("https://", "")}
                  </Link>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">Founded {company.founded}</Badge>
                {company.jobCount > 0 && <Badge variant="outline">Hiring</Badge>}
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{company.description}</p>

              <div className="flex gap-2">
                <Button variant="outline" asChild className="flex-1">
                  <Link href={`/companies/${company.id}`}>View Profile</Link>
                </Button>
                <Button asChild className="flex-1">
                  <Link href={`/companies/${company.id}/jobs`}>View Jobs</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
