import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, Users, MapPin, Calendar, Globe, Briefcase } from "lucide-react"
import { getCompanyById, getJobsByCompany } from "@/lib/data"

interface CompanyPageProps {
  params: {
    id: string
  }
}

export default function CompanyPage({ params }: CompanyPageProps) {
  const company = getCompanyById(params.id)

  if (!company) {
    notFound()
  }

  const jobs = getJobsByCompany(params.id)

  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Company Header */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="h-24 w-24 bg-muted rounded-md flex items-center justify-center">
              <Building2 className="h-12 w-12 text-primary" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">{company.name}</h1>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">{company.industry}</Badge>
                <Badge variant="outline">Founded {company.founded}</Badge>
                {company.jobCount > 0 && <Badge variant="outline">Hiring</Badge>}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{company.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{company.size}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  <Link href={company.website} className="text-primary hover:underline" target="_blank">
                    {company.website.replace("https://", "")}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="about" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="jobs">Open Positions ({company.jobCount})</TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>About {company.name}</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  <p>{company.description}</p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia,
                    nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia,
                    nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.
                  </p>
                  <p>
                    Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.
                    Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl sit amet nisl.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Company Culture</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  <p>
                    At {company.name}, we believe in fostering a collaborative and innovative work environment where
                    employees can thrive and grow professionally. Our core values include:
                  </p>
                  <ul>
                    <li>Innovation and creativity</li>
                    <li>Collaboration and teamwork</li>
                    <li>Customer-centric approach</li>
                    <li>Continuous learning and development</li>
                    <li>Work-life balance</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Benefits & Perks</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none">
                  <ul>
                    <li>Competitive salary and bonuses</li>
                    <li>Comprehensive health insurance</li>
                    <li>Flexible work arrangements</li>
                    <li>Professional development opportunities</li>
                    <li>Paid time off and holidays</li>
                    <li>Employee wellness programs</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="jobs" className="space-y-4">
              {jobs.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No open positions at the moment</p>
                  </CardContent>
                </Card>
              ) : (
                jobs.map((job) => (
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
                              <MapPin className="h-4 w-4" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Briefcase className="h-4 w-4" />
                              <span>{job.type}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>Posted on {new Date(job.postedAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 pt-1">
                            {job.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="secondary">
                                {tag}
                              </Badge>
                            ))}
                          </div>
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
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Industry</p>
                  <p className="font-medium">{company.industry}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Company Size</p>
                  <p className="font-medium">{company.size}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Founded</p>
                  <p className="font-medium">{company.founded}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{company.location}</p>
                </div>
              </div>

              <div className="pt-4">
                <Button className="w-full" asChild>
                  <Link href={`/companies/${company.id}/jobs`}>View All Jobs</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Similar Companies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-muted rounded-md flex items-center justify-center">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">TechSolutions</h3>
                    <p className="text-xs text-muted-foreground">Technology • 3 open positions</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-muted rounded-md flex items-center justify-center">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">InnovateTech</h3>
                    <p className="text-xs text-muted-foreground">Technology • 5 open positions</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-muted rounded-md flex items-center justify-center">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">DataSystems</h3>
                    <p className="text-xs text-muted-foreground">Technology • 2 open positions</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
