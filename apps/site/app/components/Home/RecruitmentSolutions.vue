<script setup lang="ts">
import { ArrowUpRight, Bolt, ChartLine, CircleArrowUp } from "@lucide/vue"
import type { Component } from "vue"

const { heading2, subHeading, paragraph } = useTailwindConfig()
const { careersUrl } = useAppLinks()

const listItems: Array<{
  icon: Component
  title: string
  description: string
}> = [
  {
    icon: Bolt,
    title: "Customized Talent Sourcing",
    description:
      "We tailor our recruitment process to find candidates who match your needs and company culture.",
  },
  {
    icon: ChartLine,
    title: "Streamlined Hiring Process",
    description:
      "We manage the entire recruitment lifecycle, helping you attract top talent quickly and efficiently.",
  },
]
</script>

<template>
  <HomeSection inverse>
    <template #left>
      <div v-reveal class="relative overflow-hidden rounded-2xl border border-border bg-white p-2 shadow-[0_24px_70px_rgba(16,30,68,0.12)]">
        <img class="size-full rounded-xl object-cover" src="/recruitment.png" alt="Recruitment interview">
        <div class="absolute bottom-5 left-5 z-10 flex size-fit flex-col gap-2.5 rounded-xl bg-white/92 p-5 font-display text-primary shadow-xl backdrop-blur">
          <p class="text-5xl font-semibold">99%+</p>
          <p class="max-w-40 text-base">Quick talent acquisition</p>
          <p class="flex items-center gap-1 text-xs font-medium text-green-500">
            +56%
            <CircleArrowUp class="size-4 fill-green-500 text-white" />
          </p>
        </div>
      </div>
    </template>

    <template #right>
      <div class="flex h-full flex-col justify-between">
        <div class="flex flex-col gap-5 pb-10">
          <p v-reveal class="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">Recruitment</p>
          <h2 v-reveal="80" :class="heading2">Recruitment Solutions tailored to your needs</h2>
          <p v-reveal="160" class="leading-7 text-muted-foreground">
            Build a hiring pipeline from job post to signed offer. SaintHR keeps the advisory feel companies already know, then layers in better sourcing, screening, and candidate visibility.
          </p>
          <BaseButton v-reveal="240" :to="careersUrl" variant="outline" class="w-fit px-6! py-4!">
            <span class="text-sm md:text-base">Partner With Us</span>
            <ArrowUpRight class="size-4" />
          </BaseButton>
        </div>

        <ul class="flex flex-col gap-4 border-t border-muted-foreground/20 pt-10">
          <li
            v-for="(list, i) in listItems"
            :key="list.title"
            v-reveal="i * 100 + 320"
            class="flex gap-3 rounded-xl bg-white/70 p-4 font-display text-sm shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md md:text-base"
          >
            <span class="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-primary">
              <component :is="list.icon" class="size-5" :stroke-width="1.5" />
            </span>
            <div class="flex flex-col gap-2">
              <h3 :class="subHeading">{{ list.title }}</h3>
              <p :class="paragraph">{{ list.description }}</p>
            </div>
          </li>
        </ul>
      </div>
    </template>
  </HomeSection>
</template>
