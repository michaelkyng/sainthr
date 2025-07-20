import useTailwindConfig from '@/hooks/useTailwindConfig';
import { Bricolage_Grotesque } from 'next/font/google';
import Section from './Section';
import { ArrowUpRight, Bolt, ChartLine, CircleArrowUp } from 'lucide-react';
import { Button } from '@/components/custom/button';
import Link from 'next/link';
import Image from 'next/image';

const bricolageGrotesque = Bricolage_Grotesque({
    variable: '--font-bricolage-grotesque',
    subsets: ['latin'],
  });

export default function RecruitmentSolutions() {
  const { heading2 } = useTailwindConfig();
  const listItems = [
    {
      icon: Bolt,
      title: 'Customized Talent Sourcing',
      description:
        'We tailor our recruitment process to find candidates who match your needs and company culture.',
    },
    {
      icon: ChartLine,
      title: 'Streamlined Hiring Process',
      description:
        'We manage the entire recruitment lifecycle, helping you attract top talent quickly and efficiently.',
    },
  ];
  return (
    <Section
      inverse
      rightGrid={
        <div className="flex flex-col h-full justify-between">
          <div className="flex flex-col gap-4 pb-12">
            <h1 className={heading2}>
              Recruitment Solutions tailored to your needs
            </h1>
            <p className="text-muted-foreground">
              Our mission is to create a global movement of compassion, uniting
              individuals and organizations.
            </p>

            <Button
              variant={'outline'}
              className="flex w-fit !p-5 md:!p-7 justify-center items-center"
            >
              <Link href="/" className="text-sm md:text-base">
                Partner With Us
              </Link>
              <ArrowUpRight />
            </Button>
          </div>

          <ul className="flex flex-col gap-5  border-t border-muted-foreground/30 pt-12">
            {listItems.map((list, index) => {
              return (
                <ListItem
                  key={index}
                  title={list.title}
                  description={list.description}
                  icon={list.icon}
                ></ListItem>
              );
            })}
          </ul>
        </div>
      }
      leftGrid={
        <>
          <div className='relative'>
            <Image
              className="size-full object-cover"
              src="/recruitment.png"
              width="500"
              height="500"
              alt="Section Image"
            />
            <div className={`absolute  flex flex-col gap-2.5 bottom-5 left-5 size-fit bg-white text-[#333] p-6 ${bricolageGrotesque.className} rounded-2xl z-10`}>
              <p className='text-5xl font-medium'>99%+</p>
              <p className='text-base max-w-36'>Quick Talent Acquisition</p>
              <p className='flex items-center gap-1 text-xs text-green-500 font-medium'>+56%<CircleArrowUp className='fill-green-500 text-white size-4' /></p>
            </div>
          </div>
        </>
      }
    />
  );
}

function ListItem({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
}) {
  const { subHeading, paragraph } = useTailwindConfig();
  return (
    <li className="flex gap-2.5 font-[Clash_Display] text-sm md:text-base lg:text-lg">
      <Icon className="shrink-0 size-6 md:size-8 lg:size-10" strokeWidth={1.5} />
      <div className="flex flex-col gap-2.5">
        <h2 className={`${subHeading}`}>{title}</h2>
        <p className={`${paragraph}`}>{description}</p>
      </div>
    </li>
  );
}
