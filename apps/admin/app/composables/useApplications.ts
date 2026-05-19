export interface Application {
  id: number;
  candidate: string;
  job: string;
  department: string;
  stage: string;
  date: string;
  score: number;
  notes: string;
}

const initial: Application[] = [
  {
    id: 1,
    candidate: 'Jane Doe',
    job: 'Senior Designer',
    department: 'Design',
    stage: 'Interview',
    date: 'May 12, 2026',
    score: 87,
    notes: 'Strong creative portfolio. Technical skills align well with requirements.',
  },
  {
    id: 2,
    candidate: 'Chris Adeyemi',
    job: 'DevOps Lead',
    department: 'Engineering',
    stage: 'Review',
    date: 'May 11, 2026',
    score: 72,
    notes: 'Good cloud experience. Needs clarification on Kubernetes background.',
  },
  {
    id: 3,
    candidate: 'Amara Nwosu',
    job: 'Product Manager',
    department: 'Product',
    stage: 'Offer',
    date: 'May 9, 2026',
    score: 91,
    notes: 'Exceptional candidate. Offer letter being prepared.',
  },
  {
    id: 4,
    candidate: 'Tunde Bakare',
    job: 'Full Stack Engineer',
    department: 'Engineering',
    stage: 'New',
    date: 'May 7, 2026',
    score: 65,
    notes: '',
  },
  {
    id: 5,
    candidate: 'Ngozi Okafor',
    job: 'HR Analyst',
    department: 'Human Resources',
    stage: 'Rejected',
    date: 'May 3, 2026',
    score: 45,
    notes: 'Insufficient experience for the level required.',
  },
  {
    id: 6,
    candidate: 'Mark Thompson',
    job: 'Data Scientist',
    department: 'Analytics',
    stage: 'Hired',
    date: 'Apr 29, 2026',
    score: 94,
    notes: 'Outstanding candidate. Offer accepted. Starting June 2.',
  },
  {
    id: 7,
    candidate: 'Fatima Lawal',
    job: 'UX Designer',
    department: 'Design',
    stage: 'New',
    date: 'May 14, 2026',
    score: 78,
    notes: '',
  },
];

export const useApplications = () => {
  const applications = useState<Application[]>(
    'applications',
    () => structuredClone(initial),
  );

  const addApplication = (data: Omit<Application, 'id' | 'date'>) => {
    const id = Math.max(0, ...applications.value.map((a) => a.id)) + 1;
    const date = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    applications.value = [...applications.value, { ...data, id, date }];
  };

  const updateApplication = (
    id: number,
    data: Partial<Omit<Application, 'id'>>,
  ) => {
    applications.value = applications.value.map((a) =>
      a.id === id ? { ...a, ...data } : a,
    );
  };

  const deleteApplication = (id: number) => {
    applications.value = applications.value.filter((a) => a.id !== id);
  };

  return { applications, addApplication, updateApplication, deleteApplication };
};
