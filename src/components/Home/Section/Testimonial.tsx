'use client';

import { Button } from '@/components/custom/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import useTailwindConfig from '@/hooks/useTailwindConfig';
import { ArrowUpRight, Star } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function Testimonial() {
  const { heading2, containerWidth } = useTailwindConfig();

  const cardItems = [
    {
      image: '/person1.png',
      name: 'Michael Johnson',
      position: 'CEO, Framify',
      review:
        '"Saint HR helped us find the perfect real estate agents for our growing business. Their recruitment process was efficient, and the candidates they provided were not only highly skilled but also a great cultural fit. Thanks to their support, our team is now stronger and more aligned with our company values!"',
      rating: 5,
    },
    {
      image: '/person2.png',
      name: 'John Keneth',
      position: 'CEO, Metropole',
      review:
        '"Saint HR helped us find the perfect real estate agents for our growing business. Their recruitment process was efficient, and the candidates they provided were not only highly skilled but also a great cultural fit. Thanks to their support, our team is now stronger and more aligned with our company values!"',
      rating: 4,
    },
    {
      image: '/person3.png',
      name: 'James Williams',
      position: 'CEO, Doortech',
      review:
        '"Saint HR helped us find the perfect real estate agents for our growing business. Their recruitment process was efficient, and the candidates they provided were not only highly skilled but also a great cultural fit. Thanks to their support, our team is now stronger and more aligned with our company values!"',
      rating: 4,
    },
  ];

  return (
    <div className="w-full bg-secondary/40">
      <div
        className={`flex flex-col gap-20 w-full ${containerWidth} py-25 px-5 md:px-8 lg:px-10`}
      >
        <div className="flex flex-col md:flex-row  justify-between gap-5 md:items-end w-full">
          <h1 className={`${heading2} max-w-lg md:max-w-xl`}>
            Trusted by Over 1500+ Global Companies
          </h1>
          <Button
            variant="outline"
            className="flex w-fit !p-5 md:!p-7 justify-center items-center"
          >
            <Link href="/" className="text-sm md:text-base">
              View All Reviews
            </Link>
            <ArrowUpRight />
          </Button>
        </div>
        <div className="max-w-full">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
          >
            <CarouselContent>
              {cardItems.map((item, index) => {
                return (
                  <CarouselItem key={index}>
                    <Card
                      image={item.image}
                      name={item.name}
                      position={item.position}
                      review={item.review}
                      rating={item.rating}
                    />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
}

function Card({
  image,
  name,
  position,
  review,
  rating,
}: {
  image: string;
  name: string;
  position: string;
  review: string;
  rating: number;
}) {
  return (
    <div className="relative flex flex-col basis-full lg:flex-row gap-10 xl:gap-15 size-full p-5 transition-all duration-300">
      <div className="flex justify-start xl:justify-center items-start xl:items-center">
        <Image
          src={image}
          alt="Card Image"
          width={200}
          height={200}
          className="shrink-0 object-contain h-fit"
        />
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-lg md:text-xl lg:text-2xl font-[Clash_Display] font-medium text-primary/80">
          {review}
        </p>
        <div className="flex gap-1">
          {Array.from({ length: rating }).map((_, index) => (
            <Star className="size-4 fill-primary" key={index} />
          ))}
        </div>
        <div className="flex flex-col gap-1.5 mt-5">
          <h1 className="md:text-lg lg:text-xl font-[Clash_Display] font-medium text-muted-foreground">
            {name}
          </h1>
          <p className="text-sm">{position}</p>
        </div>
      </div>
    </div>
  );
}
