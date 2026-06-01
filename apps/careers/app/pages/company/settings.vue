<script setup lang="ts">
import {
  ArrowUpRight,
  Bell,
  Briefcase,
  Building2,
  CheckCircle2,
  KeyRound,
  LogOut,
  Mail,
  Settings as SettingsIcon,
  ShieldCheck,
  Trash2,
  UserRound,
} from "@lucide/vue"

defineOptions({ name: "CompanySettingsPage" })
definePageMeta({ layout: "company", middleware: ["employer", "onboarded"] })

useHead({ title: "Settings – SaintHR Employers" })

const employerStore = useEmployerStore()
const { employer, settings, activeCompany } = storeToRefs(employerStore)
const { setActiveCompany } = employerStore
const { fullName, email, user, signOut } = useSharedAuth()

const userImageUrl = computed(() => user.value?.imageUrl ?? "")
const displayName = computed(() => fullName.value || employer.value.fullName || "Your account")
const displayEmail = computed(() => email.value || employer.value.email || "")
const userInitials = computed(() => {
  const source = displayName.value && displayName.value !== "Your account" ? displayName.value : displayEmail.value
  if (!source) return "?"
  return source
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() ?? "")
    .join("") || source[0]?.toUpperCase() || "?"
})

const savedAt = ref<Date | null>(null)
const savedLabel = computed(() => {
  if (!savedAt.value) return ""
  const d = savedAt.value
  return `Saved · ${d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
})

let saveTimer: ReturnType<typeof setTimeout> | null = null
watch(
  settings,
  () => {
    if (saveTimer) clearTimeout(saveTimer)
    saveTimer = setTimeout(() => { savedAt.value = new Date() }, 300)
  },
  { deep: true },
)

const DIGEST_OPTIONS = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "never", label: "Never" },
] as const

const LOCATION_OPTIONS = [
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
  { value: "on-site", label: "On-site" },
] as const

const setDigest = (v: unknown) => {
  if (v === "daily" || v === "weekly" || v === "never") {
    settings.value.preferences.digestFrequency = v
  }
}

const setLocationDefault = (v: unknown) => {
  if (v === "remote" || v === "hybrid" || v === "on-site") {
    settings.value.preferences.defaultJobLocationType = v
  }
}

const autoCloseDays = computed({
  get: () => String(settings.value.hiring.autoCloseAfterDays),
  set: (v: string) => {
    const n = Math.max(1, Math.min(365, Number.parseInt(v, 10) || 30))
    settings.value.hiring.autoCloseAfterDays = n
  },
})

const handleSignOut = async () => {
  await signOut.value()
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="bg-ink text-white">
      <div class="mx-auto max-w-5xl px-5 py-10 lg:px-8">
        <div class="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div class="flex items-start gap-5">
            <UiAvatar class="size-20 rounded-2xl ring-2 ring-white/15">
              <UiAvatarImage v-if="userImageUrl" :src="userImageUrl" :alt="displayName" />
              <UiAvatarFallback class="rounded-2xl bg-white/10 font-display text-2xl">
                {{ userInitials }}
              </UiAvatarFallback>
            </UiAvatar>
            <div class="flex flex-col gap-2">
              <div class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/55">
                <SettingsIcon class="size-3.5" /> Employer settings
              </div>
              <h1 class="font-display text-2xl font-semibold leading-tight md:text-3xl">
                {{ displayName }}
              </h1>
              <p v-if="displayEmail" class="text-sm text-white/60">
                {{ displayEmail }}
              </p>
            </div>
          </div>

          <div class="flex shrink-0 flex-wrap items-center gap-2">
            <UiBadge v-if="savedLabel" class="bg-mint/20 px-2.5 py-1 text-mint">
              <CheckCircle2 class="size-3" /> {{ savedLabel }}
            </UiBadge>
            <UiButton as-child variant="secondary" size="sm" class="border-white/20 bg-white/10 text-white hover:border-white/30 hover:bg-white/20">
              <NuxtLink to="/company/profile">
                Manage companies <ArrowUpRight class="size-3.5" />
              </NuxtLink>
            </UiButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Body -->
    <div class="mx-auto max-w-5xl px-5 py-8 lg:px-8">
      <div class="grid gap-5 lg:grid-cols-[220px_1fr]">
        <!-- Sidebar -->
        <aside class="hidden flex-col gap-1 lg:flex">
          <a href="#account" class="rounded-xl px-3 py-2 text-sm font-semibold text-ink/70 transition hover:bg-paper hover:text-ink">
            Account
          </a>
          <a href="#workspace" class="rounded-xl px-3 py-2 text-sm font-semibold text-ink/70 transition hover:bg-paper hover:text-ink">
            Workspace
          </a>
          <a href="#notifications" class="rounded-xl px-3 py-2 text-sm font-semibold text-ink/70 transition hover:bg-paper hover:text-ink">
            Notifications
          </a>
          <a href="#hiring" class="rounded-xl px-3 py-2 text-sm font-semibold text-ink/70 transition hover:bg-paper hover:text-ink">
            Hiring defaults
          </a>
          <a href="#security" class="rounded-xl px-3 py-2 text-sm font-semibold text-ink/70 transition hover:bg-paper hover:text-ink">
            Security
          </a>
          <a href="#danger" class="rounded-xl px-3 py-2 text-sm font-semibold text-coral transition hover:bg-coral/5">
            Danger zone
          </a>
        </aside>

        <!-- Settings sections -->
        <div class="flex flex-col gap-5">
          <!-- Account -->
          <UiCard id="account" variant="panel" class="scroll-mt-44 p-6">
            <div class="mb-4 flex items-start gap-3">
              <div class="flex size-9 shrink-0 items-center justify-center rounded-xl bg-mint text-green">
                <UserRound class="size-4" />
              </div>
              <div>
                <h2 class="font-display text-lg font-semibold text-ink">Account</h2>
                <p class="text-xs text-muted">Your sign-in details are managed by Clerk.</p>
              </div>
            </div>

            <div class="grid gap-4 sm:grid-cols-2">
              <div class="flex flex-col gap-1.5">
                <UiLabel>Full name</UiLabel>
                <UiInput :model-value="displayName" disabled />
              </div>
              <div class="flex flex-col gap-1.5">
                <UiLabel>Email</UiLabel>
                <UiInput :model-value="displayEmail" disabled />
              </div>
            </div>
          </UiCard>

          <!-- Workspace -->
          <UiCard id="workspace" variant="panel" class="scroll-mt-44 p-6">
            <div class="mb-4 flex items-start gap-3">
              <div class="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#e8eeff] text-[#3b55c4]">
                <Building2 class="size-4" />
              </div>
              <div>
                <h2 class="font-display text-lg font-semibold text-ink">Workspace</h2>
                <p class="text-xs text-muted">Pick which company you land on when signing in.</p>
              </div>
            </div>

            <div v-if="employer.companies.length" class="flex flex-col gap-2">
              <UiLabel>Default active company</UiLabel>
              <div class="grid gap-2 sm:grid-cols-2">
                <button
                  v-for="c in employer.companies"
                  :key="c.id"
                  type="button"
                  :class="[
                    'flex items-center gap-3 rounded-2xl border bg-white px-4 py-3 text-left transition cursor-pointer',
                    c.id === activeCompany?.id ? 'border-ink shadow-[0_8px_24px_rgba(16,30,68,0.08)]' : 'border-line hover:border-ink/30',
                  ]"
                  @click="setActiveCompany(c.id)"
                >
                  <div
                    :class="[
                      'flex size-9 shrink-0 items-center justify-center rounded-xl font-display text-[11px] font-bold transition',
                      c.id === activeCompany?.id ? 'bg-ink text-white' : 'bg-paper text-ink',
                    ]"
                  >
                    {{ c.name.split(/\s+/).slice(0, 2).map(w => w[0]?.toUpperCase()).join('') }}
                  </div>
                  <div class="min-w-0 flex-1">
                    <p class="truncate text-sm font-semibold text-ink">
                      {{ c.name }}
                    </p>
                    <p class="truncate text-xs text-muted">
                      {{ c.industry || "—" }}
                      <template v-if="c.industry && c.location">·</template>
                      {{ c.location }}
                    </p>
                  </div>
                  <span
                    v-if="c.id === activeCompany?.id"
                    class="size-1.5 shrink-0 rounded-full bg-ink"
                  />
                </button>
              </div>
            </div>
            <div v-else class="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-line py-6 text-center">
              <p class="text-sm text-muted">
                You have not added a company yet.
              </p>
              <UiButton as-child size="sm">
                <NuxtLink to="/company/new">
                  Add a company <ArrowUpRight class="size-3.5" />
                </NuxtLink>
              </UiButton>
            </div>
          </UiCard>

          <!-- Notifications -->
          <UiCard id="notifications" variant="panel" class="scroll-mt-44 p-6">
            <div class="mb-4 flex items-start gap-3">
              <div class="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#fff3e0] text-[#b35a00]">
                <Bell class="size-4" />
              </div>
              <div>
                <h2 class="font-display text-lg font-semibold text-ink">Notifications</h2>
                <p class="text-xs text-muted">Stay on top of your pipeline.</p>
              </div>
            </div>

            <ul class="flex flex-col divide-y divide-line/70">
              <li class="flex items-start justify-between gap-4 py-3.5">
                <div>
                  <p class="text-sm font-semibold text-ink">New applicants</p>
                  <p class="text-xs text-muted">Email me when someone applies to one of my jobs.</p>
                </div>
                <UiSwitch v-model="settings.notifications.newApplicants" />
              </li>
              <li class="flex items-start justify-between gap-4 py-3.5">
                <div>
                  <p class="text-sm font-semibold text-ink">Applicant status changes</p>
                  <p class="text-xs text-muted">Notify on moves between pipeline stages.</p>
                </div>
                <UiSwitch v-model="settings.notifications.applicantStatusChanges" />
              </li>
              <li class="flex items-start justify-between gap-4 py-3.5">
                <div>
                  <p class="text-sm font-semibold text-ink">Hiring digest</p>
                  <p class="text-xs text-muted">A recap of new applicants and open roles.</p>
                </div>
                <UiSwitch v-model="settings.notifications.weeklyDigest" />
              </li>
              <li class="flex items-start justify-between gap-4 py-3.5">
                <div>
                  <p class="text-sm font-semibold text-ink">Product news</p>
                  <p class="text-xs text-muted">Occasional updates about new SaintHR features.</p>
                </div>
                <UiSwitch v-model="settings.notifications.productNews" />
              </li>
            </ul>

            <UiSeparator class="my-5" />

            <div class="flex flex-col gap-2">
              <UiLabel>Digest frequency</UiLabel>
              <UiToggleGroup
                type="single"
                :model-value="settings.preferences.digestFrequency"
                @update:model-value="setDigest"
              >
                <UiToggleGroupItem v-for="opt in DIGEST_OPTIONS" :key="opt.value" :value="opt.value">
                  {{ opt.label }}
                </UiToggleGroupItem>
              </UiToggleGroup>
            </div>
          </UiCard>

          <!-- Hiring defaults -->
          <UiCard id="hiring" variant="panel" class="scroll-mt-44 p-6">
            <div class="mb-4 flex items-start gap-3">
              <div class="flex size-9 shrink-0 items-center justify-center rounded-xl bg-mint text-green">
                <Briefcase class="size-4" />
              </div>
              <div>
                <h2 class="font-display text-lg font-semibold text-ink">Hiring defaults</h2>
                <p class="text-xs text-muted">Defaults applied when creating new job posts.</p>
              </div>
            </div>

            <div class="flex flex-col gap-5">
              <div class="flex flex-col gap-2">
                <UiLabel>Default location type</UiLabel>
                <UiToggleGroup
                  type="single"
                  :model-value="settings.preferences.defaultJobLocationType"
                  @update:model-value="setLocationDefault"
                >
                  <UiToggleGroupItem v-for="opt in LOCATION_OPTIONS" :key="opt.value" :value="opt.value">
                    {{ opt.label }}
                  </UiToggleGroupItem>
                </UiToggleGroup>
              </div>

              <div class="grid gap-4 sm:grid-cols-2 sm:items-end">
                <div class="flex flex-col gap-1.5">
                  <UiLabel for="auto-close">Auto-close jobs after</UiLabel>
                  <div class="flex items-center gap-2">
                    <UiInput
                      id="auto-close"
                      v-model="autoCloseDays"
                      type="number"
                      min="1"
                      max="365"
                      class="w-28"
                    />
                    <span class="text-sm text-muted">days</span>
                  </div>
                </div>
              </div>

              <ul class="flex flex-col divide-y divide-line/70">
                <li class="flex items-start justify-between gap-4 py-3.5">
                  <div>
                    <p class="text-sm font-semibold text-ink">Show salary on new posts</p>
                    <p class="text-xs text-muted">Pre-fill the salary field as visible on each new job.</p>
                  </div>
                  <UiSwitch v-model="settings.hiring.showSalaryByDefault" />
                </li>
                <li class="flex items-start justify-between gap-4 py-3.5">
                  <div>
                    <p class="text-sm font-semibold text-ink">Allow candidate messages</p>
                    <p class="text-xs text-muted">Let candidates reach out to you on their applications.</p>
                  </div>
                  <UiSwitch v-model="settings.hiring.allowCandidateMessages" />
                </li>
              </ul>
            </div>
          </UiCard>

          <!-- Security -->
          <UiCard id="security" variant="panel" class="scroll-mt-44 p-6">
            <div class="mb-4 flex items-start gap-3">
              <div class="flex size-9 shrink-0 items-center justify-center rounded-xl bg-mint text-green">
                <ShieldCheck class="size-4" />
              </div>
              <div>
                <h2 class="font-display text-lg font-semibold text-ink">Security</h2>
                <p class="text-xs text-muted">Manage your password and verified emails.</p>
              </div>
            </div>

            <div class="grid gap-3 sm:grid-cols-2">
              <a
                href="https://accounts.clerk.com/user"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-between gap-3 rounded-2xl border border-line bg-white px-4 py-3.5 transition hover:border-ink/30"
              >
                <div class="flex items-center gap-3">
                  <div class="flex size-9 items-center justify-center rounded-xl bg-paper text-ink/70">
                    <KeyRound class="size-4" />
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-ink">Password</p>
                    <p class="text-xs text-muted">Change password or enable 2FA.</p>
                  </div>
                </div>
                <ArrowUpRight class="size-4 text-muted" />
              </a>
              <a
                href="https://accounts.clerk.com/user"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-between gap-3 rounded-2xl border border-line bg-white px-4 py-3.5 transition hover:border-ink/30"
              >
                <div class="flex items-center gap-3">
                  <div class="flex size-9 items-center justify-center rounded-xl bg-paper text-ink/70">
                    <Mail class="size-4" />
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-ink">Email addresses</p>
                    <p class="text-xs text-muted">Add or verify alternate emails.</p>
                  </div>
                </div>
                <ArrowUpRight class="size-4 text-muted" />
              </a>
            </div>
          </UiCard>

          <!-- Danger zone -->
          <UiCard id="danger" variant="panel" class="scroll-mt-44 border-coral/30 p-6">
            <div class="mb-4 flex items-start gap-3">
              <div class="flex size-9 shrink-0 items-center justify-center rounded-xl bg-coral/10 text-coral">
                <Trash2 class="size-4" />
              </div>
              <div>
                <h2 class="font-display text-lg font-semibold text-ink">Danger zone</h2>
                <p class="text-xs text-muted">Irreversible actions. Proceed carefully.</p>
              </div>
            </div>

            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p class="text-sm font-semibold text-ink">Sign out of all devices</p>
                <p class="text-xs text-muted">End your session on this and any other device.</p>
              </div>
              <UiButton variant="secondary" size="sm" @click="handleSignOut">
                <LogOut class="size-3.5" /> Sign out
              </UiButton>
            </div>

            <UiSeparator class="my-5" />

            <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p class="text-sm font-semibold text-ink">Delete employer account</p>
                <p class="text-xs text-muted">
                  Permanently remove your companies, jobs and applicants.
                </p>
              </div>
              <UiButton variant="destructive" size="sm" disabled>
                <Trash2 class="size-3.5" /> Delete account
              </UiButton>
            </div>
          </UiCard>
        </div>
      </div>
    </div>
  </div>
</template>
