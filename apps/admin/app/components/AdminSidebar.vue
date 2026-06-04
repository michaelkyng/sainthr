<script setup lang="ts">
import {
  LayoutDashboard,
  BriefcaseBusiness,
  Users,
  Building2,
  FileText,
  Settings,
  LogOut,
  ChevronRight,
  Sparkles,
} from '@lucide/vue';
import Separator from '~/components/ui/Separator.vue';

const route = useRoute();

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
  { label: 'Jobs', icon: BriefcaseBusiness, to: '/jobs', count: '24' },
  { label: 'Candidates', icon: Users, to: '/candidates', count: '1.2k' },
  { label: 'Applications', icon: FileText, to: '/applications', count: '386' },
  { label: 'Employers', icon: Building2, to: '/employers', count: '42' },
];

const isActive = (to: string) => route.path.startsWith(to);
</script>

<template>
  <aside
    class="hidden h-screen w-72 shrink-0 flex-col border-r border-white/10 bg-sidebar text-white lg:flex"
  >
    <!-- Logo -->
    <div class="flex h-20 shrink-0 items-center gap-3 px-5">
      <span
        class="grid size-10 place-items-center rounded-2xl bg-white text-sidebar shadow-lg shadow-black/20"
      >
        <BriefcaseBusiness class="size-4" />
      </span>
      <div>
        <span class="font-display text-lg font-semibold tracking-tight">SaintHR</span>
        <p class="text-xs font-medium text-white/45">Admin workspace</p>
      </div>
    </div>

    <!-- Hiring velocity widget -->
    <div class="mx-4 mb-4 rounded-2xl border border-white/10 bg-white/[0.06] p-4">
      <div class="flex items-center gap-2 text-xs font-medium text-white/55">
        <Sparkles class="size-3.5 text-gold" />
        Hiring velocity
      </div>
      <div class="mt-3 flex items-end justify-between">
        <p class="font-display text-3xl font-semibold">82%</p>
        <span class="rounded-full bg-green/20 px-2 py-1 text-xs font-semibold text-mint">+12%</span>
      </div>
      <div class="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div class="h-full w-[82%] rounded-full bg-mint" />
      </div>
    </div>

    <!-- Navigation -->
    <nav class="hide-scrollbar flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-2">
      <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        :class="[
          'group flex items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-semibold transition-all',
          isActive(item.to)
            ? 'bg-sidebar-active text-sidebar shadow-sm'
            : 'text-white/58 hover:bg-sidebar-hover hover:text-white',
        ]"
      >
        <component :is="item.icon" class="size-4 shrink-0" />
        <span class="flex-1">{{ item.label }}</span>
        <span
          v-if="item.count"
          :class="[
            'rounded-full px-2 py-0.5 text-[11px] font-bold',
            isActive(item.to) ? 'bg-sidebar text-white' : 'bg-white/10 text-white/50',
          ]"
        >
          {{ item.count }}
        </span>
        <ChevronRight v-if="isActive(item.to)" class="size-3.5 text-sidebar/45" />
      </NuxtLink>
    </nav>

    <Separator class="bg-white/10" />

    <!-- Settings link -->
    <div class="px-3 py-2">
      <NuxtLink
        to="/settings"
        :class="[
          'flex items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-semibold transition-all',
          isActive('/settings')
            ? 'bg-sidebar-active text-sidebar shadow-sm'
            : 'text-white/58 hover:bg-sidebar-hover hover:text-white',
        ]"
      >
        <Settings class="size-4 shrink-0" />
        <span class="flex-1">Settings</span>
      </NuxtLink>
    </div>

    <!-- User card -->
    <div class="mx-4 mb-4 rounded-2xl border border-white/10 bg-white/[0.05] p-3">
      <div class="flex items-center gap-3">
        <span class="grid size-10 place-items-center rounded-xl bg-coral text-xs font-bold text-white">AD</span>
        <div class="min-w-0 flex-1">
          <p class="truncate text-sm font-semibold text-white">Admin user</p>
          <p class="truncate text-xs text-white/45">admin@sainthr.com</p>
        </div>
        <button
          class="grid size-8 place-items-center rounded-xl text-white/40 transition hover:bg-white/10 hover:text-white"
          type="button"
          aria-label="Sign out"
        >
          <LogOut class="size-4" />
        </button>
      </div>
    </div>
  </aside>
</template>
