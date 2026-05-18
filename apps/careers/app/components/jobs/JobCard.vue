<script setup lang="ts">
import { ArrowUpRight, Building2, Clock3, MapPin } from "@lucide/vue"
import type { Job } from "~/composables/useJobs"

withDefaults(
  defineProps<{
    job: Job
    variant?: "default" | "featured"
  }>(),
  {
    variant: "default",
  },
)
</script>

<template>
  <article
    :class="[
      'group flex flex-col gap-4 rounded-2xl border border-line bg-panel p-5 transition-all duration-300 hover:-translate-y-1 hover:border-ink/20 hover:shadow-[0_20px_60px_rgba(16,30,68,0.1)]',
      variant === 'featured' ? 'p-6' : 'p-5',
    ]"
  >
    <div class="flex items-start justify-between gap-3">
      <div class="flex size-12 items-center justify-center rounded-xl bg-paper text-ink">
        <Building2 class="size-5" />
      </div>
      <span
        v-if="job.matchScore"
        :class="['rounded-full px-3 py-1 text-xs font-semibold', job.accent]"
      >
        {{ job.matchScore }}% match
      </span>
    </div>

    <div class="flex flex-col gap-1">
      <h3 :class="['font-display font-semibold text-ink transition-colors group-hover:text-green', variant === 'featured' ? 'text-xl' : 'text-lg']">
        {{ job.title }}
      </h3>
      <p class="text-sm text-muted">{{ job.company }}</p>
    </div>

    <div class="flex flex-wrap items-center gap-3 text-xs text-muted">
      <span class="flex items-center gap-1.5">
        <MapPin class="size-3.5" />
        {{ job.location }}
      </span>
      <span class="flex items-center gap-1.5">
        <Clock3 class="size-3.5" />
        {{ job.type }}
      </span>
      <span
        :class="[
          'rounded-full px-2 py-0.5 text-xs font-semibold capitalize',
          job.locationType === 'remote' ? 'bg-mint text-green' : job.locationType === 'hybrid' ? 'bg-[#e8eeff] text-[#3b55c4]' : 'bg-paper text-muted',
        ]"
      >
        {{ job.locationType }}
      </span>
    </div>

    <div class="flex flex-wrap gap-1.5">
      <span
        v-for="skill in job.skills.slice(0, 3)"
        :key="skill"
        class="rounded-full border border-line bg-paper px-2.5 py-1 text-xs font-medium text-muted"
      >
        {{ skill }}
      </span>
    </div>

    <div class="mt-auto flex items-center justify-between border-t border-line pt-4">
      <div>
        <p class="font-display text-base font-semibold text-ink">{{ job.salary }}</p>
        <p class="text-xs text-muted">{{ job.postedDaysAgo === 0 ? "Today" : `${job.postedDaysAgo}d ago` }}</p>
      </div>
      <NuxtLink
        :to="`/jobs/${job.id}`"
        class="flex items-center gap-1.5 rounded-full bg-paper px-4 py-2 text-xs font-semibold text-ink transition-all duration-200 hover:bg-ink hover:text-white"
      >
        View role
        <ArrowUpRight class="size-3.5" />
      </NuxtLink>
    </div>
  </article>
</template>
