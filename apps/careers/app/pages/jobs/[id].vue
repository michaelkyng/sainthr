<script setup lang="ts">
import {
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  BookmarkPlus,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Share2,
  Wallet,
} from "@lucide/vue"

defineOptions({ name: "CareersJobDetailPage" })

const route = useRoute()
const { getJobById, getRelatedJobs } = useJobs()

const job = computed(() => getJobById(route.params.id as string))
const relatedJobs = computed(() =>
  job.value ? getRelatedJobs(job.value.id, job.value.department) : [],
)

const saved = ref(false)
const applied = ref(false)

useHead(() => ({
  title: job.value ? `${job.value.title} at ${job.value.company} – SaintHR Careers` : "Job Not Found",
}))
</script>

<template>
  <div>
    <div v-if="!job" class="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <p class="font-display text-2xl font-semibold text-ink">Job not found</p>
      <p class="text-muted">This role may have been filled or removed.</p>
      <NuxtLink
        to="/jobs"
        class="flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-ink-2"
      >
        <ArrowLeft class="size-4" /> Back to jobs
      </NuxtLink>
    </div>

    <div v-else>
      <!-- Breadcrumb -->
      <div class="border-b border-line bg-panel">
        <div class="mx-auto flex max-w-6xl items-center gap-2 px-5 py-4 text-sm text-muted lg:px-8">
          <NuxtLink to="/jobs" class="flex items-center gap-1.5 font-semibold transition hover:text-ink">
            <ArrowLeft class="size-3.5" /> Jobs
          </NuxtLink>
          <span>/</span>
          <span class="text-muted/70">{{ job.department }}</span>
          <span>/</span>
          <span class="font-semibold text-ink">{{ job.title }}</span>
        </div>
      </div>

      <!-- Job header -->
      <div class="bg-panel">
        <div class="mx-auto max-w-6xl px-5 py-10 lg:px-8">
          <div class="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div class="flex flex-col gap-4">
              <div class="flex items-center gap-3">
                <div class="flex size-16 items-center justify-center rounded-2xl border border-line bg-paper text-ink">
                  <Building2 class="size-7" />
                </div>
                <div>
                  <p class="text-sm font-semibold text-muted">{{ job.company }}</p>
                  <span v-if="job.matchScore" :class="['mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold', job.accent]">
                    {{ job.matchScore }}% profile match
                  </span>
                </div>
              </div>

              <h1 class="font-display text-3xl font-semibold text-ink md:text-4xl lg:text-5xl">
                {{ job.title }}
              </h1>

              <div class="flex flex-wrap items-center gap-4 text-sm text-muted">
                <span class="flex items-center gap-1.5">
                  <MapPin class="size-4" /> {{ job.location }}
                </span>
                <span class="flex items-center gap-1.5">
                  <Clock3 class="size-4" /> {{ job.type }}
                </span>
                <span class="flex items-center gap-1.5">
                  <Wallet class="size-4" /> {{ job.salary }}
                </span>
                <span class="flex items-center gap-1.5">
                  <CalendarDays class="size-4" />
                  {{ job.postedDaysAgo === 0 ? "Posted today" : `Posted ${job.postedDaysAgo}d ago` }}
                </span>
                <span
                  :class="[
                    'rounded-full px-3 py-1 text-xs font-semibold capitalize',
                    job.locationType === 'remote' ? 'bg-mint text-green' : job.locationType === 'hybrid' ? 'bg-[#e8eeff] text-[#3b55c4]' : 'bg-paper text-muted',
                  ]"
                >
                  {{ job.locationType }}
                </span>
              </div>

              <div class="flex flex-wrap gap-1.5">
                <span
                  v-for="skill in job.skills"
                  :key="skill"
                  class="rounded-full border border-line bg-paper px-3 py-1 text-xs font-semibold text-muted"
                >
                  {{ skill }}
                </span>
              </div>
            </div>

            <!-- Action buttons (desktop) -->
            <div class="hidden flex-col gap-3 lg:flex lg:min-w-52">
              <button
                :class="[
                  'flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-200',
                  applied ? 'bg-green text-white' : 'bg-ink text-white hover:bg-ink-2',
                ]"
                type="button"
                @click="applied = true"
              >
                <CheckCircle2 v-if="applied" class="size-4" />
                <ArrowUpRight v-else class="size-4" />
                {{ applied ? "Applied!" : "Apply now" }}
              </button>
              <button
                :class="[
                  'flex w-full items-center justify-center gap-2 rounded-full border px-6 py-3.5 text-sm font-semibold transition-all duration-200',
                  saved ? 'border-green bg-mint text-green' : 'border-line bg-paper text-muted hover:border-ink/30 hover:text-ink',
                ]"
                type="button"
                @click="saved = !saved"
              >
                <BookmarkPlus class="size-4" />
                {{ saved ? "Saved" : "Save job" }}
              </button>
              <button
                class="flex w-full items-center justify-center gap-2 rounded-full border border-line bg-paper px-6 py-3 text-sm font-semibold text-muted transition-all duration-200 hover:border-ink/30 hover:text-ink"
                type="button"
              >
                <Share2 class="size-4" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Main content -->
      <div class="mx-auto max-w-6xl px-5 py-10 lg:px-8">
        <div class="grid gap-8 lg:grid-cols-[1fr_340px]">
          <!-- Left: job details -->
          <div class="flex flex-col gap-10">
            <section>
              <h2 class="mb-4 font-display text-xl font-semibold text-ink">About the role</h2>
              <p class="leading-7 text-muted">{{ job.description }}</p>
            </section>

            <section>
              <h2 class="mb-4 font-display text-xl font-semibold text-ink">Responsibilities</h2>
              <ul class="flex flex-col gap-3">
                <li
                  v-for="item in job.responsibilities"
                  :key="item"
                  class="flex items-start gap-3 text-sm leading-6 text-muted"
                >
                  <CheckCircle2 class="mt-0.5 size-4 shrink-0 text-green" />
                  {{ item }}
                </li>
              </ul>
            </section>

            <section>
              <h2 class="mb-4 font-display text-xl font-semibold text-ink">Requirements</h2>
              <ul class="flex flex-col gap-3">
                <li
                  v-for="item in job.requirements"
                  :key="item"
                  class="flex items-start gap-3 text-sm leading-6 text-muted"
                >
                  <BadgeCheck class="mt-0.5 size-4 shrink-0 text-[#3b55c4]" />
                  {{ item }}
                </li>
              </ul>
            </section>

            <section>
              <h2 class="mb-4 font-display text-xl font-semibold text-ink">Benefits</h2>
              <div class="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                <div
                  v-for="benefit in job.benefits"
                  :key="benefit"
                  class="flex items-start gap-3 rounded-xl border border-line bg-panel p-4"
                >
                  <span class="mt-0.5 size-1.5 shrink-0 rounded-full bg-green" />
                  <p class="text-sm leading-6 text-muted">{{ benefit }}</p>
                </div>
              </div>
            </section>

            <section class="rounded-2xl border border-line bg-panel p-6">
              <h2 class="mb-3 font-display text-xl font-semibold text-ink">About {{ job.company }}</h2>
              <p class="text-sm leading-7 text-muted">{{ job.companyDescription }}</p>
            </section>
          </div>

          <!-- Right: sticky sidebar -->
          <div class="flex flex-col gap-4 lg:sticky lg:top-24 lg:h-fit">
            <div class="rounded-2xl border border-line bg-panel p-6">
              <h3 class="mb-4 font-display text-lg font-semibold text-ink">Job overview</h3>
              <ul class="flex flex-col gap-3 text-sm">
                <li class="flex items-center justify-between gap-4 border-b border-line pb-3">
                  <span class="text-muted">Salary</span>
                  <span class="font-semibold text-ink">{{ job.salary }}</span>
                </li>
                <li class="flex items-center justify-between gap-4 border-b border-line pb-3">
                  <span class="text-muted">Location</span>
                  <span class="font-semibold text-ink">{{ job.location }}</span>
                </li>
                <li class="flex items-center justify-between gap-4 border-b border-line pb-3">
                  <span class="text-muted">Work type</span>
                  <span class="font-semibold capitalize text-ink">{{ job.locationType }}</span>
                </li>
                <li class="flex items-center justify-between gap-4 border-b border-line pb-3">
                  <span class="text-muted">Employment</span>
                  <span class="font-semibold capitalize text-ink">{{ job.type }}</span>
                </li>
                <li class="flex items-center justify-between gap-4">
                  <span class="text-muted">Department</span>
                  <span class="font-semibold text-ink">{{ job.department }}</span>
                </li>
              </ul>

              <div class="mt-5 flex flex-col gap-2.5">
                <button
                  :class="[
                    'flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-200',
                    applied ? 'bg-green text-white' : 'bg-ink text-white hover:bg-ink-2',
                  ]"
                  type="button"
                  @click="applied = true"
                >
                  <CheckCircle2 v-if="applied" class="size-4" />
                  <ArrowUpRight v-else class="size-4" />
                  {{ applied ? "Application sent!" : "Apply now" }}
                </button>
                <button
                  :class="[
                    'flex w-full items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition-all duration-200',
                    saved ? 'border-green bg-mint text-green' : 'border-line bg-paper text-muted hover:border-ink/30 hover:text-ink',
                  ]"
                  type="button"
                  @click="saved = !saved"
                >
                  <BookmarkPlus class="size-4" />
                  {{ saved ? "Saved" : "Save job" }}
                </button>
              </div>
            </div>

            <div class="rounded-2xl border border-line bg-mint/40 p-5 text-sm">
              <p class="font-semibold text-green">Vetted by SaintHR</p>
              <p class="mt-1 leading-6 text-muted">All roles on SaintHR are screened by our HR team for quality, compliance, and authenticity.</p>
            </div>
          </div>
        </div>

        <!-- Related jobs -->
        <div v-if="relatedJobs.length" class="mt-16">
          <h2 class="mb-6 font-display text-2xl font-semibold text-ink">Similar roles</h2>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <JobsJobCard v-for="relJob in relatedJobs" :key="relJob.id" :job="relJob" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
