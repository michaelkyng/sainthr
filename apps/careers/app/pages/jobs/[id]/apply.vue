<script setup lang="ts">
import {
  ArrowLeft,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  CloudUpload,
  FileText,
  MapPin,
  Wallet,
  X,
} from "@lucide/vue"

defineOptions({ name: "CareersJobApplyPage" })
definePageMeta({ middleware: "candidate" })

const route = useRoute()
const { getJobById } = useJobs()
const { profile } = storeToRefs(useProfileStore())
const { email, fullName } = useSharedAuth()

const job = computed(() => getJobById(route.params.id as string))

useHead(() => ({
  title: job.value ? `Apply – ${job.value.title} at ${job.value.company}` : "Apply",
}))

const form = reactive({
  fullName: profile.value.fullName || fullName.value || "",
  email: profile.value.email || email.value || "",
  phone: "",
  coverLetter: "",
  portfolioUrl: profile.value.linkedinUrl || "",
})

const useExistingResume = ref(!!profile.value.resumeName)
const resumeFile = ref<File | null>(null)
const isDragging = ref(false)
const fileInputRef = ref<HTMLInputElement | null>(null)
const submitted = ref(false)

const ACCEPTED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]

const formatSize = (bytes: number) =>
  bytes < 1024 * 1024
    ? `${(bytes / 1024).toFixed(0)} KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)} MB`

const handleFileSelect = (file: File | null) => {
  if (!file) return
  if (!ACCEPTED_TYPES.includes(file.type) && !/\.(pdf|doc|docx)$/i.test(file.name)) return
  resumeFile.value = file
  useExistingResume.value = false
}

const handleDrop = (e: DragEvent) => {
  isDragging.value = false
  handleFileSelect(e.dataTransfer?.files[0] ?? null)
}

const handleFileChange = (e: Event) => {
  handleFileSelect((e.target as HTMLInputElement).files?.[0] ?? null)
}

const hasResume = computed(() => useExistingResume.value || !!resumeFile.value)

const canSubmit = computed(() => (
  !!form.fullName.trim()
  && !!form.email.trim()
  && !!form.coverLetter.trim()
  && hasResume.value
))

const submit = () => {
  if (!canSubmit.value) return
  submitted.value = true
}
</script>

<template>
  <div>
    <div v-if="!job" class="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <p class="font-display text-2xl font-semibold text-ink">
        Job not found
      </p>
      <UiButton as-child class="px-5">
        <NuxtLink to="/jobs">
          <ArrowLeft class="size-4" /> Back to jobs
        </NuxtLink>
      </UiButton>
    </div>

    <div v-else>
      <!-- Breadcrumb -->
      <div class="border-b border-line bg-panel">
        <div class="mx-auto flex max-w-4xl items-center gap-2 px-5 py-4 text-sm text-muted lg:px-8">
          <NuxtLink to="/jobs" class="flex items-center gap-1.5 font-semibold transition hover:text-ink">
            <ArrowLeft class="size-3.5" /> Jobs
          </NuxtLink>
          <span>/</span>
          <NuxtLink :to="`/jobs/${job.id}`" class="transition hover:text-ink">
            {{ job.title }}
          </NuxtLink>
          <span>/</span>
          <span class="font-semibold text-ink">Apply</span>
        </div>
      </div>

      <div class="mx-auto max-w-4xl px-5 py-10 lg:px-8">
        <!-- Success state -->
        <UiCard v-if="submitted" variant="panel" class="flex flex-col items-center gap-5 p-10 text-center">
          <div class="flex size-16 items-center justify-center rounded-2xl bg-mint text-green">
            <CheckCircle2 class="size-8" />
          </div>
          <div>
            <h1 class="font-display text-2xl font-semibold text-ink">
              Application sent!
            </h1>
            <p class="mt-2 text-sm text-muted">
              {{ job.company }} will be in touch if your background matches their needs.
            </p>
          </div>
          <div class="mt-2 flex flex-wrap items-center gap-3">
            <UiButton as-child>
              <NuxtLink to="/jobs">
                Browse more roles <ArrowUpRight class="size-4" />
              </NuxtLink>
            </UiButton>
            <UiButton as-child variant="secondary" class="bg-paper">
              <NuxtLink to="/profile">
                View profile
              </NuxtLink>
            </UiButton>
          </div>
        </UiCard>

        <!-- Application form -->
        <template v-else>
          <!-- Job summary header -->
          <UiCard variant="panel" class="mb-6 flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:justify-between">
            <div class="flex items-start gap-4">
              <div class="flex size-12 shrink-0 items-center justify-center rounded-2xl border border-line bg-paper text-ink">
                <Building2 class="size-5" />
              </div>
              <div>
                <p class="text-xs font-semibold uppercase tracking-widest text-muted/70">
                  Applying for
                </p>
                <h1 class="mt-1 font-display text-xl font-semibold text-ink">
                  {{ job.title }}
                </h1>
                <p class="mt-1 text-sm text-muted">
                  {{ job.company }}
                </p>
                <div class="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted">
                  <span class="flex items-center gap-1.5">
                    <MapPin class="size-3.5" /> {{ job.location }}
                  </span>
                  <span class="flex items-center gap-1.5">
                    <Wallet class="size-3.5" /> {{ job.salary }}
                  </span>
                </div>
              </div>
            </div>
          </UiCard>

          <UiCard variant="panel" class="overflow-hidden">
            <div class="border-b border-line px-6 py-4">
              <h2 class="font-display text-lg font-semibold text-ink">
                Your application
              </h2>
              <p class="mt-0.5 text-xs text-muted">
                We pre-filled some fields from your profile. Review and submit.
              </p>
            </div>

            <form class="flex flex-col gap-5 p-6" @submit.prevent="submit">
              <div class="grid gap-4 sm:grid-cols-2">
                <div class="flex flex-col gap-1.5">
                  <UiLabel for="apply-name" required>Full name</UiLabel>
                  <UiInput id="apply-name" v-model="form.fullName" placeholder="Your name" />
                </div>
                <div class="flex flex-col gap-1.5">
                  <UiLabel for="apply-email" required>Email</UiLabel>
                  <UiInput id="apply-email" v-model="form.email" type="email" placeholder="you@example.com" />
                </div>
              </div>

              <div class="grid gap-4 sm:grid-cols-2">
                <div class="flex flex-col gap-1.5">
                  <UiLabel for="apply-phone">Phone</UiLabel>
                  <UiInput id="apply-phone" v-model="form.phone" type="tel" placeholder="+234..." />
                </div>
                <div class="flex flex-col gap-1.5">
                  <UiLabel for="apply-portfolio">LinkedIn / portfolio</UiLabel>
                  <UiInput id="apply-portfolio" v-model="form.portfolioUrl" type="url" placeholder="https://..." />
                </div>
              </div>

              <div class="flex flex-col gap-1.5">
                <div class="flex items-center justify-between">
                  <UiLabel for="apply-cover" required>Cover letter</UiLabel>
                  <span class="text-xs text-muted">{{ form.coverLetter.length }}/1500</span>
                </div>
                <UiTextarea
                  id="apply-cover"
                  v-model="form.coverLetter"
                  :rows="6"
                  :maxlength="1500"
                  placeholder="Tell the hiring team why you're a great fit for this role..."
                />
              </div>

              <div class="flex flex-col gap-2">
                <UiLabel required>Resume</UiLabel>

                <div
                  v-if="useExistingResume && profile.resumeName"
                  class="flex items-center gap-3 rounded-xl border border-line bg-paper p-4"
                >
                  <div class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-green/10 text-green">
                    <FileText class="size-5" />
                  </div>
                  <div class="min-w-0 flex-1">
                    <p class="truncate text-sm font-semibold text-ink">
                      {{ profile.resumeName }}
                    </p>
                    <p v-if="profile.resumeSize" class="text-xs text-muted">
                      From your profile · {{ profile.resumeSize }}
                    </p>
                  </div>
                  <button
                    type="button"
                    class="text-xs font-semibold text-green transition hover:text-ink"
                    @click="useExistingResume = false"
                  >
                    Upload different
                  </button>
                </div>

                <div
                  v-else-if="resumeFile"
                  class="flex items-center gap-3 rounded-xl border border-line bg-paper p-4"
                >
                  <div class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-green/10 text-green">
                    <FileText class="size-5" />
                  </div>
                  <div class="min-w-0 flex-1">
                    <p class="truncate text-sm font-semibold text-ink">
                      {{ resumeFile.name }}
                    </p>
                    <p class="text-xs text-muted">
                      {{ formatSize(resumeFile.size) }}
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label="Remove file"
                    class="rounded-full p-1.5 text-muted transition hover:bg-line hover:text-ink"
                    @click="resumeFile = null"
                  >
                    <X class="size-4" />
                  </button>
                </div>

                <label
                  v-else
                  :class="[
                    'flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed p-6 text-center transition',
                    isDragging ? 'border-green bg-mint/30' : 'border-line bg-paper/50 hover:border-ink/20',
                  ]"
                  @dragover.prevent="isDragging = true"
                  @dragleave.prevent="isDragging = false"
                  @drop.prevent="handleDrop"
                >
                  <div class="flex size-10 items-center justify-center rounded-xl bg-paper text-muted">
                    <CloudUpload class="size-5" />
                  </div>
                  <p class="text-sm font-semibold text-ink">
                    Drop your resume here, or click to browse
                  </p>
                  <p class="text-xs text-muted">
                    PDF, DOC, or DOCX · up to 5MB
                  </p>
                  <input
                    ref="fileInputRef"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    class="hidden"
                    @change="handleFileChange"
                  >
                </label>
              </div>

              <div class="flex flex-wrap items-center justify-end gap-3 border-t border-line pt-5">
                <UiButton as-child variant="secondary" class="bg-paper">
                  <NuxtLink :to="`/jobs/${job.id}`">
                    Cancel
                  </NuxtLink>
                </UiButton>
                <UiButton type="submit" :disabled="!canSubmit">
                  Submit application <ArrowUpRight class="size-4" />
                </UiButton>
              </div>
            </form>
          </UiCard>
        </template>
      </div>
    </div>
  </div>
</template>
