<script setup lang="ts">
import { ArrowUpRight, CheckCheck } from "@lucide/vue"

const { heading2 } = useTailwindConfig()
const { careersUrl } = useAppLinks()

const listItems = [
  {
    item: "Expert HR Professionals",
    description: "Our team brings years of experience in human resources management.",
  },
  {
    item: "Tailored Solutions",
    description: "We understand that every business is unique, and we customize our services accordingly.",
  },
  {
    item: "Tech-Driven Approach",
    description: "We leverage the latest HR tools and technology for efficient processes.",
  },
  {
    item: "Compliance & Risk Management",
    description: "We help you stay compliant with local and international labor laws.",
  },
]
</script>

<template>
  <HomeSection>
    <template #left>
      <div class="flex flex-col gap-6">
        <p v-reveal class="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">Why SaintHR</p>
        <h2 v-reveal="80" :class="heading2">People operations with a sharper digital edge</h2>
        <ul class="grid gap-3">
          <li
            v-for="(list, i) in listItems"
            :key="list.item"
            v-reveal="i * 80 + 120"
            class="flex gap-3 rounded-xl border border-border bg-white/80 p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
          >
            <span class="grid size-9 shrink-0 place-items-center rounded-full bg-accent text-primary">
              <CheckCheck class="size-4" />
            </span>
            <span class="text-sm leading-6 md:text-base">
              <span class="font-semibold">{{ list.item }} — </span>
              {{ list.description }}
            </span>
          </li>
        </ul>
        <BaseButton v-reveal="360" :to="careersUrl" variant="outline" class="w-fit px-6! py-4!">
          <span class="text-sm md:text-base">Partner With Us</span>
          <ArrowUpRight class="size-4" />
        </BaseButton>
      </div>
    </template>

    <template #right>
      <div v-reveal="160" class="relative overflow-hidden rounded-2xl border border-border bg-white p-2 shadow-[0_24px_70px_rgba(16,30,68,0.12)]">
        <img class="size-full rounded-xl object-cover" src="/pricingtable.png" alt="SaintHR planning dashboard">
        <div class="absolute bottom-5 left-5 rounded-xl border border-white/70 bg-white/90 p-4 shadow-lg backdrop-blur">
          <p class="font-display text-3xl font-semibold text-primary">4.9/5</p>
          <p class="text-sm text-muted-foreground">Client satisfaction across HR support</p>
        </div>
      </div>
    </template>
  </HomeSection>
</template>
