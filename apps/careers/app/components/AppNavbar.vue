<script setup lang="ts">
import { ArrowUpRight, BriefcaseBusiness, Menu, X } from "@lucide/vue"

defineOptions({ name: "CareersAppNavbar" })

const config = useRuntimeConfig()
const mainSiteUrl = computed(() => config.public.mainSiteUrl || "http://localhost:3000")
const mobileOpen = ref(false)
const { profile, initials } = useProfile()
const { employer, companyInitials } = useCompany()
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 px-3 py-3 md:px-5">
    <div class="relative mx-auto flex w-full max-w-6xl items-center justify-between rounded-full border border-white/70 bg-white/85 px-3 py-2 shadow-[0_20px_70px_rgba(16,30,68,0.12)] backdrop-blur-xl md:px-4">
      <NuxtLink to="/" class="flex items-center gap-2 text-ink">
        <span class="grid size-9 place-items-center rounded-full bg-ink text-white">
          <BriefcaseBusiness class="size-4" />
        </span>
        <span class="font-display text-xl font-semibold">SaintHR</span>
      </NuxtLink>

      <nav class="hidden items-center gap-1 md:flex">
        <NuxtLink
          to="/jobs"
          class="inline-flex h-9 items-center rounded-full px-4 text-sm font-semibold text-ink/70 transition-all duration-200 hover:bg-paper hover:text-ink"
        >
          Find Work
        </NuxtLink>
        <a
          :href="mainSiteUrl"
          class="inline-flex h-9 items-center rounded-full px-4 text-sm font-semibold text-ink/70 transition-all duration-200 hover:bg-paper hover:text-ink"
        >
          SaintHR.com
        </a>
      </nav>

      <div class="hidden items-center gap-2 md:flex">
        <!-- Logged in: show avatar -->
        <template v-if="profile.isOnboarded">
          <NuxtLink
            to="/profile"
            class="flex h-9 items-center gap-2 rounded-full border border-ink/15 bg-white/70 pl-2 pr-4 text-sm font-semibold text-ink shadow-xs backdrop-blur transition-all duration-200 hover:border-ink/30 hover:bg-paper"
          >
            <span class="flex size-6 items-center justify-center rounded-full bg-ink font-display text-[10px] font-semibold text-white">
              {{ initials }}
            </span>
            My Profile
          </NuxtLink>
        </template>
        <!-- Guest -->
        <template v-else>
          <NuxtLink
            to="/auth/login"
            class="inline-flex h-9 items-center rounded-full border border-ink/15 bg-white/70 px-5 text-sm font-semibold text-ink shadow-xs backdrop-blur transition-all duration-200 hover:border-ink/30 hover:bg-paper"
          >
            Sign in
          </NuxtLink>
        </template>
        <!-- Employer: go to dashboard -->
        <template v-if="employer.isOnboarded">
          <NuxtLink
            to="/company/dashboard"
            class="flex h-9 items-center gap-2 rounded-full border border-ink/15 bg-white/70 pl-2 pr-4 text-sm font-semibold text-ink shadow-xs backdrop-blur transition-all duration-200 hover:border-ink/30 hover:bg-paper"
          >
            <span class="flex size-6 items-center justify-center rounded-lg bg-ink font-display text-[10px] font-bold text-white">
              {{ companyInitials }}
            </span>
            Dashboard
          </NuxtLink>
        </template>
        <!-- Guest: employer signup via unified signup page -->
        <template v-else>
          <NuxtLink
            to="/auth/signup?role=employer"
            class="inline-flex h-9 items-center gap-1.5 rounded-full bg-ink px-5 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(16,30,68,0.22)] transition-all duration-200 hover:bg-ink-2"
          >
            Post a job
            <ArrowUpRight class="size-3.5" />
          </NuxtLink>
        </template>
      </div>

      <button
        class="z-10 flex size-fit cursor-pointer items-center justify-center p-2.5 md:hidden"
        type="button"
        :aria-label="mobileOpen ? 'Close menu' : 'Open menu'"
        @click="mobileOpen = !mobileOpen"
      >
        <X v-if="mobileOpen" class="size-5 text-ink" />
        <Menu v-else class="size-5 text-ink" />
      </button>

      <!-- Mobile drawer -->
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="translate-x-full opacity-0"
        enter-to-class="translate-x-0 opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="translate-x-0 opacity-100"
        leave-to-class="translate-x-full opacity-0"
      >
        <aside
          v-if="mobileOpen"
          class="fixed right-3 top-3 h-[calc(100vh-1.5rem)] w-[82vw] rounded-2xl border border-white/70 bg-white/95 px-5 py-24 shadow-[0_28px_80px_rgba(16,30,68,0.22)] backdrop-blur-xl sm:w-1/2 md:hidden"
        >
          <nav class="flex flex-col gap-1">
            <NuxtLink
              to="/jobs"
              class="rounded-xl px-4 py-3.5 font-display text-lg font-semibold text-ink transition hover:bg-paper"
              @click="mobileOpen = false"
            >
              Find Work
            </NuxtLink>
            <a
              :href="mainSiteUrl"
              class="flex items-center justify-between rounded-xl px-4 py-3.5 font-display text-lg font-semibold text-ink transition hover:bg-paper"
              @click="mobileOpen = false"
            >
              SaintHR.com <ArrowUpRight class="size-4 opacity-50" />
            </a>
          </nav>
          <div class="mt-8 grid gap-3">
            <NuxtLink
              :to="employer.isOnboarded ? '/company/dashboard' : '/auth/signup?role=employer'"
              class="flex items-center justify-center gap-1.5 rounded-full bg-ink py-3.5 text-sm font-semibold text-white"
              @click="mobileOpen = false"
            >
              {{ employer.isOnboarded ? "Company Dashboard" : "Post a job" }}
              <ArrowUpRight class="size-4" />
            </NuxtLink>
            <NuxtLink
              v-if="profile.isOnboarded"
              to="/profile"
              class="flex items-center justify-center gap-2 rounded-full border border-ink/20 py-3.5 text-sm font-semibold text-ink transition hover:bg-paper"
              @click="mobileOpen = false"
            >
              <span class="flex size-5 items-center justify-center rounded-full bg-ink font-display text-[9px] font-semibold text-white">
                {{ initials }}
              </span>
              My Profile
            </NuxtLink>
            <NuxtLink
              v-else
              to="/auth/login"
              class="flex items-center justify-center rounded-full border border-ink/20 py-3.5 text-sm font-semibold text-ink transition hover:bg-paper"
              @click="mobileOpen = false"
            >
              Sign in
            </NuxtLink>
          </div>
        </aside>
      </Transition>
    </div>
  </header>

  <!-- Backdrop for mobile drawer -->
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <button
      v-if="mobileOpen"
      class="fixed inset-0 z-40 bg-ink/25 backdrop-blur-sm md:hidden"
      type="button"
      aria-label="Close menu"
      @click="mobileOpen = false"
    />
  </Transition>
</template>
