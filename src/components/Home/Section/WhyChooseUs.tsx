import useTailwindConfig from '@/hooks/useTailwindConfig';
import Section from './Section';
import { ArrowUpRight, CheckCheck } from 'lucide-react';
import { Button } from '@/components/custom/button';
import Link from 'next/link';
import Image from 'next/image';

export default function WhyChooseUs() {
  const { heading2 } = useTailwindConfig();
  const listItems = [
    {
      item: 'Expert HR Professionals',
      description:
        'Our team brings years of experience in human resources management.',
    },
    {
      item: 'Tailored Solutions',
      description:
        'We understand that every business is unique, and we customize our services accordingly.',
    },
    {
      item: 'Tech-Driven Approach',
      description:
        'We leverage the latest HR tools and technology for efficient processes.',
    },
    {
      item: 'Compliance & Risk Management',
      description:
        'We help you stay compliant with local and international labor laws.',
    },
  ];
  return (
    <Section
      leftGrid={
        <>
          <div className="flex flex-col gap-4">
            <h1 className={heading2}>Why Choose US?</h1>
            <ul className="flex flex-col gap-1">
              {listItems.map((list, index) => {
                return (
                  <ListItem
                    key={index}
                    item={list.item}
                    description={list.description}
                  ></ListItem>
                );
              })}
            </ul>
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
        </>
      }
      rightGrid={
        <>
          <div>
            <Image className='size-full object-cover' src='/pricingtable.png' width='500' height='500' alt='Section Image' />
          </div>
        </>
      }
    />
  );
}

function ListItem({
  item,
  description,
}: {
  item: string;
  description: string;
}) {
  return (
    <li className="flex gap-1 ">
      <CheckCheck />
      <span className="text-sm md:text-base">
        <span className="font-semibold">{item} - </span>
        {description}
      </span>
    </li>
  );
}
