<script setup lang="ts">
import {
  ArrowUpRight,
  CheckCircle2,
  Edit2,
  ExternalLink,
  FileText,
  MapPin,
} from "@lucide/vue"

defineOptions({ name: "CareersProfilePage" })

useHead({ title: "My Profile – SaintHR Careers" })

const router = useRouter()
const { profile, initials, completionItems, completionScore } = useProfile()

onMounted(() => {
  if (!profile.value.fullName) router.push("/auth/login")
  else if (!profile.value.isOnboarded) router.push("/onboarding")
})
</script>

<template>
  <div>
    <!-- ── Profile header ──────────────────────────────── -->
    <div class="bg-ink text-white">
      <div class="mx-auto max-w-4xl px-5 py-10 lg:px-8">
        <div class="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div class="flex items-start gap-5">
            <!-- Avatar -->
            <div
              class="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-white/10 font-display text-2xl font-semibold text-white ring-2 ring-white/15"
            >
              {{ initials }}
            </div>

            <div class="flex flex-col gap-2">
              <h1 class="font-display text-2xl font-semibold leading-tight md:text-3xl">
                {{ profile.fullName }}
              </h1>
              <p class="text-sm text-white/60">{{ profile.jobTitle || "Add a job title" }}</p>
              <div class="flex flex-wrap items-center gap-2">
                <span v-if="profile.location" class="flex items-center gap-1 text-xs text-white/50">
                  <MapPin class="size-3" /> {{ profile.location }}
                </span>
                <span
                  v-if="profile.experience"
                  class="rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold text-white/75"
                >
                  {{ profile.experience }}
                </span>
                <span
                  v-if="profile.preferredArrangements.length"
                  class="rounded-full bg-mint/20 px-2.5 py-1 text-xs font-semibold text-mint"
                >
                  Open to work
                </span>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex shrink-0 flex-wrap items-center gap-2">
            <NuxtLink
              to="/onboarding"
              class="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/20"
            >
              <Edit2 class="size-3.5" /> Edit profile
            </NuxtLink>
            <a
              v-if="profile.linkedinUrl"
              :href="profile.linkedinUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/20"
            >
              <ExternalLink class="size-3.5" /> LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Body ───────────────────────────────────────── -->
    <div class="mx-auto max-w-4xl px-5 py-8 lg:px-8">
      <div class="grid gap-5 lg:grid-cols-[1fr_272px]">
        <!-- Left column -->
        <div class="flex flex-col gap-5">
          <!-- About -->
          <div class="rounded-2xl border border-line bg-panel p-6">
            <h2 class="mb-4 font-display text-lg font-semibold text-ink">About</h2>
            <p v-if="profile.bio" class="text-sm leading-7 text-muted">{{ profile.bio }}</p>
            <div v-else class="flex flex-col items-center gap-3 py-5 text-center">
              <p class="text-sm text-muted">No bio added yet.</p>
              <NuxtLink
                to="/onboarding"
                class="text-xs font-semibold text-green transition hover:text-ink"
              >
                + Add a bio
              </NuxtLink>
            </div>
          </div>

          <!-- Skills -->
          <div class="rounded-2xl border border-line bg-panel p-6">
            <h2 class="mb-4 font-display text-lg font-semibold text-ink">Skills</h2>
            <div v-if="profile.skills.length" class="flex flex-wrap gap-2">
              <span
                v-for="skill in profile.skills"
                :key="skill"
                class="rounded-full border border-line bg-paper px-3.5 py-1.5 text-xs font-semibold text-muted"
              >
                {{ skill }}
              </span>
            </div>
            <div v-else class="flex flex-col items-center gap-3 py-5 text-center">
              <p class="text-sm text-muted">No skills added yet.</p>
              <NuxtLink
                to="/onboarding"
                class="text-xs font-semibold text-green transition hover:text-ink"
              >
                + Add skills
              </NuxtLink>
            </div>
          </div>

          <!-- Work preferences -->
          <div class="rounded-2xl border border-line bg-panel p-6">
            <h2 class="mb-4 font-display text-lg font-semibold text-ink">Work Preferences</h2>
            <div
              v-if="profile.preferredJobTypes.length || profile.preferredArrangements.length"
              class="flex flex-col gap-5"
            >
              <div v-if="profile.preferredJobTypes.length">
                <p class="mb-2.5 text-xs font-semibold uppercase tracking-wider text-muted/60">
                  Job type
                </p>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="type in profile.preferredJobTypes"
                    :key="type"
                    class="rounded-full border border-ink/15 bg-ink/5 px-3.5 py-1.5 text-xs font-semibold text-ink"
                  >
                    {{ type }}
                  </span>
                </div>
              </div>
              <div v-if="profile.preferredArrangements.length">
                <p class="mb-2.5 text-xs font-semibold uppercase tracking-wider text-muted/60">
                  Work arrangement
                </p>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="arr in profile.preferredArrangements"
                    :key="arr"
                    class="rounded-full border border-green/20 bg-mint px-3.5 py-1.5 text-xs font-semibold text-green"
                  >
                    {{ arr }}
                  </span>
                </div>
              </div>
            </div>
            <div v-else class="flex flex-col items-center gap-3 py-5 text-center">
              <p class="text-sm text-muted">No preferences set yet.</p>
              <NuxtLink
                to="/onboarding"
                class="text-xs font-semibold text-green transition hover:text-ink"
              >
                + Set preferences
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Right column -->
        <div class="flex flex-col gap-5">
          <!-- Resume card -->
          <div class="rounded-2xl border border-line bg-panel p-6">
            <h3 class="mb-4 font-display text-base font-semibold text-ink">Resume</h3>
            <div
              v-if="profile.resumeName"
              class="flex items-center gap-3 rounded-xl border border-line bg-paper p-4"
            >
              <div
                class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-green/10 text-green"
              >
                <FileText class="size-5" />
              </div>
              <div class="min-w-0 flex-1">
                <p class="truncate text-sm font-semibold text-ink">{{ profile.resumeName }}</p>
                <p v-if="profile.resumeSize" class="text-xs text-muted">{{ profile.resumeSize }}</p>
              </div>
            </div>
            <div
              v-else
              class="flex flex-col items-center gap-3 rounded-xl border border-dashed border-line p-6 text-center"
            >
              <div class="flex size-10 items-center justify-center rounded-xl bg-paper text-muted">
                <FileText class="size-5" />
              </div>
              <p class="text-xs text-muted">No resume uploaded yet</p>
              <NuxtLink
                to="/onboarding"
                class="text-xs font-semibold text-green transition hover:text-ink"
              >
                Upload resume
              </NuxtLink>
            </div>
          </div>

          <!-- Profile strength -->
          <div class="rounded-2xl border border-line bg-panel p-6">
            <div class="mb-3 flex items-center justify-between">
              <h3 class="font-display text-base font-semibold text-ink">Profile strength</h3>
              <span class="font-display text-lg font-semibold text-green">{{ completionScore }}%</span>
            </div>
            <div class="mb-4 h-1.5 overflow-hidden rounded-full bg-line">
              <div
                class="h-full rounded-full bg-green transition-all duration-700"
                :style="{ width: `${completionScore}%` }"
              />
            </div>
            <ul class="flex flex-col gap-2.5">
              <li
                v-for="item in completionItems"
                :key="item.label"
                class="flex items-center gap-2.5"
              >
                <CheckCircle2
                  :class="['size-4 shrink-0 transition-colors', item.done ? 'text-green' : 'text-line']"
                />
                <span :class="['text-xs', item.done ? 'font-semibold text-ink' : 'text-muted']">
                  {{ item.label }}
                </span>
              </li>
            </ul>
          </div>

          <!-- Browse jobs CTA -->
          <NuxtLink
            to="/jobs"
            class="group flex items-center justify-between gap-2 rounded-2xl border border-line bg-ink p-5 text-white transition-all duration-200 hover:bg-ink-2"
          >
            <div>
              <p class="font-display text-sm font-semibold">Browse open roles</p>
              <p class="mt-0.5 text-xs text-white/55">Find your next opportunity</p>
            </div>
            <ArrowUpRight class="size-5 text-white/40 transition group-hover:text-white" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
