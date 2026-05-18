<script setup lang="ts">
import { ArrowLeft, ArrowRight, CheckCircle2, CloudUpload, FileText, X } from "@lucide/vue"

defineOptions({ name: "CareersOnboardingPage" })
definePageMeta({ layout: "onboarding" })

useHead({ title: "Set up your profile – SaintHR" })

const router = useRouter()
const { profile } = useProfile()

const TOTAL_STEPS = 3
const step = ref(1)

const STEP_META = [
  { label: "About you", desc: "Tell us a bit about your background." },
  { label: "Your expertise", desc: "Add your skills and work preferences." },
  { label: "Your resume", desc: "Upload your CV and add your online profiles." },
]

// ── Step 1 ──────────────────────────────────────────────
const jobTitle = ref(profile.value.jobTitle || "")
const experience = ref(profile.value.experience || "")
const location = ref(profile.value.location || "")
const bio = ref(profile.value.bio || "")

const experienceOptions = ["< 1 year", "1–3 years", "3–5 years", "5–10 years", "10+ years"]

// ── Step 2 ──────────────────────────────────────────────
const ALL_SKILLS = [
  "Recruitment", "Payroll", "HRIS", "Compliance", "L&D",
  "Employee Relations", "Talent Management", "Performance Mgmt",
  "HR Analytics", "Compensation", "Onboarding", "Policy Dev",
  "Org Design", "D&I", "Change Management", "Workforce Planning",
]
const JOB_TYPES = ["Full-time", "Part-time", "Contract"]
const ARRANGEMENTS = ["Remote", "Hybrid", "On-site"]

const selectedSkills = ref<string[]>([...profile.value.skills])
const selectedJobTypes = ref<string[]>([...profile.value.preferredJobTypes])
const selectedArrangements = ref<string[]>([...profile.value.preferredArrangements])

const toggleSkill = (s: string) => {
  const i = selectedSkills.value.indexOf(s)
  i >= 0 ? selectedSkills.value.splice(i, 1) : selectedSkills.value.push(s)
}
const toggleJobType = (s: string) => {
  const i = selectedJobTypes.value.indexOf(s)
  i >= 0 ? selectedJobTypes.value.splice(i, 1) : selectedJobTypes.value.push(s)
}
const toggleArrangement = (s: string) => {
  const i = selectedArrangements.value.indexOf(s)
  i >= 0 ? selectedArrangements.value.splice(i, 1) : selectedArrangements.value.push(s)
}

// ── Step 3 ──────────────────────────────────────────────
const fileInputRef = ref<HTMLInputElement | null>(null)
const resumeFile = ref<File | null>(null)
const isDragging = ref(false)
const linkedinUrl = ref(profile.value.linkedinUrl || "")

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
}

const handleDrop = (e: DragEvent) => {
  isDragging.value = false
  handleFileSelect(e.dataTransfer?.files[0] ?? null)
}

const handleFileChange = (e: Event) => {
  handleFileSelect((e.target as HTMLInputElement).files?.[0] ?? null)
}

// ── Navigation ──────────────────────────────────────────
const isDone = computed(() => step.value > TOTAL_STEPS)

const canContinue = computed(() => {
  if (step.value === 1) return !!jobTitle.value.trim() && !!experience.value
  if (step.value === 2) return selectedSkills.value.length > 0
  return true
})

const saveStep = () => {
  if (step.value === 1) {
    Object.assign(profile.value, {
      jobTitle: jobTitle.value.trim(),
      experience: experience.value,
      location: location.value.trim(),
      bio: bio.value.trim(),
    })
  }
  else if (step.value === 2) {
    Object.assign(profile.value, {
      skills: [...selectedSkills.value],
      preferredJobTypes: [...selectedJobTypes.value],
      preferredArrangements: [...selectedArrangements.value],
    })
  }
  else if (step.value === 3) {
    if (resumeFile.value) {
      profile.value.resumeName = resumeFile.value.name
      profile.value.resumeSize = formatSize(resumeFile.value.size)
    }
    profile.value.linkedinUrl = linkedinUrl.value.trim()
    profile.value.isOnboarded = true
  }
}

const goNext = () => {
  saveStep()
  step.value++
}

const goBack = () => {
  step.value--
}

const skipStep = () => {
  if (step.value === TOTAL_STEPS) profile.value.isOnboarded = true
  step.value++
}
</script>

<template>
  <div class="w-full max-w-lg">
    <Transition name="step" mode="out-in">
      <!-- ── Completion screen ───────────────────────────── -->
      <div
        v-if="isDone"
        key="done"
        class="w-full rounded-3xl border border-line/50 bg-white p-10 text-center shadow-[0_24px_80px_rgba(16,30,68,0.14)]"
      >
        <div class="mb-5 flex justify-center">
          <div class="flex size-20 items-center justify-center rounded-full bg-mint">
            <CheckCircle2 class="size-10 text-green" />
          </div>
        </div>
        <h2 class="font-display text-2xl font-semibold text-ink">You're all set!</h2>
        <p class="mx-auto mt-2 max-w-xs text-sm leading-6 text-muted">
          Your profile is live. Start exploring roles that match your background.
        </p>

        <ul class="mx-auto mt-6 flex max-w-xs flex-col gap-2.5 text-left">
          <li class="flex items-center gap-2.5 text-sm text-muted">
            <CheckCircle2 class="size-4 shrink-0 text-green" />
            {{ profile.skills.length }} skill{{ profile.skills.length !== 1 ? "s" : "" }} added
          </li>
          <li v-if="profile.preferredJobTypes.length" class="flex items-center gap-2.5 text-sm text-muted">
            <CheckCircle2 class="size-4 shrink-0 text-green" />
            Work preferences saved
          </li>
          <li v-if="profile.resumeName" class="flex items-center gap-2.5 text-sm text-muted">
            <CheckCircle2 class="size-4 shrink-0 text-green" />
            Resume uploaded
          </li>
        </ul>

        <div class="mt-8 flex flex-col gap-3">
          <button
            class="flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-ink-2"
            type="button"
            @click="router.push('/profile')"
          >
            View my profile
          </button>
          <NuxtLink
            to="/jobs"
            class="flex w-full items-center justify-center gap-2 rounded-full border border-line px-6 py-3.5 text-sm font-semibold text-ink transition hover:border-ink/30 hover:bg-paper"
          >
            Browse jobs
          </NuxtLink>
        </div>
      </div>

      <!-- ── Step card ──────────────────────────────────── -->
      <div
        v-else
        :key="step"
        class="w-full overflow-hidden rounded-3xl border border-line/50 bg-white shadow-[0_24px_80px_rgba(16,30,68,0.14)]"
      >
        <!-- Progress + header -->
        <div class="border-b border-line px-8 pb-6 pt-8">
          <div class="mb-5 flex gap-1.5">
            <div
              v-for="i in TOTAL_STEPS"
              :key="i"
              :class="[
                'h-1 flex-1 rounded-full transition-all duration-500',
                i < step ? 'bg-green' : i === step ? 'bg-ink' : 'bg-line',
              ]"
            />
          </div>
          <p class="mb-1 text-xs font-semibold text-muted">Step {{ step }} of {{ TOTAL_STEPS }}</p>
          <h2 class="font-display text-xl font-semibold text-ink">{{ STEP_META[step - 1].label }}</h2>
          <p class="mt-0.5 text-sm text-muted">{{ STEP_META[step - 1].desc }}</p>
        </div>

        <!-- Step content -->
        <div class="px-8 py-7">
          <!-- Step 1: About you -->
          <div v-if="step === 1" class="flex flex-col gap-4">
            <label class="flex flex-col gap-1.5">
              <span class="text-xs font-semibold text-ink">
                Current or target job title
                <span class="text-coral">*</span>
              </span>
              <input
                v-model="jobTitle"
                class="rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink outline-none placeholder:text-muted transition-colors focus:border-ink/40"
                placeholder="e.g. HR Business Partner"
                type="text"
              >
            </label>

            <label class="flex flex-col gap-1.5">
              <span class="text-xs font-semibold text-ink">
                Years of experience
                <span class="text-coral">*</span>
              </span>
              <select
                v-model="experience"
                class="appearance-none rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink/40"
              >
                <option value="" disabled>Select experience level</option>
                <option v-for="opt in experienceOptions" :key="opt" :value="opt">{{ opt }}</option>
              </select>
            </label>

            <label class="flex flex-col gap-1.5">
              <span class="text-xs font-semibold text-ink">Location</span>
              <input
                v-model="location"
                class="rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink outline-none placeholder:text-muted transition-colors focus:border-ink/40"
                placeholder="e.g. Lagos, Nigeria"
                type="text"
              >
            </label>

            <label class="flex flex-col gap-1.5">
              <div class="flex items-center justify-between">
                <span class="text-xs font-semibold text-ink">
                  Short bio
                  <span class="font-normal text-muted">(optional)</span>
                </span>
                <span class="text-xs text-muted">{{ bio.length }}/200</span>
              </div>
              <textarea
                v-model="bio"
                class="resize-none rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink outline-none placeholder:text-muted transition-colors focus:border-ink/40"
                placeholder="Brief summary of your HR background and what you're looking for..."
                rows="3"
                maxlength="200"
              />
            </label>
          </div>

          <!-- Step 2: Expertise -->
          <div v-else-if="step === 2" class="flex flex-col gap-7">
            <div>
              <p class="mb-3 text-xs font-semibold text-ink">
                Skills
                <span class="font-normal text-muted">(select all that apply)</span>
              </p>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="skill in ALL_SKILLS"
                  :key="skill"
                  :class="[
                    'rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-200',
                    selectedSkills.includes(skill)
                      ? 'border-green bg-mint text-green'
                      : 'border-line bg-paper text-muted hover:border-ink/30 hover:text-ink',
                  ]"
                  type="button"
                  @click="toggleSkill(skill)"
                >
                  {{ skill }}
                </button>
              </div>
              <p v-if="selectedSkills.length === 0" class="mt-2 text-xs text-muted">
                Select at least one skill to continue.
              </p>
            </div>

            <div>
              <p class="mb-3 text-xs font-semibold text-ink">Preferred job type</p>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="type in JOB_TYPES"
                  :key="type"
                  :class="[
                    'rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200',
                    selectedJobTypes.includes(type)
                      ? 'border-ink bg-ink text-white'
                      : 'border-line bg-paper text-muted hover:border-ink/30 hover:text-ink',
                  ]"
                  type="button"
                  @click="toggleJobType(type)"
                >
                  {{ type }}
                </button>
              </div>
            </div>

            <div>
              <p class="mb-3 text-xs font-semibold text-ink">Preferred work arrangement</p>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="arr in ARRANGEMENTS"
                  :key="arr"
                  :class="[
                    'rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200',
                    selectedArrangements.includes(arr)
                      ? 'border-green bg-mint text-green'
                      : 'border-line bg-paper text-muted hover:border-ink/30 hover:text-ink',
                  ]"
                  type="button"
                  @click="toggleArrangement(arr)"
                >
                  {{ arr }}
                </button>
              </div>
            </div>
          </div>

          <!-- Step 3: Resume -->
          <div v-else-if="step === 3" class="flex flex-col gap-5">
            <div>
              <p class="mb-2 text-xs font-semibold text-ink">Resume / CV</p>

              <!-- File selected -->
              <div
                v-if="resumeFile"
                class="flex items-center gap-3 rounded-xl border border-green/30 bg-mint/20 p-4"
              >
                <div class="flex size-10 shrink-0 items-center justify-center rounded-lg bg-green/15 text-green">
                  <FileText class="size-5" />
                </div>
                <div class="min-w-0 flex-1">
                  <p class="truncate text-sm font-semibold text-ink">{{ resumeFile.name }}</p>
                  <p class="text-xs text-muted">{{ formatSize(resumeFile.size) }}</p>
                </div>
                <button
                  class="text-muted transition hover:text-ink"
                  type="button"
                  aria-label="Remove file"
                  @click="resumeFile = null"
                >
                  <X class="size-4" />
                </button>
              </div>

              <!-- Dropzone -->
              <div
                v-else
                :class="[
                  'flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 text-center transition-all duration-200',
                  isDragging
                    ? 'border-ink bg-ink/5'
                    : 'border-line bg-paper hover:border-ink/40 hover:bg-ink/[0.02]',
                ]"
                @dragover.prevent="isDragging = true"
                @dragleave.prevent="isDragging = false"
                @drop.prevent="handleDrop"
                @click="fileInputRef?.click()"
              >
                <div class="flex size-12 items-center justify-center rounded-xl bg-line/40 text-muted">
                  <CloudUpload class="size-6" />
                </div>
                <div>
                  <p class="text-sm font-semibold text-ink">
                    Drop your file here or
                    <span class="text-green">browse</span>
                  </p>
                  <p class="mt-0.5 text-xs text-muted">PDF, DOC or DOCX · up to 5 MB</p>
                </div>
              </div>

              <input
                ref="fileInputRef"
                type="file"
                class="hidden"
                accept=".pdf,.doc,.docx"
                @change="handleFileChange"
              >
            </div>

            <label class="flex flex-col gap-1.5">
              <span class="text-xs font-semibold text-ink">
                LinkedIn URL
                <span class="font-normal text-muted">(optional)</span>
              </span>
              <input
                v-model="linkedinUrl"
                class="rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink outline-none placeholder:text-muted transition-colors focus:border-ink/40"
                placeholder="https://linkedin.com/in/yourprofile"
                type="url"
              >
            </label>

            <p class="text-xs leading-5 text-muted">
              You can always update your resume later from your profile page.
            </p>
          </div>
        </div>

        <!-- Navigation -->
        <div class="flex items-center justify-between border-t border-line px-8 py-5">
          <button
            v-if="step > 1"
            class="flex items-center gap-1.5 text-sm font-semibold text-muted transition hover:text-ink"
            type="button"
            @click="goBack"
          >
            <ArrowLeft class="size-4" /> Back
          </button>
          <span v-else />

          <div class="flex items-center gap-3">
            <button
              v-if="step === TOTAL_STEPS"
              class="text-sm font-semibold text-muted transition hover:text-ink"
              type="button"
              @click="skipStep"
            >
              Skip
            </button>
            <button
              :class="[
                'flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-200',
                canContinue
                  ? 'bg-ink text-white hover:bg-ink-2'
                  : 'cursor-not-allowed bg-line text-muted',
              ]"
              type="button"
              :disabled="!canContinue"
              @click="goNext"
            >
              {{ step === TOTAL_STEPS ? "Complete" : "Continue" }}
              <ArrowRight v-if="step < TOTAL_STEPS" class="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.step-enter-active,
.step-leave-active {
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}
.step-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.step-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
