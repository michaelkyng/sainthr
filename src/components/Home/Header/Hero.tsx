import useTailwindConfig from '@/hooks/useTailwindConfig';
import React from 'react';
import { Button } from '@/components/custom/button';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function Hero() {
  const { containerWidth, heading1 } = useTailwindConfig();
  return (
    <>
      <div
        className="relative flex items-center w-full min-h-[90vh] bg-cover"
        style={{ backgroundImage: "url('/Hero.png')" }}
      >
        <div className={`${containerWidth} p-2.5 md:p-5 z-10`}>
          <div className="flex flex-col gap-4 max-w-4xl bg-white/10 border border-white/40 rounded-3xl backdrop-blur-sm py-5 md:py-8  lg:py-8 px-5 md:px-8 lg:px-10 w-full">
            <h1 className={`${heading1} text-white leading-[1.4]`}>
              Unlock the Power of People with Smarter HR Solutions
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-white font-[Clash_Display] tracking-wider">
              Your business deserves an HR partner that goes beyond paperwork.
              We streamline your HR processes, attract top talent, and empower
              your workforce—so you can focus on what truly matters: growth
            </p>
            <Button className='flex w-fit !p-5 md:!p-7 justify-center items-center'>
              <Link href="/" className='text-sm md:text-base'>Join Us</Link>
              <ArrowUpRight/>
            </Button>
          </div>
        </div>
        <div className="absolute top-0 left-0 size-full bg-cover bg-gradient-to-bl from-0% from-[rgba(34,40,49,0)] to-100% to-[rgb(43,32,36)]"></div>
      </div>
    </>
  );
}
