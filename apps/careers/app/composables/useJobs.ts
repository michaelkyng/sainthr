export type JobLocationType = 'on-site' | 'hybrid' | 'remote'
export type JobType = 'full-time' | 'contract' | 'part-time'

export type Job = {
  id: string
  title: string
  company: string
  companyDescription: string
  location: string
  locationType: JobLocationType
  type: JobType
  salary: string
  salaryMin: number
  salaryMax: number
  department: string
  description: string
  responsibilities: string[]
  requirements: string[]
  benefits: string[]
  skills: string[]
  postedDaysAgo: number
  featured?: boolean
  matchScore?: number
  accent: string
}

export type SearchFilters = {
  locationType?: string
  jobType?: string
  department?: string
}

const allJobsData: Job[] = [
  {
    id: 'people-operations-lead',
    title: 'People Operations Lead',
    company: 'Northstar Health',
    companyDescription:
      'Northstar Health is a leading healthcare management company improving patient outcomes through operational excellence across 12 facilities in Nigeria.',
    location: 'Lagos',
    locationType: 'hybrid',
    type: 'full-time',
    salary: 'NGN 950k – 1.3m',
    salaryMin: 950000,
    salaryMax: 1300000,
    department: 'HR & People Ops',
    description:
      'We are looking for an experienced People Operations Lead to oversee HR processes, foster a positive work culture, and drive strategic HR initiatives across the organization. You will partner closely with leadership to ensure our people programmes align with business objectives.',
    responsibilities: [
      'Lead end-to-end HR operations including recruitment, onboarding, and offboarding',
      'Develop and implement HR policies aligned with business objectives',
      'Manage performance review cycles and employee development programmes',
      'Partner with leadership to drive organisational effectiveness',
      'Oversee payroll administration and employee benefits programmes',
      'Maintain HR metrics and deliver regular reports to senior management',
    ],
    requirements: [
      "Bachelor's degree in Human Resources, Business Administration, or related field",
      '5+ years of progressive HR experience',
      'Strong knowledge of Nigerian labour law and compliance requirements',
      'Experience with HR information systems (HRIS)',
      'Excellent communication and interpersonal skills',
      'Proven track record managing HR in a fast-paced environment',
    ],
    benefits: [
      'Competitive salary + annual performance bonus',
      'Hybrid work arrangement (3 days in office)',
      'Health insurance for self and dependents',
      '21 days annual leave',
      'Professional development budget',
      'Pension contributions',
    ],
    skills: ['HR Strategy', 'Payroll', 'Compliance', 'HRIS', 'Recruitment'],
    postedDaysAgo: 0,
    featured: true,
    matchScore: 96,
    accent: 'bg-mint text-green',
  },
  {
    id: 'talent-acquisition-partner',
    title: 'Talent Acquisition Partner',
    company: 'CedarPay',
    companyDescription:
      'CedarPay is a fintech company building modern payment infrastructure for African businesses. We process over NGN 2bn in transactions monthly.',
    location: 'Remote',
    locationType: 'remote',
    type: 'contract',
    salary: 'NGN 700k – 900k',
    salaryMin: 700000,
    salaryMax: 900000,
    department: 'Talent Acquisition',
    description:
      'Join CedarPay as a Talent Acquisition Partner and own the full-cycle recruiting process for our growing team. You will build hiring pipelines, improve candidate experience, and partner with hiring managers across engineering, product, and business.',
    responsibilities: [
      'Manage full-cycle recruiting across technical and business roles',
      'Source passive candidates through LinkedIn, communities, and referrals',
      'Conduct initial screening calls and competency-based interviews',
      'Maintain ATS and ensure accurate pipeline data',
      'Partner with hiring managers to refine job requirements and scoring rubrics',
      'Improve time-to-hire metrics through process optimisation',
    ],
    requirements: [
      '3+ years of full-cycle recruiting experience',
      'Experience sourcing for technical roles preferred',
      'Proficiency with an ATS (Lever, Greenhouse, or similar)',
      'Strong written communication for job ads and candidate outreach',
      'Data-driven approach with ability to report on key metrics',
    ],
    benefits: [
      'Fully remote role',
      'Flexible working hours',
      'Monthly contractor fee + performance incentive',
      'Access to CedarPay internal tools and resources',
    ],
    skills: ['Sourcing', 'Interview Design', 'ATS', 'Pipeline Management'],
    postedDaysAgo: 2,
    featured: false,
    matchScore: 91,
    accent: 'bg-[#f8ded8] text-coral',
  },
  {
    id: 'employee-experience-manager',
    title: 'Employee Experience Manager',
    company: 'LayerWorks',
    companyDescription:
      'LayerWorks is a fast-growing B2B SaaS company building workflow automation tools used by over 400 businesses across West Africa.',
    location: 'Abuja',
    locationType: 'hybrid',
    type: 'full-time',
    salary: 'NGN 800k – 1.1m',
    salaryMin: 800000,
    salaryMax: 1100000,
    department: 'HR & People Ops',
    description:
      'LayerWorks is seeking an Employee Experience Manager to design and own programmes that keep our team engaged, informed, and thriving. You will be the culture champion — running surveys, building rituals, and ensuring every employee feels heard.',
    responsibilities: [
      'Design and run quarterly employee engagement surveys',
      'Manage onboarding experience from offer acceptance through 90-day mark',
      'Build internal communication channels and rhythm (all-hands, newsletters)',
      'Own recognition and reward programmes',
      'Collaborate with managers to address engagement blockers proactively',
      'Track and report eNPS and related metrics to the leadership team',
    ],
    requirements: [
      "Bachelor's degree in HR, Psychology, Communications, or related field",
      '4+ years in an HR or employee experience role',
      'Strong project management skills',
      'Experience running surveys with tools like Culture Amp, Lattice, or similar',
      'Empathy-driven communicator with excellent writing skills',
    ],
    benefits: [
      'Hybrid work (2 days in office)',
      'Health and dental insurance',
      'NGN 200k annual L&D stipend',
      '15 days leave + 5 flex days',
      'Team retreats twice a year',
    ],
    skills: ['Engagement', 'Culture', 'Surveys', 'Internal Comms', 'L&D'],
    postedDaysAgo: 4,
    featured: false,
    matchScore: 88,
    accent: 'bg-[#f4e9c8] text-[#8a6421]',
  },
  {
    id: 'senior-payroll-specialist',
    title: 'Senior Payroll Specialist',
    company: 'FinTrack Solutions',
    companyDescription:
      'FinTrack Solutions provides financial management software to over 200 SMEs across Nigeria, helping them manage accounting, payroll, and tax compliance.',
    location: 'Lagos',
    locationType: 'on-site',
    type: 'full-time',
    salary: 'NGN 600k – 850k',
    salaryMin: 600000,
    salaryMax: 850000,
    department: 'Payroll & Finance',
    description:
      'We are looking for a meticulous Senior Payroll Specialist to manage end-to-end payroll for our 180-person team. You will ensure accurate and timely salary processing, PAYE remittance, and statutory compliance.',
    responsibilities: [
      'Process monthly payroll for all employees accurately and on time',
      'Manage PAYE, pension, NHF, and other statutory deductions and remittances',
      'Maintain employee payroll records in the HRIS',
      'Prepare payroll reports and reconciliations for finance and HR leadership',
      'Handle payroll queries from employees with professionalism',
      'Keep current with updates to Nigerian tax and labour legislation',
    ],
    requirements: [
      "Bachelor's degree in Accounting, Finance, or related field",
      '4+ years of payroll processing experience in Nigeria',
      'Deep knowledge of PAYE, pension, and NHF requirements',
      'Proficiency with payroll software (e.g., Sage, Workpay, or similar)',
      'High attention to detail and strong numerical ability',
      'CIPM or ICAN membership is an advantage',
    ],
    benefits: [
      'HMO for self and two dependants',
      'Pension contributions above statutory minimum',
      'Annual leave of 18 working days',
      'Annual salary review',
    ],
    skills: ['Payroll Processing', 'PAYE', 'Statutory Compliance', 'Sage', 'Reconciliation'],
    postedDaysAgo: 7,
    featured: false,
    matchScore: 84,
    accent: 'bg-[#e8eeff] text-[#3b55c4]',
  },
  {
    id: 'hr-compliance-officer',
    title: 'HR Compliance Officer',
    company: 'TerraGroup',
    companyDescription:
      'TerraGroup is a diversified conglomerate with interests in real estate, construction, and hospitality, employing over 1,200 staff across Nigeria.',
    location: 'Port Harcourt',
    locationType: 'hybrid',
    type: 'full-time',
    salary: 'NGN 750k – 950k',
    salaryMin: 750000,
    salaryMax: 950000,
    department: 'HR Compliance',
    description:
      'TerraGroup is seeking an HR Compliance Officer to ensure our people practices align with Nigerian labour law, industry regulations, and internal policies. You will conduct audits, update policies, and advise managers on compliance matters.',
    responsibilities: [
      'Audit HR processes and employee files for compliance with labour law',
      'Review and update employment contracts, handbooks, and policies annually',
      'Advise HR and management on legally compliant disciplinary and grievance procedures',
      'Manage relationships with NSITF, ITF, and other statutory bodies',
      'Track changes in Nigerian labour legislation and communicate impact to the business',
      'Lead compliance training sessions for line managers',
    ],
    requirements: [
      "LLB or Bachelor's degree in HR, Law, or related field",
      '4+ years HR compliance or employment law experience',
      'Deep knowledge of the Labour Act and associated regulations',
      'Experience conducting internal HR audits',
      'CIPM membership is strongly preferred',
    ],
    benefits: [
      'Hybrid arrangement (3 days on-site)',
      'Group life insurance',
      'HMO coverage',
      '21 days annual leave',
      'Study support for CIPM or legal qualifications',
    ],
    skills: ['Labour Law', 'Policy Writing', 'Audits', 'Statutory Compliance', 'CIPM'],
    postedDaysAgo: 5,
    featured: false,
    matchScore: 82,
    accent: 'bg-[#fff3e0] text-[#b35a00]',
  },
  {
    id: 'learning-development-manager',
    title: 'Learning & Development Manager',
    company: 'BrightPath Corp',
    companyDescription:
      'BrightPath Corp is a pan-African professional services firm with 500+ consultants. We invest heavily in our people\'s growth and are known for best-in-class L&D.',
    location: 'Remote',
    locationType: 'remote',
    type: 'full-time',
    salary: 'NGN 900k – 1.2m',
    salaryMin: 900000,
    salaryMax: 1200000,
    department: 'Learning & Development',
    description:
      'BrightPath Corp is looking for a talented L&D Manager to own our learning strategy and ensure every team member has access to programmes that accelerate their career. You will work with senior leaders and external vendors to design impactful learning journeys.',
    responsibilities: [
      'Develop an annual L&D strategy aligned with business growth goals',
      'Design and deliver in-house training programmes (leadership, technical, soft skills)',
      'Manage relationships with external training vendors and certification bodies',
      'Build and administer the LMS (Learning Management System)',
      'Measure the effectiveness of learning interventions through pre/post assessments',
      'Manage the L&D budget and report ROI to the CHRO',
    ],
    requirements: [
      "Bachelor's degree in HR, Education, Psychology, or related field",
      '5+ years in an L&D, training, or organisational development role',
      'Experience building or administering an LMS',
      'Strong instructional design skills',
      'Excellent facilitation and presentation skills',
      'CIPD or equivalent L&D qualification is a plus',
    ],
    benefits: [
      'Fully remote, async-first culture',
      'NGN 500k annual L&D personal budget',
      'Access to premium learning platforms',
      '25 days annual leave',
      'Home office setup stipend',
      'Quarterly retreats across Africa',
    ],
    skills: ['Instructional Design', 'LMS', 'Facilitation', 'Training', 'OD'],
    postedDaysAgo: 1,
    featured: true,
    matchScore: 93,
    accent: 'bg-mint text-green',
  },
  {
    id: 'hr-technology-analyst',
    title: 'HR Technology Analyst',
    company: 'DataSync Nigeria',
    companyDescription:
      'DataSync Nigeria is a technology company helping enterprises modernise their data infrastructure. We are growing fast and building out a world-class people function.',
    location: 'Lagos',
    locationType: 'hybrid',
    type: 'full-time',
    salary: 'NGN 1m – 1.5m',
    salaryMin: 1000000,
    salaryMax: 1500000,
    department: 'HR Technology',
    description:
      'DataSync Nigeria is seeking an HR Technology Analyst to lead the implementation and optimisation of our HR tech stack. You will act as the bridge between People and IT, ensuring our systems are integrated, efficient, and user-friendly.',
    responsibilities: [
      'Own the HRIS roadmap — evaluate, implement, and optimise HR systems',
      'Configure and maintain the HRIS, ATS, and payroll platforms',
      'Collaborate with IT to ensure integrations between HR and business systems',
      'Build dashboards and reports for HR metrics and people analytics',
      'Train HR team members on system usage and best practices',
      'Manage vendor relationships and contracts for HR technology tools',
    ],
    requirements: [
      "Bachelor's degree in Computer Science, HR, or related field",
      '3+ years in an HRIS analyst, HR systems, or people technology role',
      'Hands-on experience with at least one major HRIS (Workday, SAP SuccessFactors, BambooHR, etc.)',
      'Strong SQL or Excel skills for data analysis',
      'Understanding of HR processes and data privacy requirements',
      'Excellent problem-solving and communication skills',
    ],
    benefits: [
      'NGN 1m – 1.5m salary depending on experience',
      'Hybrid work model',
      'Full health coverage',
      'Stock option plan',
      'Professional certifications sponsored',
      '21 days annual leave',
    ],
    skills: ['HRIS', 'People Analytics', 'SQL', 'System Integration', 'Workday'],
    postedDaysAgo: 3,
    featured: true,
    matchScore: 89,
    accent: 'bg-[#e8eeff] text-[#3b55c4]',
  },
  {
    id: 'recruitment-coordinator',
    title: 'Recruitment Coordinator',
    company: 'PeopleBridge',
    companyDescription:
      'PeopleBridge is a specialist HR consulting firm placing mid-to-senior HR professionals across Nigeria and Ghana.',
    location: 'Remote',
    locationType: 'remote',
    type: 'contract',
    salary: 'NGN 500k – 650k',
    salaryMin: 500000,
    salaryMax: 650000,
    department: 'Talent Acquisition',
    description:
      'PeopleBridge is hiring a Recruitment Coordinator to support our consultants with scheduling, candidate communications, and ATS management. This is a great entry point into the HR recruitment industry.',
    responsibilities: [
      'Schedule interviews and coordinate logistics between candidates and hiring managers',
      'Maintain accurate and up-to-date ATS records',
      'Send timely communications to candidates at each stage of the process',
      'Post job advertisements on job boards and social media',
      'Prepare recruitment reports and pipeline summaries weekly',
      'Support consultants with candidate shortlisting research',
    ],
    requirements: [
      "Bachelor's degree in any discipline",
      '1–3 years of administrative or coordination experience',
      'Excellent organisational skills and attention to detail',
      'Proficiency in Microsoft Office and Google Workspace',
      'Strong written and verbal communication',
      'Interest in HR and recruitment is essential',
    ],
    benefits: [
      'Fully remote',
      'Flexible hours',
      'Monthly contractor fee',
      'Mentorship from senior recruiters',
      'Pathway to full-time placement role',
    ],
    skills: ['Coordination', 'ATS', 'Scheduling', 'Communication', 'Admin'],
    postedDaysAgo: 6,
    featured: false,
    matchScore: 78,
    accent: 'bg-[#f8ded8] text-coral',
  },
]

export const useJobs = () => {
  const allJobs = allJobsData

  const getJobById = (id: string): Job | undefined =>
    allJobsData.find((j) => j.id === id)

  const getFeaturedJobs = (): Job[] =>
    allJobsData.filter((j) => j.featured)

  const getRelatedJobs = (currentId: string, department: string): Job[] =>
    allJobsData.filter((j) => j.id !== currentId && j.department === department).slice(0, 3)

  const searchJobs = (query: string, filters: SearchFilters = {}): Job[] =>
    allJobsData.filter((job) => {
      const q = query.toLowerCase()
      const matchesQuery
        = !query
        || job.title.toLowerCase().includes(q)
        || job.company.toLowerCase().includes(q)
        || job.skills.some((s) => s.toLowerCase().includes(q))
        || job.department.toLowerCase().includes(q)

      const matchesLocType = !filters.locationType || job.locationType === filters.locationType
      const matchesJobType = !filters.jobType || job.type === filters.jobType
      const matchesDept = !filters.department || job.department === filters.department

      return matchesQuery && matchesLocType && matchesJobType && matchesDept
    })

  const departments = [
    { id: 'HR & People Ops', label: 'HR & People Ops', count: 2 },
    { id: 'Talent Acquisition', label: 'Talent Acquisition', count: 2 },
    { id: 'Payroll & Finance', label: 'Payroll & Finance', count: 1 },
    { id: 'HR Compliance', label: 'HR Compliance', count: 1 },
    { id: 'Learning & Development', label: 'Learning & Development', count: 1 },
    { id: 'HR Technology', label: 'HR Technology', count: 1 },
  ]

  return { allJobs, getJobById, getFeaturedJobs, getRelatedJobs, searchJobs, departments }
}
