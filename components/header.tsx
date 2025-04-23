"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { Briefcase, ChevronDown, Menu, User } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function Header() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const isActive = (path: string) => {
    return pathname === path
  }

  const closeSheet = () => {
    setIsOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <Briefcase className="h-6 w-6" />
            <span className="text-xl font-bold">JobConnect</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/jobs"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/jobs") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Find Jobs
            </Link>
            <Link
              href="/companies"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/companies") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Companies
            </Link>
            {user?.type === "employer" && (
              <Link
                href="/employers/dashboard"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname.startsWith("/employers") ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Employer Dashboard
              </Link>
            )}
            {user?.type === "admin" && (
              <Link
                href="/admin/dashboard"
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname.startsWith("/admin") ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Admin Dashboard
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline-block">{user.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {user.type === "jobseeker" && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/applications">My Applications</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/saved-jobs">Saved Jobs</Link>
                    </DropdownMenuItem>
                  </>
                )}
                {user.type === "employer" && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/employers/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/employers/post-job">Post a Job</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/employers/company-profile">Company Profile</Link>
                    </DropdownMenuItem>
                  </>
                )}
                {user.type === "admin" && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/admin/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/admin/jobs">Manage Jobs</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/admin/users">Manage Users</Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Log Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" asChild className="hidden sm:flex">
                <Link href="/auth/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/register">Sign Up</Link>
              </Button>
            </div>
          )}

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4">
                <Link href="/" onClick={closeSheet} className="text-lg font-medium">
                  Home
                </Link>
                <Link href="/jobs" onClick={closeSheet} className="text-lg font-medium">
                  Find Jobs
                </Link>
                <Link href="/companies" onClick={closeSheet} className="text-lg font-medium">
                  Companies
                </Link>
                {user?.type === "employer" && (
                  <Link href="/employers/dashboard" onClick={closeSheet} className="text-lg font-medium">
                    Employer Dashboard
                  </Link>
                )}
                {user?.type === "admin" && (
                  <Link href="/admin/dashboard" onClick={closeSheet} className="text-lg font-medium">
                    Admin Dashboard
                  </Link>
                )}
                {!user && (
                  <>
                    <Link href="/auth/login" onClick={closeSheet} className="text-lg font-medium">
                      Sign In
                    </Link>
                    <Link href="/auth/register" onClick={closeSheet} className="text-lg font-medium">
                      Sign Up
                    </Link>
                  </>
                )}
                {user && (
                  <Button
                    variant="ghost"
                    className="justify-start p-0 text-lg font-medium"
                    onClick={() => {
                      logout()
                      closeSheet()
                    }}
                  >
                    Log Out
                  </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
