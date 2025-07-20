import useTailwindConfig from '@/hooks/useTailwindConfig';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/custom/button';

export default function AboutSaintHR() {
  const { heading2, containerWidth, paragraph } = useTailwindConfig();
  return (
    <div className="bg-secondary/30 w-full">
        <div className={`flex flex-col gap-8 py-25 px-5 md:px-8 lg:px-10 ${containerWidth}`}>
          <div>
            <h1 className={heading2}>About SaintHR</h1>
          </div>
          <div className="flex flex-col md:flex-row gap-2.5 md:gap-16">
            <div>
              <p className={paragraph}>
                At Saint HR, we believe that people are the foundation of every
                successful business. Our mission is to simplify HR processes,
                attract top talent, and create a thriving workplace where both
                businesses and employees can grow together.
              </p>
            </div>
            <div>
              <p className={paragraph}>
                That&apos;s where we come in—to provide seamless HR solutions that take
                the stress out of hiring, payroll, compliance, and employee
                management, allowing you to focus on growing your business with
                confidence.
              </p>
              <Button variant={'link'} className='flex w-fit mt-5 !py-1 !px-0 justify-center items-center text-secondary-foreground'>
                <Link href="/" className="text-sm md:text-base">
                  Learn More
                </Link>
                <ArrowUpRight />
              </Button>
            </div>
          </div>
        </div>
    </div>
  );
}
