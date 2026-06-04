<script setup lang="ts">
import {
  ArrowUpRight,
  Bell,
  CheckCircle2,
  Eye,
  KeyRound,
  LogOut,
  Mail,
  Settings as SettingsIcon,
  ShieldCheck,
  Trash2,
  UserRound,
} from "@lucide/vue"

defineOptions({ name: "CareersSettingsPage" })
definePageMeta({ middleware: ["candidate", "onboarded"] })

useHead({ title: "Settings – SaintHR Careers" })

const { profile, settings, initials } = storeToRefs(useProfileStore())
const { fullName, email, user, signOut } = useSharedAuth()

const userImageUrl = computed(() => user.value?.imageUrl ?? "")
const displayName = computed(() => profile.value.fullName || fullName.value || "Your account")
const displayEmail = computed(() => email.value || profile.value.email || "")

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

const setDigest = (v: unknown) => {
  if (v === "daily" || v === "weekly" || v === "never") {
    settings.value.preferences.digestFrequency = v
  }
}

const handleSignOut = async () => {
  await signOut.value()
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="bg-ink text-white">
      <div class="mx-auto max-w-4xl px-5 py-10 lg:px-8">
        <div class="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div class="flex items-start gap-5">
            <UiAvatar class="size-20 rounded-2xl ring-2 ring-white/15">
              <UiAvatarImage v-if="userImageUrl" :src="userImageUrl" :alt="displayName" />
              <UiAvatarFallback class="rounded-2xl bg-white/10 font-display text-2xl">
                {{ initials }}
              </UiAvatarFallback>
            </UiAvatar>
            <div class="flex flex-col gap-2">
              <div class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/55">
                <SettingsIcon class="size-3.5" /> Settings
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
              <NuxtLink to="/profile">
                View profile <ArrowUpRight class="size-3.5" />
              </NuxtLink>
            </UiButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Body -->
    <div class="mx-auto max-w-4xl px-5 py-8 lg:px-8">
      <div class="grid gap-5 lg:grid-cols-[200px_1fr]">
        <!-- Sidebar -->
        <aside class="hidden flex-col gap-1 lg:flex">
          <a href="#account" class="rounded-xl px-3 py-2 text-sm font-semibold text-ink/70 transition hover:bg-paper hover:text-ink">
            Account
          </a>
          <a href="#notifications" class="rounded-xl px-3 py-2 text-sm font-semibold text-ink/70 transition hover:bg-paper hover:text-ink">
            Notifications
          </a>
          <a href="#privacy" class="rounded-xl px-3 py-2 text-sm font-semibold text-ink/70 transition hover:bg-paper hover:text-ink">
            Privacy
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
          <UiCard id="account" variant="panel" class="scroll-mt-28 p-6">
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

            <UiSeparator class="my-5" />

            <div class="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p class="text-sm font-semibold text-ink">Profile information</p>
                <p class="text-xs text-muted">Edit your headline, bio, skills and resume.</p>
              </div>
              <UiButton as-child variant="secondary" size="sm">
                <NuxtLink to="/onboarding">
                  Edit profile <ArrowUpRight class="size-3.5" />
                </NuxtLink>
              </UiButton>
            </div>
          </UiCard>

          <!-- Notifications -->
          <UiCard id="notifications" variant="panel" class="scroll-mt-28 p-6">
            <div class="mb-4 flex items-start gap-3">
              <div class="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#fff3e0] text-[#b35a00]">
                <Bell class="size-4" />
              </div>
              <div>
                <h2 class="font-display text-lg font-semibold text-ink">Notifications</h2>
                <p class="text-xs text-muted">Decide what we email you about.</p>
              </div>
            </div>

            <ul class="flex flex-col divide-y divide-line/70">
              <li class="flex items-start justify-between gap-4 py-3.5">
                <div>
                  <p class="text-sm font-semibold text-ink">Job matches</p>
                  <p class="text-xs text-muted">Get notified when a new role matches your preferences.</p>
                </div>
                <UiSwitch v-model="settings.notifications.jobMatches" />
              </li>
              <li class="flex items-start justify-between gap-4 py-3.5">
                <div>
                  <p class="text-sm font-semibold text-ink">Application updates</p>
                  <p class="text-xs text-muted">Recruiter responses, interview invites and status changes.</p>
                </div>
                <UiSwitch v-model="settings.notifications.applicationUpdates" />
              </li>
              <li class="flex items-start justify-between gap-4 py-3.5">
                <div>
                  <p class="text-sm font-semibold text-ink">Weekly digest</p>
                  <p class="text-xs text-muted">A summary of trending roles and saved searches.</p>
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

          <!-- Privacy -->
          <UiCard id="privacy" variant="panel" class="scroll-mt-28 p-6">
            <div class="mb-4 flex items-start gap-3">
              <div class="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#e8eeff] text-[#3b55c4]">
                <Eye class="size-4" />
              </div>
              <div>
                <h2 class="font-display text-lg font-semibold text-ink">Privacy</h2>
                <p class="text-xs text-muted">Control how recruiters see and reach you.</p>
              </div>
            </div>

            <ul class="flex flex-col divide-y divide-line/70">
              <li class="flex items-start justify-between gap-4 py-3.5">
                <div>
                  <p class="text-sm font-semibold text-ink">Visible to recruiters</p>
                  <p class="text-xs text-muted">Allow verified employers to view your profile.</p>
                </div>
                <UiSwitch v-model="settings.privacy.visibleToRecruiters" />
              </li>
              <li class="flex items-start justify-between gap-4 py-3.5">
                <div>
                  <p class="text-sm font-semibold text-ink">Show in search results</p>
                  <p class="text-xs text-muted">Appear when employers search by skills or role.</p>
                </div>
                <UiSwitch v-model="settings.privacy.showInSearch" />
              </li>
              <li class="flex items-start justify-between gap-4 py-3.5">
                <div>
                  <p class="text-sm font-semibold text-ink">Share resume with employers</p>
                  <p class="text-xs text-muted">Attach your resume when you apply or get contacted.</p>
                </div>
                <UiSwitch v-model="settings.privacy.shareResumeWithEmployers" />
              </li>
            </ul>
          </UiCard>

          <!-- Security -->
          <UiCard id="security" variant="panel" class="scroll-mt-28 p-6">
            <div class="mb-4 flex items-start gap-3">
              <div class="flex size-9 shrink-0 items-center justify-center rounded-xl bg-mint text-green">
                <ShieldCheck class="size-4" />
              </div>
              <div>
                <h2 class="font-display text-lg font-semibold text-ink">Security</h2>
                <p class="text-xs text-muted">Manage your password and active sessions.</p>
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
          <UiCard id="danger" variant="panel" class="scroll-mt-28 border-coral/30 p-6">
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
                <p class="text-sm font-semibold text-ink">Delete account</p>
                <p class="text-xs text-muted">
                  Permanently remove your profile, applications and saved jobs.
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
