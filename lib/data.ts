// Mock data for the job board application
// In a real application, this would be replaced with database calls

// Types
export interface Job {
  id: string
  title: string
  company: string
  companyId: string
  location: string
  type: string
  experience: string
  salary: {
    min: number
    max: number
    currency: string
  } | null
  description: string
  requirements: string[]
  responsibilities: string[]
  tags: string[]
  postedAt: string
  status: "active" | "draft" | "closed"
  applications: number
  featured: boolean
  industry: string
  companyDescription: string
}

export interface User {
  id: string
  name: string
  email: string
  type: "jobseeker" | "employer" | "admin"
  createdAt: string
}

export interface Company {
  id: string
  name: string
  industry: string
  description: string
  website: string
  location: string
  size: string
  founded: number
  jobCount: number
}

export interface JobApplication {
  id: string
  jobId: string
  userId: string
  appliedAt: string
  status: "pending" | "reviewing" | "rejected" | "accepted"
  job: {
    id: string
    title: string
    company: string
    location: string
  }
  applicant: {
    id: string
    name: string
    email: string
  }
}

// Mock data
const jobs: Job[] = [
  {
    id: "job-1",
    title: "Senior Frontend Developer",
    company: "TechCorp",
    companyId: "company-1",
    location: "Bangalore, Karnataka",
    type: "Full-time",
    experience: "Senior",
    salary: {
      min: 1800000,
      max: 2500000,
      currency: "INR",
    },
    description:
      "<p>We are looking for a Senior Frontend Developer to join our team. You will be responsible for building user interfaces for our web applications.</p><p>The ideal candidate has strong experience with React, TypeScript, and modern frontend development practices.</p>",
    requirements: [
      "5+ years of experience in frontend development",
      "Strong proficiency in React, TypeScript, and CSS",
      "Experience with state management libraries (Redux, MobX, etc.)",
      "Knowledge of responsive design and cross-browser compatibility",
      "Familiarity with testing frameworks (Jest, React Testing Library)",
    ],
    responsibilities: [
      "Develop and maintain user interfaces for web applications",
      "Collaborate with designers and backend developers",
      "Write clean, maintainable, and efficient code",
      "Optimize applications for maximum speed and scalability",
      "Stay up-to-date with emerging trends and technologies",
    ],
    tags: ["React", "TypeScript", "JavaScript", "CSS", "Frontend"],
    postedAt: "2023-04-15T10:00:00Z",
    status: "active",
    applications: 24,
    featured: true,
    industry: "Technology",
    companyDescription:
      "TechCorp is a leading technology company specializing in web and mobile application development.",
  },
  {
    id: "job-2",
    title: "Backend Engineer",
    company: "DataSystems",
    companyId: "company-2",
    location: "Remote",
    type: "Full-time",
    experience: "Mid-Level",
    salary: {
      min: 1200000,
      max: 1800000,
      currency: "INR",
    },
    description:
      "<p>DataSystems is seeking a Backend Engineer to help build and maintain our cloud-based data processing platform.</p><p>You will work with a team of engineers to design, implement, and optimize backend services.</p>",
    requirements: [
      "3+ years of experience in backend development",
      "Proficiency in Node.js, Python, or Java",
      "Experience with RESTful APIs and microservices",
      "Knowledge of database systems (SQL and NoSQL)",
      "Familiarity with cloud platforms (AWS, Azure, GCP)",
    ],
    responsibilities: [
      "Design and implement backend services and APIs",
      "Optimize database queries and data processing",
      "Ensure high performance and reliability of applications",
      "Collaborate with frontend developers and data scientists",
      "Participate in code reviews and technical discussions",
    ],
    tags: ["Node.js", "Python", "APIs", "Databases", "Backend"],
    postedAt: "2023-04-10T14:30:00Z",
    status: "active",
    applications: 18,
    featured: true,
    industry: "Technology",
    companyDescription: "DataSystems specializes in building scalable data processing solutions for enterprises.",
  },
  {
    id: "job-3",
    title: "UX/UI Designer",
    company: "CreativeMinds",
    companyId: "company-3",
    location: "Mumbai, Maharashtra",
    type: "Full-time",
    experience: "Mid-Level",
    salary: {
      min: 1000000,
      max: 1500000,
      currency: "INR",
    },
    description:
      "<p>CreativeMinds is looking for a talented UX/UI Designer to join our growing design team.</p><p>You will be responsible for creating intuitive and engaging user experiences for our clients' digital products.</p>",
    requirements: [
      "3+ years of experience in UX/UI design",
      "Proficiency in design tools (Figma, Sketch, Adobe XD)",
      "Strong portfolio demonstrating UI design skills",
      "Understanding of user-centered design principles",
      "Experience with design systems and component libraries",
    ],
    responsibilities: [
      "Create wireframes, prototypes, and high-fidelity designs",
      "Conduct user research and usability testing",
      "Collaborate with developers to implement designs",
      "Maintain and evolve design systems",
      "Stay current with design trends and best practices",
    ],
    tags: ["UX", "UI", "Figma", "Design", "User Research"],
    postedAt: "2023-04-05T09:15:00Z",
    status: "active",
    applications: 32,
    featured: true,
    industry: "Design",
    companyDescription: "CreativeMinds is a design agency specializing in digital product design and branding.",
  },
  {
    id: "job-4",
    title: "DevOps Engineer",
    company: "CloudTech",
    companyId: "company-4",
    location: "Remote",
    type: "Full-time",
    experience: "Senior",
    salary: {
      min: 1600000,
      max: 2200000,
      currency: "INR",
    },
    description:
      "<p>CloudTech is seeking an experienced DevOps Engineer to help us build and maintain our cloud infrastructure.</p><p>You will be responsible for automating deployment processes and ensuring the reliability of our systems.</p>",
    requirements: [
      "5+ years of experience in DevOps or SRE roles",
      "Strong knowledge of cloud platforms (AWS, Azure, GCP)",
      "Experience with containerization (Docker, Kubernetes)",
      "Proficiency in infrastructure as code (Terraform, CloudFormation)",
      "Familiarity with CI/CD pipelines and automation tools",
    ],
    responsibilities: [
      "Design and implement cloud infrastructure",
      "Automate deployment and scaling processes",
      "Monitor system performance and reliability",
      "Troubleshoot and resolve infrastructure issues",
      "Collaborate with development teams to improve workflows",
    ],
    tags: ["DevOps", "AWS", "Kubernetes", "Terraform", "CI/CD"],
    postedAt: "2023-04-02T11:45:00Z",
    status: "active",
    applications: 15,
    featured: false,
    industry: "Technology",
    companyDescription: "CloudTech provides cloud infrastructure and DevOps solutions for businesses of all sizes.",
  },
  {
    id: "job-5",
    title: "Data Scientist",
    company: "AnalyticsPro",
    companyId: "company-5",
    location: "Hyderabad, Telangana",
    type: "Full-time",
    experience: "Mid-Level",
    salary: {
      min: 1400000,
      max: 2000000,
      currency: "INR",
    },
    description:
      "<p>AnalyticsPro is looking for a Data Scientist to join our team and help extract insights from complex datasets.</p><p>You will work on developing machine learning models and data analysis pipelines.</p>",
    requirements: [
      "3+ years of experience in data science or related field",
      "Strong background in statistics and machine learning",
      "Proficiency in Python and data analysis libraries",
      "Experience with big data technologies",
      "Knowledge of SQL and database systems",
    ],
    responsibilities: [
      "Develop and implement machine learning models",
      "Analyze large datasets to extract insights",
      "Create data visualizations and reports",
      "Collaborate with engineering and product teams",
      "Stay current with advances in data science and ML",
    ],
    tags: ["Data Science", "Machine Learning", "Python", "Statistics", "Analytics"],
    postedAt: "2023-03-28T13:20:00Z",
    status: "active",
    applications: 27,
    featured: false,
    industry: "Technology",
    companyDescription: "AnalyticsPro specializes in data analytics and machine learning solutions for businesses.",
  },
  {
    id: "job-6",
    title: "Product Manager",
    company: "InnovateCo",
    companyId: "company-6",
    location: "Pune, Maharashtra",
    type: "Full-time",
    experience: "Senior",
    salary: {
      min: 1800000,
      max: 2500000,
      currency: "INR",
    },
    description:
      "<p>InnovateCo is seeking an experienced Product Manager to lead the development of our SaaS platform.</p><p>You will be responsible for defining product strategy and working with cross-functional teams to deliver features.</p>",
    requirements: [
      "5+ years of experience in product management",
      "Strong understanding of software development lifecycle",
      "Experience with agile methodologies",
      "Excellent communication and leadership skills",
      "Background in technology or related field",
    ],
    responsibilities: [
      "Define product vision, strategy, and roadmap",
      "Gather and prioritize product requirements",
      "Work with engineering, design, and marketing teams",
      "Analyze market trends and competitive landscape",
      "Track and measure product performance metrics",
    ],
    tags: ["Product Management", "SaaS", "Agile", "Strategy", "Leadership"],
    postedAt: "2023-03-25T15:10:00Z",
    status: "active",
    applications: 21,
    featured: false,
    industry: "Technology",
    companyDescription: "InnovateCo develops innovative SaaS solutions for businesses across various industries.",
  },
  {
    id: "job-7",
    title: "Marketing Specialist",
    company: "GrowthMarketing",
    companyId: "company-7",
    location: "Delhi, NCR",
    type: "Full-time",
    experience: "Entry-Level",
    salary: {
      min: 600000,
      max: 900000,
      currency: "INR",
    },
    description:
      "<p>GrowthMarketing is looking for a Marketing Specialist to join our team and help drive customer acquisition and engagement.</p><p>You will be involved in planning and executing marketing campaigns across various channels.</p>",
    requirements: [
      "1-2 years of experience in digital marketing",
      "Knowledge of social media platforms and best practices",
      "Familiarity with email marketing and content creation",
      "Basic understanding of SEO and SEM",
      "Strong written and verbal communication skills",
    ],
    responsibilities: [
      "Plan and execute marketing campaigns",
      "Create and manage social media content",
      "Write marketing copy for various channels",
      "Track and analyze campaign performance",
      "Collaborate with design and sales teams",
    ],
    tags: ["Marketing", "Social Media", "Content", "SEO", "Campaigns"],
    postedAt: "2023-03-20T10:30:00Z",
    status: "active",
    applications: 45,
    featured: false,
    industry: "Marketing",
    companyDescription: "GrowthMarketing is a digital marketing agency helping businesses grow their online presence.",
  },
  {
    id: "job-8",
    title: "Full Stack Developer",
    company: "WebSolutions",
    companyId: "company-8",
    location: "Chennai, Tamil Nadu",
    type: "Full-time",
    experience: "Mid-Level",
    salary: {
      min: 1200000,
      max: 1800000,
      currency: "INR",
    },
    description:
      "<p>WebSolutions is seeking a Full Stack Developer to help build and maintain web applications for our clients.</p><p>You will be responsible for both frontend and backend development, working with modern technologies.</p>",
    requirements: [
      "3+ years of experience in full stack development",
      "Proficiency in JavaScript/TypeScript and modern frameworks",
      "Experience with backend technologies (Node.js, Python, etc.)",
      "Knowledge of database systems and API design",
      "Familiarity with version control and CI/CD",
    ],
    responsibilities: [
      "Develop and maintain web applications",
      "Implement responsive user interfaces",
      "Design and build backend services and APIs",
      "Optimize applications for performance and scalability",
      "Collaborate with designers and other developers",
    ],
    tags: ["Full Stack", "JavaScript", "Node.js", "React", "Web Development"],
    postedAt: "2023-03-18T09:45:00Z",
    status: "active",
    applications: 33,
    featured: false,
    industry: "Technology",
    companyDescription: "WebSolutions provides web development services for businesses of all sizes.",
  },
  {
    id: "job-9",
    title: "HR Manager",
    company: "PeopleFirst",
    companyId: "company-9",
    location: "Gurgaon, Haryana",
    type: "Full-time",
    experience: "Senior",
    salary: {
      min: 1200000,
      max: 1800000,
      currency: "INR",
    },
    description:
      "<p>PeopleFirst is looking for an HR Manager to oversee our human resources operations.</p><p>You will be responsible for recruitment, employee relations, and HR policy development.</p>",
    requirements: [
      "5+ years of experience in HR management",
      "Knowledge of employment laws and regulations",
      "Experience with HRIS and applicant tracking systems",
      "Strong interpersonal and conflict resolution skills",
      "Bachelor's degree in HR or related field",
    ],
    responsibilities: [
      "Oversee recruitment and onboarding processes",
      "Manage employee relations and resolve conflicts",
      "Develop and implement HR policies and procedures",
      "Administer benefits and compensation programs",
      "Ensure compliance with employment laws",
    ],
    tags: ["HR", "Recruitment", "Employee Relations", "Benefits", "Management"],
    postedAt: "2023-03-15T14:20:00Z",
    status: "active",
    applications: 19,
    featured: false,
    industry: "Human Resources",
    companyDescription:
      "PeopleFirst is an HR consulting firm helping businesses manage their human resources effectively.",
  },
  {
    id: "job-10",
    title: "Customer Support Specialist",
    company: "SupportHub",
    companyId: "company-10",
    location: "Remote",
    type: "Full-time",
    experience: "Entry-Level",
    salary: {
      min: 500000,
      max: 700000,
      currency: "INR",
    },
    description:
      "<p>SupportHub is seeking a Customer Support Specialist to help our clients resolve technical issues.</p><p>You will be responsible for providing excellent customer service and troubleshooting problems.</p>",
    requirements: [
      "1+ years of experience in customer support",
      "Strong communication and problem-solving skills",
      "Ability to explain technical concepts clearly",
      "Experience with ticketing systems",
      "Patient and empathetic attitude",
    ],
    responsibilities: [
      "Respond to customer inquiries via email, chat, and phone",
      "Troubleshoot and resolve technical issues",
      "Document solutions and update knowledge base",
      "Escalate complex problems to appropriate teams",
      "Provide feedback on product improvements",
    ],
    tags: ["Customer Support", "Technical Support", "Communication", "Troubleshooting"],
    postedAt: "2023-03-10T11:15:00Z",
    status: "active",
    applications: 38,
    featured: false,
    industry: "Customer Service",
    companyDescription: "SupportHub provides customer support services for technology companies.",
  },
]

const users: User[] = [
  {
    id: "user-1",
    name: "John Doe",
    email: "john@example.com",
    type: "jobseeker",
    createdAt: "2023-01-15T10:00:00Z",
  },
  {
    id: "user-2",
    name: "Jane Smith",
    email: "jane@example.com",
    type: "jobseeker",
    createdAt: "2023-02-20T14:30:00Z",
  },
  {
    id: "user-3",
    name: "TechCorp",
    email: "hr@techcorp.com",
    type: "employer",
    createdAt: "2023-01-10T09:15:00Z",
  },
  {
    id: "user-4",
    name: "DataSystems",
    email: "careers@datasystems.com",
    type: "employer",
    createdAt: "2023-02-05T11:45:00Z",
  },
  {
    id: "user-5",
    name: "Admin User",
    email: "admin@jobconnect.com",
    type: "admin",
    createdAt: "2023-01-01T08:00:00Z",
  },
]

const companies: Company[] = [
  {
    id: "company-1",
    name: "TechCorp",
    industry: "Technology",
    description: "TechCorp is a leading technology company specializing in web and mobile application development.",
    website: "https://techcorp.example.com",
    location: "Bangalore, Karnataka",
    size: "51-200 employees",
    founded: 2010,
    jobCount: 3,
  },
  {
    id: "company-2",
    name: "DataSystems",
    industry: "Technology",
    description: "DataSystems specializes in building scalable data processing solutions for enterprises.",
    website: "https://datasystems.example.com",
    location: "Remote",
    size: "11-50 employees",
    founded: 2015,
    jobCount: 2,
  },
  {
    id: "company-3",
    name: "CreativeMinds",
    industry: "Design",
    description: "CreativeMinds is a design agency specializing in digital product design and branding.",
    website: "https://creativeminds.example.com",
    location: "Mumbai, Maharashtra",
    size: "11-50 employees",
    founded: 2012,
    jobCount: 1,
  },
  {
    id: "company-4",
    name: "CloudTech",
    industry: "Technology",
    description: "CloudTech provides cloud infrastructure and DevOps solutions for businesses of all sizes.",
    website: "https://cloudtech.example.com",
    location: "Remote",
    size: "11-50 employees",
    founded: 2017,
    jobCount: 1,
  },
  {
    id: "company-5",
    name: "AnalyticsPro",
    industry: "Technology",
    description: "AnalyticsPro specializes in data analytics and machine learning solutions for businesses.",
    website: "https://analyticspro.example.com",
    location: "Hyderabad, Telangana",
    size: "11-50 employees",
    founded: 2016,
    jobCount: 1,
  },
  {
    id: "company-6",
    name: "InnovateCo",
    industry: "Technology",
    description: "InnovateCo develops innovative SaaS solutions for businesses across various industries.",
    website: "https://innovateco.example.com",
    location: "Pune, Maharashtra",
    size: "51-200 employees",
    founded: 2014,
    jobCount: 2,
  },
  {
    id: "company-7",
    name: "GrowthMarketing",
    industry: "Marketing",
    description: "GrowthMarketing is a digital marketing agency helping businesses grow their online presence.",
    website: "https://growthmarketing.example.com",
    location: "Delhi, NCR",
    size: "11-50 employees",
    founded: 2018,
    jobCount: 1,
  },
  {
    id: "company-8",
    name: "WebSolutions",
    industry: "Technology",
    description: "WebSolutions provides web development services for businesses of all sizes.",
    website: "https://websolutions.example.com",
    location: "Chennai, Tamil Nadu",
    size: "11-50 employees",
    founded: 2015,
    jobCount: 1,
  },
  {
    id: "company-9",
    name: "PeopleFirst",
    industry: "Human Resources",
    description: "PeopleFirst is an HR consulting firm helping businesses manage their human resources effectively.",
    website: "https://peoplefirst.example.com",
    location: "Gurgaon, Haryana",
    size: "11-50 employees",
    founded: 2016,
    jobCount: 1,
  },
  {
    id: "company-10",
    name: "SupportHub",
    industry: "Customer Service",
    description: "SupportHub provides customer support services for technology companies.",
    website: "https://supporthub.example.com",
    location: "Remote",
    size: "11-50 employees",
    founded: 2019,
    jobCount: 1,
  },
]

const applications: JobApplication[] = [
  {
    id: "app-1",
    jobId: "job-1",
    userId: "user-1",
    appliedAt: "2023-04-16T14:30:00Z",
    status: "reviewing",
    job: {
      id: "job-1",
      title: "Senior Frontend Developer",
      company: "TechCorp",
      location: "Bangalore, Karnataka",
    },
    applicant: {
      id: "user-1",
      name: "John Doe",
      email: "john@example.com",
    },
  },
  {
    id: "app-2",
    jobId: "job-2",
    userId: "user-1",
    appliedAt: "2023-04-12T10:15:00Z",
    status: "pending",
    job: {
      id: "job-2",
      title: "Backend Engineer",
      company: "DataSystems",
      location: "Remote",
    },
    applicant: {
      id: "user-1",
      name: "John Doe",
      email: "john@example.com",
    },
  },
  {
    id: "app-3",
    jobId: "job-3",
    userId: "user-2",
    appliedAt: "2023-04-07T09:45:00Z",
    status: "accepted",
    job: {
      id: "job-3",
      title: "UX/UI Designer",
      company: "CreativeMinds",
      location: "Mumbai, Maharashtra",
    },
    applicant: {
      id: "user-2",
      name: "Jane Smith",
      email: "jane@example.com",
    },
  },
]

const savedJobs = [
  {
    id: "job-4",
    title: "DevOps Engineer",
    company: "CloudTech",
    location: "Remote",
    type: "Full-time",
    savedAt: "2023-04-18T15:30:00Z",
  },
  {
    id: "job-5",
    title: "Data Scientist",
    company: "AnalyticsPro",
    location: "Hyderabad, Telangana",
    type: "Full-time",
    savedAt: "2023-04-17T11:20:00Z",
  },
]

// Data access functions
export function getAllJobs() {
  return jobs
}

export function getJobById(id: string) {
  return jobs.find((job) => job.id === id) || null
}

export function getFilteredJobs(filters: any = {}) {
  let filteredJobs = [...jobs]

  // Search query
  if (filters?.q) {
    const query = filters.q.toLowerCase()
    filteredJobs = filteredJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.tags.some((tag) => tag.toLowerCase().includes(query)),
    )
  }

  // Location
  if (filters?.location) {
    const locations = Array.isArray(filters.location) ? filters.location : [filters.location]
    if (locations.length > 0) {
      filteredJobs = filteredJobs.filter((job) => {
        const jobLocation = job.location.toLowerCase()
        return locations.some((loc) => jobLocation.includes(loc.toLowerCase()))
      })
    }
  }

  // Categories
  if (filters?.category) {
    const categories = Array.isArray(filters.category) ? filters.category : [filters.category]
    if (categories.length > 0) {
      filteredJobs = filteredJobs.filter((job) => job.tags.some((tag) => categories.includes(tag.toLowerCase())))
    }
  }

  // Job types
  if (filters?.type) {
    const types = Array.isArray(filters.type) ? filters.type : [filters.type]
    if (types.length > 0) {
      filteredJobs = filteredJobs.filter((job) => types.includes(job.type.toLowerCase().replace("-", "")))
    }
  }

  // Experience levels
  if (filters?.experience) {
    const levels = Array.isArray(filters.experience) ? filters.experience : [filters.experience]
    if (levels.length > 0) {
      filteredJobs = filteredJobs.filter((job) => levels.includes(job.experience.toLowerCase().replace(" ", "-")))
    }
  }

  // Salary range
  if (filters?.salaryMin || filters?.salaryMax) {
    const min = Number.parseInt(filters.salaryMin) || 0
    const max = Number.parseInt(filters.salaryMax) || Number.POSITIVE_INFINITY

    filteredJobs = filteredJobs.filter((job) => {
      if (!job.salary) return false
      return job.salary.min >= min && job.salary.max <= max
    })
  }

  return filteredJobs
}

export function getFeaturedJobs() {
  return jobs.filter((job) => job.featured).slice(0, 6)
}

export function getAllUsers() {
  return users
}

export function getUserById(id: string) {
  return users.find((user) => user.id === id) || null
}

export function getCurrentUser() {
  // In a real app, this would get the current authenticated user
  // For demo purposes, we'll return a mock user
  return null
}

export function getAllCompanies() {
  return companies
}

export function getCompanyById(id: string) {
  return companies.find((company) => company.id === id) || null
}

export function getJobsByCompany(companyId: string) {
  return jobs.filter((job) => job.companyId === companyId)
}

export function getJobApplications(userId: string) {
  return applications.filter((app) => app.userId === userId)
}

export function getJobApplicationsByEmployer(employerId: string) {
  // In a real app, this would filter by the employer ID
  // For demo purposes, we'll return all applications
  return applications
}

export function getSavedJobs(userId: string) {
  // In a real app, this would get saved jobs for a specific user
  // For demo purposes, we'll return mock data
  return savedJobs
}

export function getRecommendedJobs(userId: string) {
  // In a real app, this would return personalized job recommendations
  // For demo purposes, we'll return a subset of jobs
  return jobs.slice(0, 3)
}

export function getPostedJobs(employerId: string) {
  // In a real app, this would filter by the employer ID
  // For demo purposes, we'll return a subset of jobs
  return jobs.slice(0, 4).map((job) => ({
    ...job,
    status: job.id === "job-1" ? "active" : job.id === "job-2" ? "draft" : "active",
  }))
}

// Constants for filters
export const jobCategories = [
  { value: "technology", label: "Technology" },
  { value: "marketing", label: "Marketing" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "business", label: "Business" },
  { value: "education", label: "Education" },
  { value: "healthcare", label: "Healthcare" },
  { value: "customer-service", label: "Customer Service" },
]

export const jobTypes = [
  { value: "fulltime", label: "Full-time" },
  { value: "parttime", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
  { value: "temporary", label: "Temporary" },
]

export const experienceLevels = [
  { value: "entry-level", label: "Entry Level" },
  { value: "mid-level", label: "Mid Level" },
  { value: "senior", label: "Senior" },
  { value: "executive", label: "Executive" },
]

export const indianLocations = [
  { value: "bangalore", label: "Bangalore" },
  { value: "mumbai", label: "Mumbai" },
  { value: "delhi", label: "Delhi NCR" },
  { value: "hyderabad", label: "Hyderabad" },
  { value: "chennai", label: "Chennai" },
  { value: "pune", label: "Pune" },
  { value: "gurgaon", label: "Gurgaon" },
  { value: "noida", label: "Noida" },
  { value: "remote", label: "Remote" },
]
