export interface Candidate {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  source: string;
  added: string;
  notes: string;
}

const initial: Candidate[] = [
  {
    id: 1,
    name: 'Jane Doe',
    email: 'jane.doe@email.com',
    phone: '+234 801 234 5678',
    role: 'Senior Designer',
    status: 'Shortlisted',
    source: 'LinkedIn',
    added: 'May 12, 2026',
    notes: 'Strong portfolio. Excellent eye for detail. Recommended by design lead.',
  },
  {
    id: 2,
    name: 'Chris Adeyemi',
    email: 'chris.a@email.com',
    phone: '+234 802 345 6789',
    role: 'DevOps Lead',
    status: 'New',
    source: 'Direct',
    added: 'May 11, 2026',
    notes: '',
  },
  {
    id: 3,
    name: 'Amara Nwosu',
    email: 'amara.n@email.com',
    phone: '+234 803 456 7890',
    role: 'Product Manager',
    status: 'Reviewed',
    source: 'Referral',
    added: 'May 9, 2026',
    notes: 'Referred by Tunde Bakare. 5 years PM experience at fintech startups.',
  },
  {
    id: 4,
    name: 'Tunde Bakare',
    email: 'tunde.b@email.com',
    phone: '+234 804 567 8901',
    role: 'Full Stack Engineer',
    status: 'Interview',
    source: 'LinkedIn',
    added: 'May 7, 2026',
    notes: 'Technical round scheduled for May 20. Strong Node.js and React skills.',
  },
  {
    id: 5,
    name: 'Ngozi Okafor',
    email: 'ngozi.o@email.com',
    phone: '+234 805 678 9012',
    role: 'HR Analyst',
    status: 'Rejected',
    source: 'Careers Page',
    added: 'May 3, 2026',
    notes: 'Did not meet minimum experience requirements.',
  },
  {
    id: 6,
    name: 'Mark Thompson',
    email: 'mark.t@email.com',
    phone: '+44 207 123 4567',
    role: 'Data Scientist',
    status: 'New',
    source: 'Direct',
    added: 'Apr 29, 2026',
    notes: '',
  },
];

export const useCandidates = () => {
  const candidates = useState<Candidate[]>(
    'candidates',
    () => structuredClone(initial),
  );

  const addCandidate = (data: Omit<Candidate, 'id' | 'added'>) => {
    const id = Math.max(0, ...candidates.value.map((c) => c.id)) + 1;
    const added = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
    candidates.value = [...candidates.value, { ...data, id, added }];
  };

  const updateCandidate = (id: number, data: Partial<Omit<Candidate, 'id'>>) => {
    candidates.value = candidates.value.map((c) =>
      c.id === id ? { ...c, ...data } : c,
    );
  };

  const deleteCandidate = (id: number) => {
    candidates.value = candidates.value.filter((c) => c.id !== id);
  };

  return { candidates, addCandidate, updateCandidate, deleteCandidate };
};
