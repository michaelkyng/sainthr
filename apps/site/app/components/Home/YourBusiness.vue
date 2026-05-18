<script setup lang="ts">
import {
  ArrowUpRight,
  BarChart3,
  Gavel,
  GraduationCap,
  Network,
  UserPlus,
  Wallet,
} from "@lucide/vue"
import type { Component } from "vue"

const { heading2, containerWidth } = useTailwindConfig()
const { careersUrl } = useAppLinks()

const cardItems: Array<{
  icon: Component
  title: string
  description: string
}> = [
  {
    icon: UserPlus,
    title: "Recruitment & Talent Acquisition",
    description:
      "We help businesses find and hire top talent by managing the entire recruitment process, from job postings and candidate screening to interviews and onboarding.",
  },
  {
    icon: Wallet,
    title: "Payroll & Benefits Administration",
    description:
      "Managing payroll and employee benefits can be complex, but we simplify it by ensuring accurate payroll processing, tax compliance, and benefits administration.",
  },
  {
    icon: Gavel,
    title: "HR Compliance & Legal Advisory",
    description:
      "We assist with employee contracts, workplace policies, and regulatory compliance, reducing legal risk and ensuring a safe, structured work environment.",
  },
  {
    icon: GraduationCap,
    title: "Employee Training & Development",
    description:
      "We provide customized training programs to enhance employee skills, improve productivity, and foster leadership development.",
  },
  {
    icon: BarChart3,
    title: "Performance & Employee Engagement",
    description:
      "We implement performance management strategies and engagement programs that help businesses build a positive and high-performing culture.",
  },
  {
    icon: Network,
    title: "HR Technology & Automation",
    description:
      "We integrate modern HR technology into your business, automating payroll, performance tracking, and employee data management for greater efficiency.",
  },
]
</script>

<template>
  <section id="services" :class="['flex w-full flex-col gap-14 section-pad', containerWidth]">
    <div class="flex w-full flex-col justify-between gap-5 md:flex-row md:items-end">
      <div class="max-w-2xl">
        <p v-reveal class="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">For companies</p>
        <h2 v-reveal="80" :class="heading2">
          Your business, your people, one modern HR workspace
        </h2>
      </div>
      <BaseButton v-reveal="160" :to="careersUrl" variant="outline" class="w-fit px-6! py-4!">
        <span class="text-sm md:text-base">View All Services</span>
        <ArrowUpRight class="size-4" />
      </BaseButton>
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      <article
        v-for="(item, i) in cardItems"
        :key="item.title"
        v-reveal="i * 80"
        class="group flex h-full flex-col gap-5 rounded-2xl border border-border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_22px_60px_rgba(16,30,68,0.12)]"
      >
        <span class="grid size-11 place-items-center rounded-xl bg-secondary text-primary transition-all duration-300 group-hover:bg-accent">
          <component :is="item.icon" class="size-5" />
        </span>
        <div class="flex flex-col gap-2">
          <h3 class="font-display text-lg font-semibold text-primary md:text-xl">{{ item.title }}</h3>
          <p class="text-sm leading-7 text-muted-foreground">{{ item.description }}</p>
        </div>
      </article>
    </div>
  </section>
</template>
