export interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  applicants: number;
  status: string;
  posted: string;
  salary: string;
  employer: string;
  description: string;
}

const initial: Job[] = [
  {
    id: 1,
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    applicants: 48,
    status: 'Open',
    posted: 'May 10, 2026',
    salary: '₦600,000 – ₦800,000/mo',
    employer: 'TechNova Ltd',
    description:
      'We are looking for an experienced Senior Frontend Developer to join our growing engineering team. You will work closely with product designers and backend engineers to build high-quality, performant user interfaces using modern web technologies.',
  },
  {
    id: 2,
    title: 'Product Manager',
    department: 'Product',
    location: 'Lagos, NG',
    type: 'Full-time',
    applicants: 31,
    status: 'Open',
    posted: 'May 8, 2026',
    salary: '₦500,000 – ₦700,000/mo',
    employer: 'Meridian Finance',
    description:
      'Drive product strategy and execution for our core financial products. Collaborate with cross-functional teams to define roadmaps, prioritise features, and deliver measurable customer value.',
  },
  {
    id: 3,
    title: 'UX Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Contract',
    applicants: 24,
    status: 'Open',
    posted: 'May 5, 2026',
    salary: '₦350,000/mo',
    employer: 'Horizon Media',
    description:
      'Shape user experiences across our digital products. Conduct user research, create wireframes and prototypes, and collaborate with developers to bring designs to life.',
  },
  {
    id: 4,
    title: 'DevOps Engineer',
    department: 'Engineering',
    location: 'Abuja, NG',
    type: 'Full-time',
    applicants: 17,
    status: 'Draft',
    posted: 'May 3, 2026',
    salary: '₦700,000/mo',
    employer: 'TechNova Ltd',
    description:
      'Build and maintain our cloud infrastructure, CI/CD pipelines, and deployment processes. Experience with AWS, Docker, and Kubernetes required.',
  },
  {
    id: 5,
    title: 'HR Analyst',
    department: 'Human Resources',
    location: 'Lagos, NG',
    type: 'Full-time',
    applicants: 62,
    status: 'Closed',
    posted: 'Apr 20, 2026',
    salary: '₦300,000 – ₦400,000/mo',
    employer: 'Sapphire Health',
    description:
      'Analyse HR data and metrics to support strategic decision-making, workforce planning, and talent retention initiatives across the organisation.',
  },
  {
    id: 6,
    title: 'Data Scientist',
    department: 'Analytics',
    location: 'Remote',
    type: 'Full-time',
    applicants: 39,
    status: 'Open',
    posted: 'Apr 18, 2026',
    salary: '₦650,000/mo',
    employer: 'Greenfield Energy',
    description:
      'Apply advanced analytics and machine learning to extract insights from complex datasets and drive business decisions across the energy sector.',
  },
];

export const useJobs = () => {
  const jobs = useState<Job[]>('jobs', () => structuredClone(initial));

  const addJob = (data: Omit<Job, 'id' | 'applicants' | 'posted'>) => {
    const id = Math.max(0, ...jobs.value.map((j) => j.id)) + 1;
    const posted = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    jobs.value = [...jobs.value, { ...data, id, applicants: 0, posted }];
  };

  const updateJob = (id: number, data: Partial<Omit<Job, 'id'>>) => {
    jobs.value = jobs.value.map((j) => (j.id === id ? { ...j, ...data } : j));
  };

  const deleteJob = (id: number) => {
    jobs.value = jobs.value.filter((j) => j.id !== id);
  };

  return { jobs, addJob, updateJob, deleteJob };
};
