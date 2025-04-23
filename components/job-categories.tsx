import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Code, BarChart, PenTool, ShoppingBag, Building2, GraduationCap, Stethoscope, HeartPulse } from "lucide-react"

const categories = [
  {
    name: "Technology",
    icon: Code,
    count: 1245,
    slug: "technology",
  },
  {
    name: "Marketing",
    icon: BarChart,
    count: 873,
    slug: "marketing",
  },
  {
    name: "Design",
    icon: PenTool,
    count: 567,
    slug: "design",
  },
  {
    name: "Sales",
    icon: ShoppingBag,
    count: 942,
    slug: "sales",
  },
  {
    name: "Business",
    icon: Building2,
    count: 654,
    slug: "business",
  },
  {
    name: "Education",
    icon: GraduationCap,
    count: 432,
    slug: "education",
  },
  {
    name: "Healthcare",
    icon: Stethoscope,
    count: 765,
    slug: "healthcare",
  },
  {
    name: "Medical",
    icon: HeartPulse,
    count: 543,
    slug: "medical",
  },
]

export default function JobCategories() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((category) => {
        const Icon = category.icon
        return (
          <Card key={category.slug} className="overflow-hidden">
            <Link href={`/jobs?category=${category.slug}`}>
              <CardContent className="p-6 flex flex-col items-center text-center hover:bg-muted/50 transition-colors">
                <Icon className="h-10 w-10 mb-3 text-primary" />
                <h3 className="font-medium">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} jobs</p>
              </CardContent>
            </Link>
          </Card>
        )
      })}
    </div>
  )
}
