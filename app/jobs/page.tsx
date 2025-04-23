import { Suspense } from "react"
import JobFilters from "@/components/job-filters"
import JobList from "@/components/job-list"
import { Skeleton } from "@/components/ui/skeleton"
import SearchBar from "@/components/search-bar"

export default function JobsPage() {
  return (
    <div className="container px-4 md:px-6 py-8">
      <div className="flex flex-col space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-4">Find Your Perfect Job</h1>
          <SearchBar />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <JobFilters />
          </div>
          <div className="lg:col-span-3">
            <Suspense fallback={<JobListSkeleton />}>
              <JobList />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

function JobListSkeleton() {
  return (
    <div className="space-y-4">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="p-6 border rounded-lg">
            <div className="space-y-3">
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
              <div className="flex gap-2 pt-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="pt-4">
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}
