export interface Employer {
  id: number;
  name: string;
  industry: string;
  contact: string;
  email: string;
  website: string;
  phone: string;
  address: string;
  jobs: number;
  status: string;
  description: string;
}

const initial: Employer[] = [
  {
    id: 1,
    name: 'TechNova Ltd',
    industry: 'Technology',
    contact: 'Akin Olatunde',
    email: 'akin@technova.io',
    website: 'technova.io',
    phone: '+234 701 234 5678',
    address: 'Victoria Island, Lagos, Nigeria',
    jobs: 8,
    status: 'Active',
    description:
      'TechNova is a leading technology company building software solutions for enterprise clients across West Africa.',
  },
  {
    id: 2,
    name: 'Greenfield Energy',
    industry: 'Energy',
    contact: 'Bola Adegoke',
    email: 'bola@greenfield.ng',
    website: 'greenfield.ng',
    phone: '+234 702 345 6789',
    address: 'Lekki, Lagos, Nigeria',
    jobs: 3,
    status: 'Active',
    description:
      'Greenfield Energy specialises in renewable energy projects across the continent with a focus on solar and wind.',
  },
  {
    id: 3,
    name: 'Meridian Finance',
    industry: 'Finance',
    contact: 'Emeka Eze',
    email: 'emeka@meridian.com',
    website: 'meridian.com',
    phone: '+234 703 456 7890',
    address: 'Wuse 2, Abuja, Nigeria',
    jobs: 5,
    status: 'Active',
    description:
      'Meridian Finance provides investment management, retail banking, and fintech products to customers in Nigeria and Ghana.',
  },
  {
    id: 4,
    name: 'Sapphire Health',
    industry: 'Healthcare',
    contact: 'Chidinma Obi',
    email: 'chidinma@sapphire.ng',
    website: 'sapphire.ng',
    phone: '+234 704 567 8901',
    address: 'GRA Enugu, Nigeria',
    jobs: 2,
    status: 'Inactive',
    description:
      'Sapphire Health operates a network of diagnostic centres and specialist clinics across south-eastern Nigeria.',
  },
  {
    id: 5,
    name: 'Horizon Media',
    industry: 'Media & Comms',
    contact: 'Tosin Alade',
    email: 'tosin@horizonmedia.co',
    website: 'horizonmedia.co',
    phone: '+234 705 678 9012',
    address: 'Ikeja, Lagos, Nigeria',
    jobs: 6,
    status: 'Active',
    description:
      'Horizon Media is a full-service media and communications agency delivering content, PR, and digital marketing.',
  },
  {
    id: 6,
    name: 'BuildRight Corp',
    industry: 'Construction',
    contact: 'Seun Falola',
    email: 'seun@buildright.ng',
    website: 'buildright.ng',
    phone: '+234 706 789 0123',
    address: 'Ibadan, Oyo State, Nigeria',
    jobs: 0,
    status: 'Inactive',
    description:
      'BuildRight Corp is a mid-sized construction and civil engineering firm operating across the South-West region.',
  },
];

export const useEmployers = () => {
  const employers = useState<Employer[]>(
    'employers',
    () => structuredClone(initial),
  );

  const addEmployer = (data: Omit<Employer, 'id' | 'jobs'>) => {
    const id = Math.max(0, ...employers.value.map((e) => e.id)) + 1;
    employers.value = [...employers.value, { ...data, id, jobs: 0 }];
  };

  const updateEmployer = (id: number, data: Partial<Omit<Employer, 'id'>>) => {
    employers.value = employers.value.map((e) =>
      e.id === id ? { ...e, ...data } : e,
    );
  };

  const deleteEmployer = (id: number) => {
    employers.value = employers.value.filter((e) => e.id !== id);
  };

  return { employers, addEmployer, updateEmployer, deleteEmployer };
};
