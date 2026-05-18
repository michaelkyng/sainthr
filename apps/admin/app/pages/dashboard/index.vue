<script setup lang="ts">
import { BriefcaseBusiness, Users, FileText, UserCheck, TrendingUp, Clock } from "@lucide/vue"

defineOptions({ name: "AdminDashboardPage" })
useHead({ title: "Dashboard – SaintHR Admin" })

const stats = [
  { label: "Open Jobs", value: "24", delta: "+3 this week", icon: BriefcaseBusiness, color: "text-ink" },
  { label: "Candidates", value: "1,284", delta: "+47 this week", icon: Users, color: "text-green" },
  { label: "Applications", value: "386", delta: "+21 this week", icon: FileText, color: "text-gold" },
  { label: "Hired", value: "12", delta: "+2 this month", icon: UserCheck, color: "text-coral" },
]

const recentActivity = [
  { action: "New application", detail: "Jane Doe applied for Senior Designer", time: "2m ago" },
  { action: "Job posted", detail: "Full Stack Engineer — Remote", time: "1h ago" },
  { action: "Interview scheduled", detail: "Mark T. — Product Manager role", time: "3h ago" },
  { action: "Offer accepted", detail: "Sarah K. joined as HR Analyst", time: "Yesterday" },
  { action: "New application", detail: "Chris A. applied for DevOps Lead", time: "Yesterday" },
]
</script>

<template>
  <div class="flex flex-col gap-6">
    <!-- Stats -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="flex flex-col gap-4 rounded-2xl border border-line bg-panel p-5 shadow-sm"
      >
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium text-muted">{{ stat.label }}</span>
          <span :class="['grid size-9 place-items-center rounded-xl bg-paper', stat.color]">
            <component :is="stat.icon" class="size-4" />
          </span>
        </div>
        <div>
          <p class="font-display text-3xl font-semibold text-ink">{{ stat.value }}</p>
          <p class="mt-0.5 flex items-center gap-1 text-xs text-green">
            <TrendingUp class="size-3" />
            {{ stat.delta }}
          </p>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="rounded-2xl border border-line bg-panel p-5 shadow-sm">
      <h2 class="mb-4 font-display text-base font-semibold text-ink">Recent Activity</h2>
      <ul class="flex flex-col divide-y divide-line">
        <li
          v-for="(item, i) in recentActivity"
          :key="i"
          class="flex items-start justify-between gap-4 py-3"
        >
          <div class="flex items-start gap-3">
            <span class="mt-0.5 grid size-7 shrink-0 place-items-center rounded-lg bg-paper">
              <Clock class="size-3.5 text-muted" />
            </span>
            <div>
              <p class="text-sm font-medium text-ink">{{ item.action }}</p>
              <p class="text-xs text-muted">{{ item.detail }}</p>
            </div>
          </div>
          <span class="shrink-0 text-xs text-muted">{{ item.time }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
