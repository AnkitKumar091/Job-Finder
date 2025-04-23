import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string) {
  const date = new Date(dateString)

  // If less than 24 hours ago, show relative time
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

  if (diffInHours < 24) {
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`
    }
    return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`
  }

  // If less than 7 days ago, show day of week
  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays !== 1 ? "s" : ""} ago`
  }

  // Otherwise, show formatted date
  return new Intl.DateTimeFormat("en-IN", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  }).format(date)
}

export function formatSalary(salary: any) {
  if (!salary) return "Salary not specified"

  const { min, max, currency = "INR" } = salary

  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  })

  if (min === max) {
    return formatter.format(min)
  }

  return `${formatter.format(min)} - ${formatter.format(max)}`
}
