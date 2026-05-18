<script setup lang="ts">
import { MapPin, Search } from "@lucide/vue"

defineOptions({ name: "CareersHomePage" })
definePageMeta({ layout: "home" })

useHead({ title: "SaintHR Careers – Find HR Jobs" })

const searchQuery = ref("")
const searchLocation = ref("")
const router = useRouter()

const handleSearch = () => {
  const params = new URLSearchParams()
  if (searchQuery.value) params.set("q", searchQuery.value)
  if (searchLocation.value) params.set("location", searchLocation.value)
  router.push(`/jobs${params.toString() ? "?" + params.toString() : ""}`)
}

const popularSearches = ["HR Manager", "Remote", "Payroll", "Recruitment", "Compliance"]
</script>

<template>
  <section class="careers-hero-bg flex min-h-[calc(100vh-80px)] items-center justify-center px-5 pb-20 pt-10 text-center lg:px-8">
    <div class="mx-auto w-full max-w-3xl">
      <div class="c-anim-1 mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-panel/80 px-4 py-2 text-sm font-semibold text-muted shadow-sm backdrop-blur">
        <span class="size-1.5 rounded-full bg-green" />
        Trusted by 150+ employers across Nigeria
      </div>

      <h1 class="c-anim-2 font-display text-5xl font-semibold leading-[1.1] text-ink md:text-6xl lg:text-7xl">
        Find the right role,<br>
        <span class="text-green">right now.</span>
      </h1>

      <p class="c-anim-3 mx-auto mt-5 max-w-xl text-base leading-7 text-muted md:text-lg">
        Explore vetted HR and people-ops opportunities from SaintHR's trusted employer network.
      </p>

      <!-- Search bar -->
      <div class="c-anim-4 mx-auto mt-8 flex max-w-2xl overflow-hidden rounded-full border border-line bg-panel p-1.5 shadow-[0_8px_40px_rgba(16,30,68,0.12)]">
        <div class="flex flex-1 items-center gap-3 px-4 py-2.5">
          <Search class="size-4 shrink-0 text-muted" />
          <input
            v-model="searchQuery"
            class="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted"
            placeholder="Job title or keywords"
            type="search"
            @keyup.enter="handleSearch"
          >
        </div>
        <div class="my-1.5 w-px bg-line" />
        <div class="hidden flex-1 items-center gap-3 px-4 py-2.5 sm:flex">
          <MapPin class="size-4 shrink-0 text-muted" />
          <input
            v-model="searchLocation"
            class="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted"
            placeholder="Lagos, Remote, Abuja..."
            type="text"
            @keyup.enter="handleSearch"
          >
        </div>
        <button
          class="flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-ink-2 sm:px-6"
          type="button"
          @click="handleSearch"
        >
          <Search class="size-4" />
          <span class="hidden sm:inline">Search Jobs</span>
        </button>
      </div>

      <!-- Popular searches -->
      <div class="c-anim-5 mt-5 flex flex-wrap items-center justify-center gap-2">
        <span class="text-xs font-semibold text-muted">Popular:</span>
        <button
          v-for="term in popularSearches"
          :key="term"
          class="rounded-full border border-line bg-panel/80 px-3.5 py-1.5 text-xs font-semibold text-muted transition-all duration-200 hover:border-ink/30 hover:bg-paper hover:text-ink"
          type="button"
          @click="() => { searchQuery = term; handleSearch() }"
        >
          {{ term }}
        </button>
      </div>
    </div>
  </section>
</template>
