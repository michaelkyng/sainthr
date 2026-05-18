<script setup lang="ts">
import { ArrowUpRight, BriefcaseBusiness, Sparkle } from "@lucide/vue"

const { heading2 } = useTailwindConfig()
const { careersUrl } = useAppLinks()

const listItems = [
  "Create a SaintHR profile once and apply faster",
  "Discover vetted roles from trusted company partners",
  "Track shortlists, interview stages, and hiring updates",
]
</script>

<template>
  <HomeSection>
    <template #left>
      <div class="flex h-full flex-col justify-between">
        <div class="flex flex-col gap-5 pb-10">
          <p v-reveal class="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">Careers app</p>
          <h2 v-reveal="80" :class="heading2">Empowering careers and building futures</h2>
          <p v-reveal="160" class="max-w-xl leading-7 text-muted-foreground">
            The next SaintHR experience gives candidates a home for job search, profiles,
            sign in, applications, and hiring guidance without losing the hands-on care of the old service.
          </p>
          <BaseButton v-reveal="240" :to="careersUrl" variant="outline" class="w-fit px-6! py-4!">
            <span class="text-sm md:text-base">Open Careers</span>
            <ArrowUpRight class="size-4" />
          </BaseButton>
        </div>

        <ul class="flex flex-col gap-3 border-t border-muted-foreground/20 pt-10">
          <li
            v-for="(item, i) in listItems"
            :key="item"
            v-reveal="i * 80 + 300"
            class="flex gap-3 rounded-xl bg-white/70 p-3 font-display text-sm font-medium text-primary shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md md:text-base"
          >
            <Sparkle class="size-5 shrink-0 text-emerald-600" :stroke-width="1.5" />
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>
    </template>

    <template #right>
      <div v-reveal="120" class="relative overflow-hidden rounded-2xl border border-border bg-white p-2 shadow-[0_24px_70px_rgba(16,30,68,0.12)]">
        <img class="size-full rounded-xl object-cover" src="/empowering.png" alt="Career growth support">
        <div class="absolute right-5 top-5 rounded-xl border border-white/60 bg-white/90 p-4 shadow-lg backdrop-blur">
          <div class="flex items-center gap-3">
            <span class="grid size-10 place-items-center rounded-full bg-primary text-white">
              <BriefcaseBusiness class="size-5" />
            </span>
            <div>
              <p class="font-display text-lg font-semibold text-primary">12 new matches</p>
              <p class="text-xs text-muted-foreground">Updated today</p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </HomeSection>
</template>
