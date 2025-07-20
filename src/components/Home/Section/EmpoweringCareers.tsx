import useTailwindConfig from '@/hooks/useTailwindConfig';
import Section from './Section';
import { ArrowUpRight, Sparkle } from 'lucide-react';
import { Button } from '@/components/custom/button';
import Link from 'next/link';
import Image from 'next/image';

export default function EmpoweringCareers() {
  const { heading2 } = useTailwindConfig();
  const listItems = [
    {
      item: 'Transforming Potential into Success',
    },
    {
      item: 'Creating Opportunities for Growth and Development',
    },
    {
      item: 'Guiding Talent Towards a Brighter Tomorrow',
    }
  ];
  return (
    <Section
      leftGrid={
        <div className='flex flex-col h-full justify-between'>
          <div className="flex flex-col gap-4 pb-12">
            <h1 className={heading2}>
              Empowering carrers and building futures
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
                Join Us
              </Link>
              <ArrowUpRight />
            </Button>
          </div>

          <ul className="flex flex-col gap-4  border-t border-muted-foreground/30 pt-12">
            {listItems.map((list, index) => {
              return (
                <ListItem
                  key={index}
                  item={list.item}
                ></ListItem>
              );
            })}
          </ul>
        </div>
      }
      rightGrid={
        <>
          <div>
            <Image
              className="size-full object-cover"
              src="/empowering.png"
              width="500"
              height="500"
              alt="Section Image"
            />
          </div>
        </>
      }
    />
  );
}

function ListItem({
  item,
}: {
  item: string;
}) {
  return (
    <li className="flex gap-2.5 font-[Clash_Display] text-sm md:text-base lg:text-lg">
      <Sparkle strokeWidth={1} fill='primary'/>
      <span>{item}</span>
    </li>
  );
}
