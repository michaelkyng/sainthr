<script setup lang="ts">
import {
  LayoutDashboard,
  BriefcaseBusiness,
  Users,
  UserCheck,
  FileText,
  Settings,
  LogOut,
  ChevronRight,
} from "@lucide/vue"

const route = useRoute()

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
  { label: "Jobs", icon: BriefcaseBusiness, to: "/jobs" },
  { label: "Candidates", icon: Users, to: "/candidates" },
  { label: "Applications", icon: FileText, to: "/applications" },
  { label: "Employees", icon: UserCheck, to: "/employees" },
  { label: "Settings", icon: Settings, to: "/settings" },
]

const isActive = (to: string) => route.path.startsWith(to)
</script>

<template>
  <aside class="flex h-screen w-60 flex-col bg-sidebar text-white">
    <!-- Logo -->
    <div class="flex h-16 shrink-0 items-center gap-3 px-5 border-b border-white/10">
      <span class="grid size-8 place-items-center rounded-lg bg-white/10">
        <BriefcaseBusiness class="size-4" />
      </span>
      <span class="font-display text-base font-semibold tracking-tight">SaintHR Admin</span>
    </div>

    <!-- Nav -->
    <nav class="flex-1 overflow-y-auto hide-scrollbar px-3 py-4 flex flex-col gap-0.5">
      <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        :class="[
          'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
          isActive(item.to)
            ? 'bg-sidebar-active text-white'
            : 'text-white/60 hover:bg-sidebar-hover hover:text-white',
        ]"
      >
        <component :is="item.icon" class="size-4 shrink-0" />
        <span class="flex-1">{{ item.label }}</span>
        <ChevronRight
          v-if="isActive(item.to)"
          class="size-3.5 text-white/40"
        />
      </NuxtLink>
    </nav>

    <!-- Footer -->
    <div class="shrink-0 border-t border-white/10 px-3 py-3">
      <button
        class="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-sidebar-hover hover:text-white"
        type="button"
      >
        <LogOut class="size-4 shrink-0" />
        Sign out
      </button>
    </div>
  </aside>
</template>
