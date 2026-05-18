<script setup lang="ts">
import { BriefcaseBusiness } from "@lucide/vue"

defineOptions({ name: "OnboardingLayout" })
</script>

<template>
  <div class="careers-hero-bg app-shell-grid flex min-h-screen flex-col">
    <header class="px-5 py-5 md:px-8">
      <NuxtLink to="/" class="inline-flex items-center gap-2.5 text-ink">
        <span class="grid size-9 place-items-center rounded-full bg-ink text-white">
          <BriefcaseBusiness class="size-4" />
        </span>
        <span class="font-display text-xl font-semibold">SaintHR</span>
      </NuxtLink>
    </header>
    <div class="flex flex-1 items-start justify-center px-5 pb-10 pt-4 md:items-center md:pt-6">
      <slot />
    </div>
  </div>
</template>
