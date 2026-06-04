<script setup lang="ts">
import { ArrowUpRight, MapPin, Search, X } from "@lucide/vue"

defineOptions({ name: "CareersJobsPage" })

useHead({ title: "Browse Jobs – SaintHR Careers" })

const route = useRoute()
const router = useRouter()
const { searchJobs } = useJobs()

const searchQuery = ref((route.query.q as string) || "")
const searchLocation = ref((route.query.location as string) || "")

const filteredJobs = computed(() => searchJobs(searchQuery.value))

const handleSearch = () => {
  const params: Record<string, string> = {}
  if (searchQuery.value) params.q = searchQuery.value
  if (searchLocation.value) params.location = searchLocation.value
  router.replace({ path: "/jobs", query: params })
}

const clearQuery = () => {
  searchQuery.value = ""
  handleSearch()
}
</script>

<template>
  <div>
    <!-- Search bar -->
    <div class="border-b border-line bg-panel">
      <div class="mx-auto max-w-4xl px-5 py-8 lg:px-8">
        <h1 class="mb-5 font-display text-2xl font-semibold text-ink">
          Browse Jobs
        </h1>
        <div class="flex overflow-hidden rounded-full border border-line bg-paper shadow-[0_4px_20px_rgba(16,30,68,0.08)]">
          <div class="flex flex-1 items-center gap-3 px-5 py-3.5">
            <Search class="size-4 shrink-0 text-muted" />
            <input
              v-model="searchQuery"
              class="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted"
              placeholder="Job title, skills, or company..."
              type="search"
              @keyup.enter="handleSearch"
            >
            <button v-if="searchQuery" class="text-muted transition hover:text-ink" type="button" @click="clearQuery">
              <X class="size-4" />
            </button>
          </div>
          <div class="my-2 w-px bg-line" />
          <div class="hidden flex-1 items-center gap-3 px-5 py-3.5 sm:flex">
            <MapPin class="size-4 shrink-0 text-muted" />
            <input
              v-model="searchLocation"
              class="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted"
              placeholder="Location or Remote..."
              type="text"
              @keyup.enter="handleSearch"
            >
          </div>
          <UiButton class="m-1.5 px-6" @click="handleSearch">
            Search
          </UiButton>
        </div>
      </div>
    </div>

    <!-- Results -->
    <div class="mx-auto max-w-4xl px-5 py-8 lg:px-8">
      <p class="mb-5 text-sm text-muted">
        <span class="font-display text-xl font-semibold text-ink">{{ filteredJobs.length }}</span>
        &nbsp;{{ filteredJobs.length === 1 ? "role" : "roles" }} found
        <span v-if="searchQuery"> for "<span class="font-semibold text-ink">{{ searchQuery }}</span>"</span>
      </p>

      <!-- Empty state -->
      <div v-if="filteredJobs.length === 0" class="flex flex-col items-center gap-4 py-20 text-center">
        <div class="flex size-16 items-center justify-center rounded-2xl bg-paper text-muted">
          <Search class="size-7" />
        </div>
        <div>
          <p class="font-display text-xl font-semibold text-ink">
            No roles found
          </p>
          <p class="mt-1 text-sm text-muted">
            Try different keywords or browse all jobs
          </p>
        </div>
        <UiButton class="px-5" @click="clearQuery">
          Browse all jobs
        </UiButton>
      </div>

      <!-- Job list -->
      <div v-else class="flex flex-col gap-3">
        <NuxtLink
          v-for="(job, i) in filteredJobs"
          :key="job.id"
          v-reveal="i * 40"
          :to="`/jobs/${job.id}`"
          class="group flex flex-col gap-4 rounded-2xl border border-line bg-panel p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-[0_12px_40px_rgba(16,30,68,0.08)] md:flex-row md:items-center md:justify-between"
        >
          <div class="flex items-start gap-4">
            <div class="flex size-12 shrink-0 items-center justify-center rounded-xl bg-paper font-display text-lg font-semibold text-ink">
              {{ job.company[0] }}
            </div>
            <div>
              <div class="flex flex-wrap items-center gap-2">
                <h3 class="font-display text-lg font-semibold text-ink transition-colors group-hover:text-green">
                  {{ job.title }}
                </h3>
                <UiBadge v-if="job.matchScore" :class="`px-2.5 py-0.5 ${job.accent}`">
                  {{ job.matchScore }}% match
                </UiBadge>
              </div>
              <p class="mt-0.5 text-sm text-muted">
                {{ job.company }} · {{ job.location }} · {{ job.type }}
              </p>
              <div class="mt-2 flex flex-wrap gap-1.5">
                <UiBadge
                  v-for="skill in job.skills.slice(0, 3)"
                  :key="skill"
                  variant="outline"
                  class="bg-paper px-2.5 py-0.5 font-medium"
                >
                  {{ skill }}
                </UiBadge>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between gap-6 md:flex-col md:items-end md:justify-center">
            <div class="text-right">
              <p class="font-display font-semibold text-ink">
                {{ job.salary }}
              </p>
              <p class="mt-0.5 text-xs capitalize text-muted">
                {{ job.locationType }} · {{ job.postedDaysAgo === 0 ? "Today" : `${job.postedDaysAgo}d ago` }}
              </p>
            </div>
            <span class="flex items-center gap-1.5 rounded-full bg-paper px-4 py-2 text-xs font-semibold text-ink transition-all group-hover:bg-ink group-hover:text-white">
              View role <ArrowUpRight class="size-3.5" />
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
