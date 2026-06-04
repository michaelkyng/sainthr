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
definePageMeta({ middleware: ["candidate", "onboarded"] })

useHead({ title: "My Profile – SaintHR Careers" })

const { profile, initials, completionItems, completionScore } = storeToRefs(useProfileStore())
const { fullName, user } = useSharedAuth()

const userImageUrl = computed(() => user.value?.imageUrl ?? "")
const headerName = computed(() => profile.value.fullName || fullName.value || "Your profile")
</script>

<template>
  <div>
    <!-- Profile header -->
    <div class="bg-ink text-white">
      <div class="mx-auto max-w-4xl px-5 py-10 lg:px-8">
        <div class="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div class="flex items-start gap-5">
            <UiAvatar class="size-20 rounded-2xl ring-2 ring-white/15">
              <UiAvatarImage v-if="userImageUrl" :src="userImageUrl" :alt="headerName" />
              <UiAvatarFallback class="rounded-2xl bg-white/10 font-display text-2xl">
                {{ initials }}
              </UiAvatarFallback>
            </UiAvatar>

            <div class="flex flex-col gap-2">
              <h1 class="font-display text-2xl font-semibold leading-tight md:text-3xl">
                {{ profile.fullName }}
              </h1>
              <p class="text-sm text-white/60">
                {{ profile.jobTitle || "Add a job title" }}
              </p>
              <div class="flex flex-wrap items-center gap-2">
                <span v-if="profile.location" class="flex items-center gap-1 text-xs text-white/50">
                  <MapPin class="size-3" /> {{ profile.location }}
                </span>
                <UiBadge v-if="profile.experience" class="bg-white/10 px-2.5 py-1 text-white/75">
                  {{ profile.experience }}
                </UiBadge>
                <UiBadge
                  v-if="profile.preferredArrangements.length"
                  class="bg-mint/20 px-2.5 py-1 text-mint"
                >
                  Open to work
                </UiBadge>
              </div>
            </div>
          </div>

          <div class="flex shrink-0 flex-wrap items-center gap-2">
            <UiButton as-child variant="secondary" size="sm" class="border-white/20 bg-white/10 text-white hover:border-white/30 hover:bg-white/20">
              <NuxtLink to="/onboarding">
                <Edit2 class="size-3.5" /> Edit profile
              </NuxtLink>
            </UiButton>
            <UiButton
              v-if="profile.linkedinUrl"
              as-child
              variant="secondary"
              size="sm"
              class="border-white/20 bg-white/10 text-white hover:border-white/30 hover:bg-white/20"
            >
              <a :href="profile.linkedinUrl" target="_blank" rel="noopener noreferrer">
                <ExternalLink class="size-3.5" /> LinkedIn
              </a>
            </UiButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Body -->
    <div class="mx-auto max-w-4xl px-5 py-8 lg:px-8">
      <div class="grid gap-5 lg:grid-cols-[1fr_272px]">
        <!-- Left column -->
        <div class="flex flex-col gap-5">
          <UiCard variant="panel" class="p-6">
            <h2 class="mb-4 font-display text-lg font-semibold text-ink">
              About
            </h2>
            <p v-if="profile.bio" class="text-sm leading-7 text-muted">
              {{ profile.bio }}
            </p>
            <div v-else class="flex flex-col items-center gap-3 py-5 text-center">
              <p class="text-sm text-muted">
                No bio added yet.
              </p>
              <NuxtLink
                to="/onboarding"
                class="text-xs font-semibold text-green transition hover:text-ink"
              >
                + Add a bio
              </NuxtLink>
            </div>
          </UiCard>

          <UiCard variant="panel" class="p-6">
            <h2 class="mb-4 font-display text-lg font-semibold text-ink">
              Skills
            </h2>
            <div v-if="profile.skills.length" class="flex flex-wrap gap-2">
              <UiBadge
                v-for="skill in profile.skills"
                :key="skill"
                variant="outline"
                class="bg-paper px-3.5 py-1.5"
              >
                {{ skill }}
              </UiBadge>
            </div>
            <div v-else class="flex flex-col items-center gap-3 py-5 text-center">
              <p class="text-sm text-muted">
                No skills added yet.
              </p>
              <NuxtLink
                to="/onboarding"
                class="text-xs font-semibold text-green transition hover:text-ink"
              >
                + Add skills
              </NuxtLink>
            </div>
          </UiCard>

          <UiCard variant="panel" class="p-6">
            <h2 class="mb-4 font-display text-lg font-semibold text-ink">
              Work Preferences
            </h2>
            <div
              v-if="profile.preferredJobTypes.length || profile.preferredArrangements.length"
              class="flex flex-col gap-5"
            >
              <div v-if="profile.preferredJobTypes.length">
                <p class="mb-2.5 text-xs font-semibold uppercase tracking-wider text-muted/60">
                  Job type
                </p>
                <div class="flex flex-wrap gap-2">
                  <UiBadge
                    v-for="type in profile.preferredJobTypes"
                    :key="type"
                    class="border border-ink/15 bg-ink/5 px-3.5 py-1.5 text-ink"
                  >
                    {{ type }}
                  </UiBadge>
                </div>
              </div>
              <div v-if="profile.preferredArrangements.length">
                <p class="mb-2.5 text-xs font-semibold uppercase tracking-wider text-muted/60">
                  Work arrangement
                </p>
                <div class="flex flex-wrap gap-2">
                  <UiBadge
                    v-for="arr in profile.preferredArrangements"
                    :key="arr"
                    variant="mint"
                    class="border border-green/20 px-3.5 py-1.5"
                  >
                    {{ arr }}
                  </UiBadge>
                </div>
              </div>
            </div>
            <div v-else class="flex flex-col items-center gap-3 py-5 text-center">
              <p class="text-sm text-muted">
                No preferences set yet.
              </p>
              <NuxtLink
                to="/onboarding"
                class="text-xs font-semibold text-green transition hover:text-ink"
              >
                + Set preferences
              </NuxtLink>
            </div>
          </UiCard>
        </div>

        <!-- Right column -->
        <div class="flex flex-col gap-5">
          <UiCard variant="panel" class="p-6">
            <h3 class="mb-4 font-display text-base font-semibold text-ink">
              Resume
            </h3>
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
                <p class="truncate text-sm font-semibold text-ink">
                  {{ profile.resumeName }}
                </p>
                <p v-if="profile.resumeSize" class="text-xs text-muted">
                  {{ profile.resumeSize }}
                </p>
              </div>
            </div>
            <div
              v-else
              class="flex flex-col items-center gap-3 rounded-xl border border-dashed border-line p-6 text-center"
            >
              <div class="flex size-10 items-center justify-center rounded-xl bg-paper text-muted">
                <FileText class="size-5" />
              </div>
              <p class="text-xs text-muted">
                No resume uploaded yet
              </p>
              <NuxtLink
                to="/onboarding"
                class="text-xs font-semibold text-green transition hover:text-ink"
              >
                Upload resume
              </NuxtLink>
            </div>
          </UiCard>

          <UiCard variant="panel" class="p-6">
            <div class="mb-3 flex items-center justify-between">
              <h3 class="font-display text-base font-semibold text-ink">
                Profile strength
              </h3>
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
          </UiCard>

          <NuxtLink
            to="/jobs"
            class="group flex items-center justify-between gap-2 rounded-2xl border border-line bg-ink p-5 text-white transition-all duration-200 hover:bg-ink-2"
          >
            <div>
              <p class="font-display text-sm font-semibold">
                Browse open roles
              </p>
              <p class="mt-0.5 text-xs text-white/55">
                Find your next opportunity
              </p>
            </div>
            <ArrowUpRight class="size-5 text-white/40 transition group-hover:text-white" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
