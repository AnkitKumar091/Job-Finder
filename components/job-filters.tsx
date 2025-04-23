"use client"

import { useState, useTransition } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { jobCategories, jobTypes, experienceLevels, indianLocations } from "@/lib/data"

export default function JobFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  // Get current filter values from URL
  const currentCategories = searchParams.getAll("category")
  const currentTypes = searchParams.getAll("type")
  const currentExperience = searchParams.getAll("experience")
  const currentLocations = searchParams.getAll("location")
  const currentSalaryMin = searchParams.get("salaryMin") || "0"
  const currentSalaryMax = searchParams.get("salaryMax") || "3000000"

  // Local state for filters
  const [categories, setCategories] = useState<string[]>(currentCategories)
  const [types, setTypes] = useState<string[]>(currentTypes)
  const [experience, setExperience] = useState<string[]>(currentExperience)
  const [locations, setLocations] = useState<string[]>(currentLocations)
  const [salaryRange, setSalaryRange] = useState<number[]>([
    Number.parseInt(currentSalaryMin),
    Number.parseInt(currentSalaryMax),
  ])

  const updateFilters = () => {
    startTransition(() => {
      // Create a new URLSearchParams instance from the current URL
      const params = new URLSearchParams(searchParams.toString())

      // Update category parameters
      params.delete("category")
      categories.forEach((category) => {
        params.append("category", category)
      })

      // Update type parameters
      params.delete("type")
      types.forEach((type) => {
        params.append("type", type)
      })

      // Update experience parameters
      params.delete("experience")
      experience.forEach((exp) => {
        params.append("experience", exp)
      })

      // Update location parameters
      params.delete("location")
      locations.forEach((loc) => {
        params.append("location", loc)
      })

      // Update salary parameters
      params.set("salaryMin", salaryRange[0].toString())
      params.set("salaryMax", salaryRange[1].toString())

      // Update the URL
      router.push(`/jobs?${params.toString()}`)
    })
  }

  const handleCategoryChange = (value: string, checked: boolean) => {
    if (checked) {
      setCategories([...categories, value])
    } else {
      setCategories(categories.filter((item) => item !== value))
    }
  }

  const handleTypeChange = (value: string, checked: boolean) => {
    if (checked) {
      setTypes([...types, value])
    } else {
      setTypes(types.filter((item) => item !== value))
    }
  }

  const handleExperienceChange = (value: string, checked: boolean) => {
    if (checked) {
      setExperience([...experience, value])
    } else {
      setExperience(experience.filter((item) => item !== value))
    }
  }

  const handleLocationChange = (value: string, checked: boolean) => {
    if (checked) {
      setLocations([...locations, value])
    } else {
      setLocations(locations.filter((item) => item !== value))
    }
  }

  const formatSalary = (value: number) => {
    return `₹${(value / 100000).toFixed(1)}L`
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button variant="outline" className="w-full" onClick={updateFilters} disabled={isPending}>
          Apply Filters
        </Button>
      </div>

      <Accordion
        type="multiple"
        defaultValue={["category", "type", "experience", "location", "salary"]}
        className="w-full"
      >
        <AccordionItem value="category">
          <AccordionTrigger>Job Category</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {jobCategories.map((category) => (
                <div key={category.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.value}`}
                    checked={categories.includes(category.value)}
                    onCheckedChange={(checked) => handleCategoryChange(category.value, checked as boolean)}
                  />
                  <Label htmlFor={`category-${category.value}`} className="font-normal">
                    {category.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="type">
          <AccordionTrigger>Job Type</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {jobTypes.map((type) => (
                <div key={type.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`type-${type.value}`}
                    checked={types.includes(type.value)}
                    onCheckedChange={(checked) => handleTypeChange(type.value, checked as boolean)}
                  />
                  <Label htmlFor={`type-${type.value}`} className="font-normal">
                    {type.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="experience">
          <AccordionTrigger>Experience Level</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {experienceLevels.map((level) => (
                <div key={level.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`experience-${level.value}`}
                    checked={experience.includes(level.value)}
                    onCheckedChange={(checked) => handleExperienceChange(level.value, checked as boolean)}
                  />
                  <Label htmlFor={`experience-${level.value}`} className="font-normal">
                    {level.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="location">
          <AccordionTrigger>Location</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {indianLocations.map((location) => (
                <div key={location.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`location-${location.value}`}
                    checked={locations.includes(location.value)}
                    onCheckedChange={(checked) => handleLocationChange(location.value, checked as boolean)}
                  />
                  <Label htmlFor={`location-${location.value}`} className="font-normal">
                    {location.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="salary">
          <AccordionTrigger>Salary Range (LPA)</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6">
              <Slider
                defaultValue={salaryRange}
                min={300000}
                max={3000000}
                step={100000}
                value={salaryRange}
                onValueChange={setSalaryRange}
              />
              <div className="flex items-center justify-between">
                <span className="text-sm">{formatSalary(salaryRange[0])}</span>
                <span className="text-sm">{formatSalary(salaryRange[1])}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
