import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, TrendingUp, Users } from "lucide-react"
import FeaturedJobs from "@/components/featured-jobs"
import JobCategories from "@/components/job-categories"
import SearchBar from "@/components/search-bar"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Find Your Dream Job Today
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Connect with top employers and discover opportunities that match your skills and aspirations.
              </p>
            </div>
            <div className="w-full max-w-3xl mx-auto mt-6">
              <SearchBar />
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Button asChild size="lg">
                <Link href="/jobs">Browse All Jobs</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/employers/post-job">Post a Job</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-slate-950">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="flex flex-col items-center p-6">
                <Briefcase className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold">10,000+</h3>
                <p className="text-muted-foreground text-center">Active Job Listings</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center p-6">
                <Users className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold">5,000+</h3>
                <p className="text-muted-foreground text-center">Registered Companies</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex flex-col items-center p-6">
                <TrendingUp className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold">85%</h3>
                <p className="text-muted-foreground text-center">Successful Placements</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter">Featured Jobs</h2>
            <p className="text-muted-foreground max-w-[700px]">
              Explore our handpicked selection of top job opportunities from leading employers.
            </p>
          </div>
          <FeaturedJobs />
          <div className="flex justify-center mt-10">
            <Button asChild variant="outline">
              <Link href="/jobs">View All Jobs</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="py-16 bg-white dark:bg-slate-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter">Browse by Category</h2>
            <p className="text-muted-foreground max-w-[700px]">
              Find jobs in your field of expertise or explore new career paths.
            </p>
          </div>
          <JobCategories />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center lg:text-left">
              <h2 className="text-3xl font-bold tracking-tighter">Ready to Take the Next Step?</h2>
              <p className="max-w-[600px]">
                Create an account to apply for jobs, save your favorite listings, and get personalized job
                recommendations.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" variant="secondary">
                <Link href="/auth/register?type=jobseeker">Job Seeker Sign Up</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/auth/register?type=employer">Employer Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
