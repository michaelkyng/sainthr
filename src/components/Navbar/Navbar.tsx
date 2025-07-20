'use client';
import { useState } from 'react';
import { X, Menu } from 'lucide-react';
import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Button } from '@/components/custom/button';

import { routes } from '@/utils/routes';
import { AnimatePresence, motion } from "motion/react";
import MobileNav from './MobileNav';

export function Navbar() {
  const [menuToggled, setMenuToggled] = useState(false);
  return (
    <div className="fixed top-0 z-50 w-screen bg-white">
      <div className="relative max-w-7xl flex justify-between align-center py-5 px-2.5  mx-auto w-full">
        <Image src="/next.svg" width={80} height={80} alt="Logo" />
        <NavigationMenu className="hidden md:flex" viewport={false}>
          <NavigationMenuList>
            {routes.map((route) => {
              if (route.style === 3 && route.path) {
                return (
                  <NavigationMenuItem key={route.title}>
                    <NavigationMenuLink
                      asChild
                      className={navigationMenuTriggerStyle()}
                    >
                      <Link href={route.path}>{route.title}</Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              }
              return (
                <NavigationMenuItem key={route.title}>
                  <NavigationMenuTrigger>{route.title}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul
                      className={`grid gap-2 md:w-[400px] lg:w-[500px]  ${route.style === 2 ? 'lg:grid-cols-[1fr]' : 'lg:grid-cols-[.75fr_1fr]'}`}
                    >
                      {/* Only for style === 1, show that extra static card */}
                      {route.style === 1 && (
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <Link
                              className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                              href="/"
                            >
                              <div className="mt-4 mb-2 text-lg font-medium">
                                shadcn/ui
                              </div>
                              <p className="text-muted-foreground text-sm leading-tight">
                                Beautifully designed components built with
                                Tailwind CSS.
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      )}
                      {route.subItems?.map((sub) => (
                        <NavigationMenuLink
                          asChild
                          key={sub.title}
                          title={sub.title}
                        >
                          <Link href={sub.path ?? '#'}>
                            <div className="font-medium">{sub.title}</div>
                            <div className="text-muted-foreground">
                              {sub.title}
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
        <div className='hidden md:flex justify-center items-center gap-x-2'>
          <Button variant={'outline'}>
            <Link href="/">Get Hired</Link>
          </Button>
      
          <Button>
            <Link href="/">Hire Talent</Link>
          </Button>
        </div>
      
        {/* Mobile Navigation */}
        <div className="flex justify-center items-center md:hidden z-10">
          <AnimatePresence mode="wait">
            {!menuToggled ? (
              <motion.button
                key="menu-button"
                initial={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setMenuToggled(true)}
                className="size-fit p-2.5 cursor-pointer"
              >
                <Menu className="w-6 h-6 text-primary  m-auto" />
              </motion.button>
            ) : (
              <motion.button
                key="x-button"
                initial={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setMenuToggled(false)}
                className="size-fit p-2.5 cursor-pointer"
              >
                <X className="w-6 h-6 text-primary  m-auto" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        <MobileNav menuToggled = {menuToggled} />
      </div>
    </div>
  );
}
