import { defineStore } from "pinia"

export type PostedJob = {
  id: string
  title: string
  department: string
  location: string
  locationType: "remote" | "hybrid" | "on-site"
  jobType: "full-time" | "part-time" | "contract"
  salary: string
  description: string
  responsibilities: string[]
  requirements: string[]
  benefits: string[]
  skills: string[]
  status: "active" | "draft" | "closed"
  postedAt: string
  applications: number
}

export type Company = {
  id: string
  name: string
  industry: string
  size: string
  location: string
  website: string
  description: string
  jobs: PostedJob[]
}

export type Employer = {
  fullName: string
  email: string
  companies: Company[]
  activeCompanyId: string
}

export type EmployerSettings = {
  notifications: {
    newApplicants: boolean
    applicantStatusChanges: boolean
    weeklyDigest: boolean
    productNews: boolean
  }
  hiring: {
    autoCloseAfterDays: number
    showSalaryByDefault: boolean
    allowCandidateMessages: boolean
  }
  preferences: {
    digestFrequency: "daily" | "weekly" | "never"
    defaultJobLocationType: "remote" | "hybrid" | "on-site"
  }
}

const defaultEmployer = (): Employer => ({
  fullName: "",
  email: "",
  companies: [],
  activeCompanyId: "",
})

const defaultEmployerSettings = (): EmployerSettings => ({
  notifications: {
    newApplicants: true,
    applicantStatusChanges: true,
    weeklyDigest: true,
    productNews: false,
  },
  hiring: {
    autoCloseAfterDays: 30,
    showSalaryByDefault: true,
    allowCandidateMessages: true,
  },
  preferences: {
    digestFrequency: "weekly",
    defaultJobLocationType: "hybrid",
  },
})

export const useEmployerStore = defineStore("employer", () => {
  const employer = ref<Employer>(defaultEmployer())
  const settings = ref<EmployerSettings>(defaultEmployerSettings())
  const { email, fullName, role } = useSharedAuth()

  watchEffect(() => {
    if (role.value !== "employer") return
    if (!employer.value.fullName && fullName.value) employer.value.fullName = fullName.value
    if (!employer.value.email && email.value) employer.value.email = email.value
  })

  const activeCompany = computed(() =>
    employer.value.companies.find(c => c.id === employer.value.activeCompanyId)
    ?? employer.value.companies[0]
    ?? null,
  )

  const companyInitials = computed(() =>
    (activeCompany.value?.name ?? "")
      .split(/\s+/)
      .slice(0, 2)
      .map(w => w[0]?.toUpperCase() ?? "")
      .join("") || "?",
  )

  const activeJobs = computed(() =>
    activeCompany.value?.jobs.filter(j => j.status === "active") ?? [],
  )

  const totalApplications = computed(() =>
    (activeCompany.value?.jobs ?? []).reduce((sum, j) => sum + j.applications, 0),
  )

  const setActiveCompany = (id: string) => {
    employer.value.activeCompanyId = id
  }

  const addCompany = (
    data: Omit<Company, "id" | "jobs">,
    seedJobs: Omit<PostedJob, "id">[] = [],
  ) => {
    const id = `company-${Date.now()}`
    employer.value.companies.push({
      ...data,
      id,
      jobs: seedJobs.map((j, i) => ({ ...j, id: `seeded-${i}` })),
    })
    employer.value.activeCompanyId = id
    return id
  }

  const addJob = (
    job: Omit<PostedJob, "id" | "postedAt" | "applications" | "status">,
  ) => {
    if (!activeCompany.value) return
    activeCompany.value.jobs.unshift({
      ...job,
      id: `job-${Date.now()}`,
      postedAt: new Date().toISOString().split("T")[0]!,
      applications: 0,
      status: "active",
    })
  }

  const closeJob = (jobId: string) => {
    const job = activeCompany.value?.jobs.find(j => j.id === jobId)
    if (job) job.status = "closed"
  }

  const reopenJob = (jobId: string) => {
    const job = activeCompany.value?.jobs.find(j => j.id === jobId)
    if (job) job.status = "active"
  }

  const updateCompany = (
    id: string,
    updates: Partial<Omit<Company, "id" | "jobs">>,
  ) => {
    const company = employer.value.companies.find(c => c.id === id)
    if (!company) return
    Object.assign(company, updates)
  }

  return {
    employer,
    settings,
    activeCompany,
    companyInitials,
    activeJobs,
    totalApplications,
    setActiveCompany,
    addCompany,
    addJob,
    closeJob,
    reopenJob,
    updateCompany,
  }
}, {
  persist: {
    key: "sainthr-careers:employer",
    pick: ["employer", "settings"],
  },
})
