<script setup lang="ts">
import { ArrowUpRight, BriefcaseBusiness, MapPin, Search, ShieldCheck, Sparkles } from "@lucide/vue"

defineOptions({
  name: "HomeHeroSection",
})

const { containerWidth } = useTailwindConfig()
const { careersUrl } = useAppLinks()

const jobStats = [
  { label: "Open roles", value: "420+" },
  { label: "Vetted companies", value: "150+" },
  { label: "Avg. shortlist", value: "48h" },
]
</script>

<template>
  <section
    class="relative flex min-h-screen w-full items-center overflow-hidden bg-cover bg-center pt-24"
    style="background-image: url('/Hero.png')"
  >
    <div :class="[containerWidth, 'relative z-10 grid gap-10 px-5 py-16 md:px-8 lg:grid-cols-[1.1fr_0.62fr] lg:items-center lg:px-10']">
      <div class="flex max-w-4xl flex-col gap-6 text-white">
        <div class="hero-badge flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
          <Sparkles class="size-3.5 text-accent" />
          <span class="font-display">Unlock the Power of People</span>
        </div>

        <h1 class="hero-title font-display text-6xl font-semibold leading-none md:text-8xl lg:text-[7rem]">
          <span class="gradient-text">Saint</span>HR
        </h1>

        <p class="hero-subtitle max-w-2xl font-display text-xl font-medium leading-[1.35] text-white/90 md:text-3xl">
          Smarter HR, real job access, and a hiring experience that still feels human.
        </p>

        <p class="hero-desc max-w-xl text-base leading-7 text-white/65 md:text-lg">
          Search roles, create a candidate profile, or hire vetted professionals through SaintHR's trusted platform.
        </p>

        <div class="hero-cta flex flex-col gap-3 sm:flex-row">
          <BaseButton :to="careersUrl" class="w-fit px-6! py-4!">
            <Search class="size-4" />
            Search jobs
          </BaseButton>
          <BaseButton
            :to="careersUrl"
            variant="outline"
            class="w-fit border-white/35! bg-white/15! px-6! py-4! text-white! hover:bg-white! hover:text-primary!"
          >
            Hire talent
            <ArrowUpRight class="size-4" />
          </BaseButton>
        </div>
      </div>

      <div class="hero-card rounded-2xl border border-white/20 bg-white/92 p-5 shadow-[0_32px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl">
        <div class="flex items-center justify-between border-b border-border pb-4">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Career hub</p>
            <h2 class="font-display text-xl font-semibold text-primary">Find your next role</h2>
          </div>
          <span class="grid size-10 place-items-center rounded-full bg-accent text-primary">
            <BriefcaseBusiness class="size-5" />
          </span>
        </div>

        <div class="mt-4 grid gap-2.5">
          <label class="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-white px-4 py-3 transition-colors hover:border-primary/30">
            <Search class="size-4 shrink-0 text-muted-foreground" />
            <span class="text-sm text-muted-foreground">Product designer, HR analyst, payroll...</span>
          </label>
          <label class="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-white px-4 py-3 transition-colors hover:border-primary/30">
            <MapPin class="size-4 shrink-0 text-muted-foreground" />
            <span class="text-sm text-muted-foreground">Lagos, Remote, Hybrid</span>
          </label>
          <BaseButton :to="careersUrl" class="py-3!">
            Explore careers
          </BaseButton>
        </div>

        <div class="mt-4 grid grid-cols-3 gap-2">
          <div
            v-for="stat in jobStats"
            :key="stat.label"
            class="rounded-xl bg-secondary/80 p-3"
          >
            <p class="font-display text-xl font-semibold text-primary">{{ stat.value }}</p>
            <p class="mt-0.5 text-xs text-muted-foreground">{{ stat.label }}</p>
          </div>
        </div>

        <p class="mt-4 flex items-center gap-2 text-xs font-medium text-primary">
          <ShieldCheck class="size-4 shrink-0 text-primary/60" />
          Profiles, jobs, and employer matching in one place.
        </p>
      </div>
    </div>

    <div class="absolute inset-0 bg-[linear-gradient(110deg,rgba(16,30,68,0.93)_0%,rgba(16,30,68,0.75)_45%,rgba(16,30,68,0.28)_100%)]" />
  </section>
</template>
