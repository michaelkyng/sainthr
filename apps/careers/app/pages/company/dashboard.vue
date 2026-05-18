<script setup lang="ts">
import { ArrowUpRight, BriefcaseBusiness, MapPin, Plus, TrendingUp, Users } from "@lucide/vue"

defineOptions({ name: "CompanyDashboard" })
definePageMeta({ layout: "company" })

useHead({ title: "Dashboard – SaintHR Employers" })

const { employer, activeCompany, companyInitials, activeJobs, totalApplications, closeJob } = useCompany()

const STATUS_COLORS: Record<string, string> = {
  active: "bg-mint text-green",
  draft: "bg-[#fff3e0] text-[#b35a00]",
  closed: "bg-line text-muted",
}

const LOCATION_COLORS: Record<string, string> = {
  remote: "bg-mint text-green",
  hybrid: "bg-[#e8eeff] text-[#3b55c4]",
  "on-site": "bg-paper text-muted",
}

const avgApplications = computed(() => {
  const jobs = activeCompany.value?.jobs ?? []
  if (!jobs.length) return 0
  return Math.round(jobs.reduce((s, j) => s + j.applications, 0) / jobs.length)
})
</script>

<template>
  <div class="mx-auto max-w-6xl px-5 py-10 lg:px-8">
    <!-- Page header -->
    <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 class="font-display text-2xl font-semibold text-ink">
          {{ activeCompany?.name ?? "Dashboard" }}
        </h1>
        <p class="mt-1 text-sm text-muted">
          {{ activeCompany?.industry }}
          <template v-if="activeCompany?.industry && activeCompany?.location"> · </template>
          {{ activeCompany?.location }}
          <template v-if="activeCompany?.size"> · {{ activeCompany.size }} employees</template>
        </p>
      </div>
      <NuxtLink
        to="/company/jobs/post"
        class="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-ink-2"
      >
        <Plus class="size-4" /> Post a job
      </NuxtLink>
    </div>

    <!-- Stats -->
    <div class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div class="flex items-center gap-4 rounded-2xl border border-line bg-panel p-6">
        <div class="flex size-12 shrink-0 items-center justify-center rounded-xl bg-mint text-green">
          <BriefcaseBusiness class="size-5" />
        </div>
        <div>
          <p class="text-xs font-semibold uppercase tracking-widest text-muted/70">Active jobs</p>
          <p class="mt-1 font-display text-3xl font-semibold text-ink">{{ activeJobs.length }}</p>
        </div>
      </div>
      <div class="flex items-center gap-4 rounded-2xl border border-line bg-panel p-6">
        <div class="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#e8eeff] text-[#3b55c4]">
          <Users class="size-5" />
        </div>
        <div>
          <p class="text-xs font-semibold uppercase tracking-widest text-muted/70">Applications</p>
          <p class="mt-1 font-display text-3xl font-semibold text-ink">{{ totalApplications }}</p>
        </div>
      </div>
      <div class="flex items-center gap-4 rounded-2xl border border-line bg-panel p-6">
        <div class="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#fff3e0] text-[#b35a00]">
          <TrendingUp class="size-5" />
        </div>
        <div>
          <p class="text-xs font-semibold uppercase tracking-widest text-muted/70">Avg. per role</p>
          <p class="mt-1 font-display text-3xl font-semibold text-ink">{{ avgApplications }}</p>
        </div>
      </div>
    </div>

    <!-- All companies summary (if >1 company) -->
    <div v-if="employer.companies.length > 1" class="mb-6 rounded-2xl border border-line bg-panel p-5">
      <p class="mb-3 text-xs font-semibold uppercase tracking-widest text-muted/60">All companies</p>
      <div class="flex flex-wrap gap-3">
        <div
          v-for="c in employer.companies"
          :key="c.id"
          class="flex items-center gap-2.5 rounded-xl border border-line bg-paper px-4 py-2.5"
        >
          <div class="flex size-7 shrink-0 items-center justify-center rounded-lg bg-ink font-display text-[10px] font-bold text-white">
            {{ c.name.split(/\s+/).slice(0, 2).map(w => w[0]?.toUpperCase()).join('') }}
          </div>
          <div>
            <p class="text-sm font-semibold text-ink">{{ c.name }}</p>
            <p class="text-xs text-muted">{{ c.jobs.filter(j => j.status === 'active').length }} active · {{ c.jobs.reduce((s, j) => s + j.applications, 0) }} applicants</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Jobs list -->
    <div class="overflow-hidden rounded-2xl border border-line bg-panel">
      <div class="flex items-center justify-between border-b border-line px-6 py-4">
        <h2 class="font-display text-lg font-semibold text-ink">Job postings</h2>
        <span class="text-xs font-semibold text-muted">{{ activeCompany?.jobs.length ?? 0 }} total</span>
      </div>

      <!-- Empty state -->
      <div v-if="!activeCompany?.jobs.length" class="flex flex-col items-center gap-4 py-20 text-center">
        <div class="flex size-16 items-center justify-center rounded-2xl bg-paper text-muted">
          <BriefcaseBusiness class="size-7" />
        </div>
        <div>
          <p class="font-display text-xl font-semibold text-ink">No jobs posted yet</p>
          <p class="mt-1 text-sm text-muted">Post your first role and start receiving applications.</p>
        </div>
        <NuxtLink
          to="/company/jobs/post"
          class="flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-ink-2"
        >
          <Plus class="size-4" /> Post a job
        </NuxtLink>
      </div>

      <!-- Job rows -->
      <div v-else class="divide-y divide-line">
        <div
          v-for="job in activeCompany!.jobs"
          :key="job.id"
          class="flex flex-col gap-4 px-6 py-5 transition hover:bg-paper/60 md:flex-row md:items-center md:justify-between"
        >
          <div class="flex items-start gap-4">
            <div class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-paper font-display text-sm font-semibold text-ink">
              {{ companyInitials }}
            </div>
            <div>
              <div class="flex flex-wrap items-center gap-2">
                <h3 class="font-display text-base font-semibold text-ink">{{ job.title }}</h3>
                <span :class="['rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize', STATUS_COLORS[job.status]]">
                  {{ job.status }}
                </span>
              </div>
              <p class="mt-0.5 text-sm text-muted">{{ job.department }}</p>
              <div class="mt-2 flex flex-wrap items-center gap-2">
                <span class="flex items-center gap-1 text-xs text-muted">
                  <MapPin class="size-3" /> {{ job.location }}
                </span>
                <span :class="['rounded-full px-2 py-0.5 text-xs font-semibold capitalize', LOCATION_COLORS[job.locationType]]">
                  {{ job.locationType }}
                </span>
                <span class="rounded-full border border-line bg-paper px-2 py-0.5 text-xs font-semibold capitalize text-muted">
                  {{ job.jobType }}
                </span>
              </div>
            </div>
          </div>

          <div class="flex shrink-0 items-center gap-6 md:gap-8">
            <div class="text-right">
              <p class="font-display text-2xl font-semibold text-ink">{{ job.applications }}</p>
              <p class="text-xs text-muted">applicants</p>
            </div>
            <div class="text-right">
              <p class="text-sm font-semibold text-ink">{{ job.postedAt }}</p>
              <p class="text-xs text-muted">posted</p>
            </div>
            <div class="flex items-center gap-2">
              <NuxtLink
                :to="`/jobs/${job.id}`"
                class="flex items-center gap-1 rounded-full border border-line bg-paper px-3.5 py-1.5 text-xs font-semibold text-muted transition hover:border-ink/20 hover:text-ink"
              >
                View <ArrowUpRight class="size-3" />
              </NuxtLink>
              <button
                v-if="job.status === 'active'"
                class="rounded-full border border-line bg-paper px-3.5 py-1.5 text-xs font-semibold text-muted transition hover:border-coral/30 hover:bg-coral/5 hover:text-coral"
                type="button"
                @click="closeJob(job.id)"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
