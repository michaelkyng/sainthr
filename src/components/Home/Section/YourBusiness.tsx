'use client'

import { Button } from '@/components/custom/button'
import useTailwindConfig from '@/hooks/useTailwindConfig'
import {
  ArrowUpRight,
  Gavel,
  BarChart3,
  GraduationCap,
  Network,
  UserPlus,
  Wallet,
  LucideProps
} from 'lucide-react'
import Link from 'next/link'
import { ForwardRefExoticComponent, RefAttributes } from 'react'

export default function YourBusiness() {
  const { heading2, containerWidth } = useTailwindConfig()

  const icons: Record<
    string,
    ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
  > = {
    'user-plus': UserPlus,
    'wallet': Wallet,
    'gavel': Gavel,
    'graduation-cap': GraduationCap,
    'bar-chart-3': BarChart3,
    'network': Network
  }

  const cardItems = [
    {
      icon: icons['user-plus'],
      title: 'Recruitment & Talent Acquisition',
      description:
        'We help businesses find and hire top talent by managing the entire recruitment process, from job postings and candidate screening to interviews and onboarding. Our goal is to connect you with professionals who fit your company culture and drive growth.'
    },
    {
      icon: icons['wallet'],
      title: 'Payroll & Benefits Administration',
      description:
        'Managing payroll and employee benefits can be complex, but we simplify it by ensuring accurate payroll processing, tax compliance, and benefits administration. Our system guarantees that your employees are paid on time while keeping your business legally compliant.'
    },
    {
      icon: icons['gavel'],
      title: 'HR Compliance & Legal Advisory',
      description:
        'Staying compliant with labor laws is crucial for every business. We assist with employee contracts, workplace policies, and regulatory compliance, reducing the risk of legal issues and ensuring a safe and structured work environment.'
    },
    {
      icon: icons['graduation-cap'],
      title: 'Employee Training & Development',
      description:
        'We provide customized training programs to enhance employee skills, improve productivity, and foster leadership development. Our learning solutions help businesses create a workforce that is engaged, efficient, and ready to grow.'
    },
    {
      icon: icons['bar-chart-3'],
      title: 'Performance & Employee Engagement',
      description:
        'A motivated workforce leads to higher productivity and better outcomes. We implement performance management strategies, conduct employee engagement programs, and develop recognition systems that help businesses create a positive and inspiring work culture.'
    },
    {
      icon: icons['network'],
      title: 'HR Technology & Automation',
      description:
        'We integrate modern HR technology into your business operations, automating payroll, performance tracking, and employee data management. Our digital solutions streamline processes and improve efficiency, allowing you to focus on strategic growth.'
    }
  ]

  return (
    <div className={`flex flex-col gap-20 w-full ${containerWidth} py-25 px-5 md:px-8 lg:px-10`}>
      <div className="flex flex-col md:flex-row  justify-between gap-5 md:items-end w-full">
        <h1 className={`${heading2} max-w-lg md:max-w-xl`}>
          Your Business, Your People, Our Priority
        </h1>
        <Button
          variant="outline"
          className="flex w-fit !p-5 md:!p-7 justify-center items-center"
        >
          <Link href="/" className="text-sm md:text-base">
            View All Services
          </Link>
          <ArrowUpRight />
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {cardItems.map((item, index) => {
          const Icon = item.icon
          return (
            <Card
              key={index}
              icon={Icon}
              title={item.title}
              description={item.description}
            />
          )
        })}
      </div>
    </div>
  )
}

function Card({
  icon: Icon,
  title,
  description
}: {
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
  title: string
  description: string
}) {
  return (
    <div className="flex flex-col gap-7 size-fit p-5 bg-secondary/40 border border-secondary/60 rounded-2xl h-full hover:shadow-md transition-all duration-300">
      <Icon className="size-10" />
      <div className="flex flex-col gap-2.5">
        <h1 className="text-lg md:text-xl lg:text-2xl font-semibold">{title}</h1>
        <p className="text-sm md:text-base text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
