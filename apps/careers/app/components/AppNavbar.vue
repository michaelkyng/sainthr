<script setup lang="ts">
import { ArrowUpRight, BriefcaseBusiness, Building2, Check, LayoutDashboard, LogOut, Menu, Settings, UserRound, X } from "@lucide/vue"

defineOptions({ name: "CareersAppNavbar" })

const config = useRuntimeConfig()
const mainSiteUrl = computed(() => config.public.mainSiteUrl || "http://localhost:3000")
const mobileOpen = ref(false)
const { profile } = storeToRefs(useProfileStore())
const { employer } = storeToRefs(useEmployerStore())
const {
  isSignedIn,
  roles,
  activeRole,
  setActiveRole,
  homeFor,
  fullName,
  email,
  user,
  signOut,
  isCandidateOnboarded,
  isEmployerOnboarded,
} = useSharedAuth()

const showEmployerNav = computed(() => isSignedIn.value && activeRole.value === "employer")

const ROLE_LABELS: Record<string, string> = { candidate: "Job Seeker", employer: "Employer" }

const switchRole = async (r: "candidate" | "employer") => {
  mobileOpen.value = false
  setActiveRole(r)
  await navigateTo(homeFor(r))
}
const employerDestination = computed(() => (
  isEmployerOnboarded.value ? "/company/dashboard" : "/company/onboarding"
))
const candidateDestination = computed(() => (
  isCandidateOnboarded.value ? "/profile" : "/onboarding"
))

const employerProfileDestination = computed(() => (
  isEmployerOnboarded.value ? "/company/profile" : "/company/onboarding"
))

const employerSettingsDestination = computed(() => (
  isEmployerOnboarded.value ? "/company/settings" : "/company/onboarding"
))
const candidateSettingsDestination = computed(() => (
  isCandidateOnboarded.value ? "/settings" : "/onboarding"
))

const dashboardDestination = computed(() => (
  showEmployerNav.value ? employerDestination.value : candidateDestination.value
))
const profileDestination = computed(() => (
  showEmployerNav.value ? employerProfileDestination.value : candidateDestination.value
))
const settingsDestination = computed(() => (
  showEmployerNav.value ? employerSettingsDestination.value : candidateSettingsDestination.value
))

const displayName = computed(() => fullName.value || profile.value.fullName || employer.value.fullName || "Your account")
const displayEmail = computed(() => email.value || profile.value.email || employer.value.email)

const userImageUrl = computed(() => user.value?.imageUrl ?? "")
const avatarInitials = computed(() => {
  const source = displayName.value && displayName.value !== "Your account" ? displayName.value : displayEmail.value
  if (!source) return "?"
  return source
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() ?? "")
    .join("") || source[0]?.toUpperCase() || "?"
})

const handleSignOut = async () => {
  mobileOpen.value = false
  await signOut.value()
}
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
        <template v-if="!isSignedIn">
          <UiButton as-child variant="secondary" size="sm" class="h-9 border-ink/15 bg-white/70 px-5">
            <NuxtLink to="/auth/login">
              Sign in
            </NuxtLink>
          </UiButton>
          <UiButton as-child size="sm" class="h-9 px-5 shadow-[0_18px_45px_rgba(16,30,68,0.22)]">
            <NuxtLink to="/auth/signup?role=employer">
              Post a job
              <ArrowUpRight class="size-3.5" />
            </NuxtLink>
          </UiButton>
        </template>

        <template v-if="isSignedIn">
          <UiDropdownMenu>
            <template #default="{ open, toggle }">
              <button
                type="button"
                aria-label="Open account menu"
                :aria-expanded="open"
                class="rounded-full shadow-xs ring-1 ring-ink/10 transition hover:ring-ink/30 focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:outline-none"
                @click="toggle"
              >
                <UiAvatar class="size-10">
                  <UiAvatarImage v-if="userImageUrl" :src="userImageUrl" :alt="displayName" />
                  <UiAvatarFallback>{{ avatarInitials }}</UiAvatarFallback>
                </UiAvatar>
              </button>
              <UiDropdownMenuContent v-if="open" align="end" class="min-w-56">
                <div class="px-3 py-2">
                  <p class="truncate text-sm font-semibold text-ink">{{ displayName }}</p>
                  <p v-if="displayEmail" class="truncate text-xs text-ink/55">{{ displayEmail }}</p>
                </div>
                <UiDropdownMenuSeparator />
                <UiDropdownMenuItem @click="navigateTo(dashboardDestination)">
                  <LayoutDashboard class="size-4 text-ink/60" />
                  Dashboard
                </UiDropdownMenuItem>
                <UiDropdownMenuItem @click="navigateTo(profileDestination)">
                  <UserRound class="size-4 text-ink/60" />
                  Profile
                </UiDropdownMenuItem>
                <UiDropdownMenuItem @click="navigateTo(settingsDestination)">
                  <Settings class="size-4 text-ink/60" />
                  Settings
                </UiDropdownMenuItem>
                <template v-if="roles.length > 1">
                  <UiDropdownMenuSeparator />
                  <p class="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-ink/40">
                    Switch role
                  </p>
                  <UiDropdownMenuItem
                    v-for="r in roles"
                    :key="r"
                    @click="switchRole(r)"
                  >
                    <component :is="r === 'employer' ? Building2 : UserRound" class="size-4 text-ink/60" />
                    {{ ROLE_LABELS[r] }}
                    <Check v-if="activeRole === r" class="ml-auto size-3.5 text-green" />
                  </UiDropdownMenuItem>
                </template>
                <UiDropdownMenuSeparator />
                <UiDropdownMenuItem :destructive="true" @click="handleSignOut">
                  <LogOut class="size-4" />
                  Logout
                </UiDropdownMenuItem>
              </UiDropdownMenuContent>
            </template>
          </UiDropdownMenu>
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

          <div v-if="isSignedIn" class="mt-8 flex flex-col gap-1">
            <div class="flex items-center gap-3 px-4 py-3">
              <UiAvatar class="size-10">
                <UiAvatarImage v-if="userImageUrl" :src="userImageUrl" :alt="displayName" />
                <UiAvatarFallback>{{ avatarInitials }}</UiAvatarFallback>
              </UiAvatar>
              <div class="min-w-0">
                <p class="truncate text-sm font-semibold text-ink">{{ displayName }}</p>
                <p v-if="displayEmail" class="truncate text-xs text-ink/55">{{ displayEmail }}</p>
              </div>
            </div>
            <NuxtLink
              :to="dashboardDestination"
              class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-ink transition hover:bg-paper"
              @click="mobileOpen = false"
            >
              <LayoutDashboard class="size-4 text-ink/60" /> Dashboard
            </NuxtLink>
            <NuxtLink
              :to="profileDestination"
              class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-ink transition hover:bg-paper"
              @click="mobileOpen = false"
            >
              <UserRound class="size-4 text-ink/60" /> Profile
            </NuxtLink>
            <NuxtLink
              :to="settingsDestination"
              class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-ink transition hover:bg-paper"
              @click="mobileOpen = false"
            >
              <Settings class="size-4 text-ink/60" /> Settings
            </NuxtLink>
            <template v-if="roles.length > 1">
              <div class="my-1 border-t border-line" />
              <p class="px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-ink/40">
                Switch view
              </p>
              <button
                v-for="r in roles"
                :key="r"
                type="button"
                class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-ink transition hover:bg-paper"
                @click="switchRole(r)"
              >
                <component :is="r === 'employer' ? Building2 : UserRound" class="size-4 text-ink/60" />
                {{ ROLE_LABELS[r] }}
                <Check v-if="activeRole === r" class="ml-auto size-3.5 text-green" />
              </button>
            </template>
            <button
              type="button"
              class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-coral transition hover:bg-coral/10"
              @click="handleSignOut"
            >
              <LogOut class="size-4" /> Logout
            </button>
          </div>

          <div v-else class="mt-8 grid gap-3">
            <UiButton as-child size="lg" class="w-full" @click="mobileOpen = false">
              <NuxtLink to="/auth/signup?role=employer">
                Post a job
                <ArrowUpRight class="size-4" />
              </NuxtLink>
            </UiButton>
            <UiButton
              as-child
              variant="secondary"
              size="lg"
              class="w-full border-ink/20"
              @click="mobileOpen = false"
            >
              <NuxtLink to="/auth/login">
                Sign in
              </NuxtLink>
            </UiButton>
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
