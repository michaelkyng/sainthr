'use client';

import { Button } from '@/components/custom/button';
import useTailwindConfig from '@/hooks/useTailwindConfig';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

const cardItems = [
  {
    title: 'Building a Stronger Team: Real Estate Talent Acquisition',
    industry: 'Real Estate',
    focus: 'Talent Acquisition',
    company: 'Generic HR Solutions Ltd.',
    description:
      'Focused on recruiting top-tier agents, property managers, and administrative staff to support business growth in real estate.',
    services: ['Recruitment', 'Team Building', 'Administrative Support'],
    image: '/images/real-estate-talent.jpg',
  },
  {
    title: 'Building Financial Expertise: Banking & Finance Talent Solutions',
    industry: 'Banking & Finance',
    focus: 'Talent Solutions',
    company: 'Generic HR Solutions Ltd.',
    description:
      'Focused on attracting top talent in the finance sector and offering industry-specific training in financial analysis, compliance, and customer service.',
    services: ['Recruitment', 'Industry Training', 'Compliance'],
    image: '/images/finance-talent.jpg',
  },
  {
    title: 'Caring for Talent: Healthcare Recruitment & Compliance Training',
    industry: 'Healthcare',
    focus: 'Recruitment & Compliance',
    company: 'Generic HR Solutions Ltd.',
    description:
      'Focused on recruiting healthcare professionals and providing essential compliance training to meet industry standards.',
    services: ['Recruitment', 'Compliance Training', 'Staff Development'],
    image: '/images/healthcare-talent.jpg',
  },
  {
    title: 'Tech Talent Surge: IT Recruitment & Skill Development',
    industry: 'Technology & IT',
    focus: 'IT Recruitment & Training',
    company: 'Generic HR Solutions Ltd.',
    description:
      'Focused on recruiting IT professionals and providing skill development programs to keep teams ahead of technological advancements.',
    services: ['IT Recruitment', 'Skill Development', 'Upskilling'],
    image: '/images/it-talent.jpg',
  },
];

export default function Projects() {
  const { heading2, subHeading, containerWidth } = useTailwindConfig();
  const [activeTab, setActiveTab] = React.useState('All');

  const tabs = [
    'All',
    'Real Estate',
    'Banking & Finance',
    'Healthcare',
    'Technology & IT',
  ];

  const [projects, setProjects] = React.useState(cardItems);

  React.useEffect(() => {
    if (activeTab === 'All') {
      setProjects(cardItems);
    } else {
      const filtered = cardItems.filter((p) => p.industry === activeTab);
      setProjects(filtered);
    }
  }, [activeTab]);

  return (
    <div className="w-full bg-secondary/40">
      <div
        className={`flex flex-col gap-20 w-full ${containerWidth} py-25 px-5 md:px-8 lg:px-10`}
      >
        <div className="flex flex-col md:flex-row  justify-between gap-5 md:items-end w-full">
          <h1 className={`${heading2} max-w-lg md:max-w-xl`}>
            Businesses We&apos;ve Empowered by Delivering Tailored HR Solutions
          </h1>
          <Button
            variant="outline"
            className="flex w-fit !p-5 md:!p-7 justify-center items-center"
          >
            <Link href="/" className="text-sm md:text-base">
              Join Us
            </Link>
            <ArrowUpRight />
          </Button>
        </div>
        <div className="max-w-full">
          <div className="flex gap-25 w-full">
            <div className="flex flex-col">
              {tabs.map((item) => (
                <button
                  key={item}
                  className={`text-start pl-2 py-3 transition-all duration-300 ${subHeading} ${activeTab === item ? 'text-primary border-l-4 border-primary' : 'text-muted-foreground/40 border-l-4 border-muted-foreground/20'}`}
                  onClick={() => setActiveTab(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-[repeat(5,_200px)] gap-5">
              {projects.map((project,idx) => (
                <div key={project.title} className={`flex flex-col gap-2.5 bg-red-300 ${(idx === 1 || idx === 2) ? 'md:row-span-2' : 'md:row-span-1'}`}>
                  <h2 className={`${heading2}`}>{project.title}</h2>
                  <p className={`${subHeading}`}>{project.industry}</p>
                  <p className={`${subHeading}`}>{project.focus}</p>
                  <p className={`${subHeading}`}>{project.company}</p>
                  <p className={`${subHeading}`}>{project.description}</p>
                  <p className={`${subHeading}`}>{project.services}</p>
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={500}
                    height={500}
                    className={`${(idx === 1 || idx === 2) ? 'max-h-[450px]' : 'max-h-[250px]'} `}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
