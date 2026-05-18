export type PostedJob = {
  id: string
  title: string
  department: string
  location: string
  locationType: 'remote' | 'hybrid' | 'on-site'
  jobType: 'full-time' | 'part-time' | 'contract'
  salary: string
  description: string
  responsibilities: string[]
  requirements: string[]
  benefits: string[]
  skills: string[]
  status: 'active' | 'draft' | 'closed'
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
  isOnboarded: boolean
  companies: Company[]
  activeCompanyId: string
}

const defaultEmployer = (): Employer => ({
  fullName: '',
  email: '',
  isOnboarded: false,
  companies: [],
  activeCompanyId: '',
})

export const useCompany = () => {
  const employer = useState<Employer>('employer', defaultEmployer)

  const activeCompany = computed(() =>
    employer.value.companies.find(c => c.id === employer.value.activeCompanyId)
    ?? employer.value.companies[0]
    ?? null,
  )

  const companyInitials = computed(() =>
    (activeCompany.value?.name ?? '')
      .split(/\s+/)
      .slice(0, 2)
      .map(w => w[0]?.toUpperCase() ?? '')
      .join('') || '?',
  )

  const activeJobs = computed(() =>
    activeCompany.value?.jobs.filter(j => j.status === 'active') ?? [],
  )

  const totalApplications = computed(() =>
    (activeCompany.value?.jobs ?? []).reduce((sum, j) => sum + j.applications, 0),
  )

  const setActiveCompany = (id: string) => {
    employer.value.activeCompanyId = id
  }

  const addCompany = (data: Omit<Company, 'id' | 'jobs'>, seedJobs: Omit<PostedJob, 'id'>[] = []) => {
    const id = `company-${Date.now()}`
    employer.value.companies.push({
      ...data,
      id,
      jobs: seedJobs.map((j, i) => ({ ...j, id: `seeded-${i}` })),
    })
    employer.value.activeCompanyId = id
    return id
  }

  const addJob = (job: Omit<PostedJob, 'id' | 'postedAt' | 'applications' | 'status'>) => {
    if (!activeCompany.value) return
    activeCompany.value.jobs.unshift({
      ...job,
      id: `job-${Date.now()}`,
      postedAt: new Date().toISOString().split('T')[0]!,
      applications: 0,
      status: 'active',
    })
  }

  const closeJob = (jobId: string) => {
    const job = activeCompany.value?.jobs.find(j => j.id === jobId)
    if (job) job.status = 'closed'
  }

  return {
    employer,
    activeCompany,
    companyInitials,
    activeJobs,
    totalApplications,
    setActiveCompany,
    addCompany,
    addJob,
    closeJob,
  }
}
