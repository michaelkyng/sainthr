<script setup lang="ts">
import { ArrowUpRight, BadgeCheck, Building2, UsersRound } from "@lucide/vue"

const { heading2, containerWidth, paragraph } = useTailwindConfig()
const { careersUrl } = useAppLinks()

const stats = [
  { icon: UsersRound, value: "12k+", label: "Candidate profiles" },
  { icon: Building2, value: "150+", label: "Company partners" },
  { icon: BadgeCheck, value: "98%", label: "Compliant placements" },
]
</script>

<template>
  <section id="about" class="w-full bg-primary text-primary-foreground">
    <div :class="['grid gap-10 section-pad lg:grid-cols-[0.85fr_1.15fr] lg:items-start', containerWidth]">
      <div>
        <p v-reveal class="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-white/60">About SaintHR</p>
        <h2 v-reveal="80" :class="heading2">A familiar HR partner, rebuilt for job search and hiring</h2>
      </div>
      <div class="flex flex-col gap-8">
        <div class="grid gap-5 md:grid-cols-2">
          <p v-reveal :class="[paragraph, 'text-white/72']">
            At Saint HR, we believe that people are the foundation of every successful
            business. Our mission is to simplify HR processes, attract top talent, and
            create a thriving workplace where both businesses and employees can grow
            together.
          </p>
          <p v-reveal="100" :class="[paragraph, 'text-white/72']">
            That's where we come in — to provide seamless HR solutions that take the stress
            out of hiring, payroll, compliance, employee management, and candidate job discovery.
          </p>
        </div>
        <div class="grid gap-3 sm:grid-cols-3">
          <div
            v-for="(stat, i) in stats"
            :key="stat.label"
            v-reveal="i * 80 + 80"
            class="rounded-xl border border-white/10 bg-white/10 p-5 transition-all duration-300 hover:bg-white/15"
          >
            <component :is="stat.icon" class="mb-4 size-5 text-accent" />
            <p class="font-display text-3xl font-semibold">{{ stat.value }}</p>
            <p class="mt-1 text-sm text-white/65">{{ stat.label }}</p>
          </div>
        </div>
        <BaseButton
          v-reveal="280"
          :to="careersUrl"
          variant="outline"
          class="w-fit border-white/20! bg-white/10! px-6! py-4! text-white! hover:bg-white! hover:text-primary!"
        >
          <span class="text-sm md:text-base">Explore Careers</span>
          <ArrowUpRight class="size-4" />
        </BaseButton>
      </div>
    </div>
  </section>
</template>
