<script setup lang="ts">
import { ArrowLeft, ArrowRight, CheckCircle2, CloudUpload, FileText, Search, X } from "@lucide/vue"
import { ALL_SKILLS } from "~/utils/skills"

defineOptions({ name: "CareersOnboardingPage" })
definePageMeta({ layout: "onboarding", middleware: ["candidate", "not-onboarded"] })

useHead({ title: "Set up your profile – SaintHR" })

const router = useRouter()
const { profile } = storeToRefs(useProfileStore())
const { markOnboarded } = useSharedAuth()

const TOTAL_STEPS = 3
const step = ref(1)

const STEP_META = [
  { label: "About you", desc: "Tell us a bit about your background." },
  { label: "Your expertise", desc: "Add your skills and work preferences." },
  { label: "Your resume", desc: "Upload your CV and add your online profiles." },
]

const jobTitle = ref(profile.value.jobTitle || "")
const experience = ref(profile.value.experience || "")
const location = ref(profile.value.location || "")
const bio = ref(profile.value.bio || "")

const experienceOptions = ["< 1 year", "1–3 years", "3–5 years", "5–10 years", "10+ years"]

const JOB_TYPES = ["Full-time", "Part-time", "Contract"]
const ARRANGEMENTS = ["Remote", "Hybrid", "On-site"]

const selectedSkills = ref<string[]>([...profile.value.skills])
const selectedJobTypes = ref<string[]>([...profile.value.preferredJobTypes])
const selectedArrangements = ref<string[]>([...profile.value.preferredArrangements])

const skillSearch = ref("")
const filteredSkills = computed(() => {
  const q = skillSearch.value.trim().toLowerCase()
  if (!q) return ALL_SKILLS
  return ALL_SKILLS.filter(
    s => s.toLowerCase().includes(q) || selectedSkills.value.includes(s),
  )
})

const setSkills = (v: unknown) => {
  selectedSkills.value = Array.isArray(v) ? (v as string[]) : []
}
const setJobTypes = (v: unknown) => {
  selectedJobTypes.value = Array.isArray(v) ? (v as string[]) : []
}
const setArrangements = (v: unknown) => {
  selectedArrangements.value = Array.isArray(v) ? (v as string[]) : []
}

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

const isDone = computed(() => step.value > TOTAL_STEPS)

const canContinue = computed(() => {
  if (step.value === 1) return !!jobTitle.value.trim() && !!experience.value
  if (step.value === 2) return selectedSkills.value.length > 0
  return true
})

const saveStep = async () => {
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
    await markOnboarded("candidate")
  }
}

const goNext = async () => {
  await saveStep()
  step.value++
}

const goBack = () => {
  step.value--
}

const skipStep = async () => {
  if (step.value === TOTAL_STEPS) await markOnboarded("candidate")
  step.value++
}
</script>

<template>
  <div class="w-full max-w-lg">
    <Transition name="step" mode="out-in">
      <!-- Completion screen -->
      <UiCard v-if="isDone" key="done" class="w-full p-10 text-center">
        <div class="mb-5 flex justify-center">
          <div class="flex size-20 items-center justify-center rounded-full bg-mint">
            <CheckCircle2 class="size-10 text-green" />
          </div>
        </div>
        <UiCardTitle class="text-2xl">
          You're all set!
        </UiCardTitle>
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
          <UiButton size="lg" class="w-full" @click="router.push('/profile')">
            View my profile
          </UiButton>
          <NuxtLink
            to="/jobs"
            class="inline-flex w-full items-center justify-center gap-2 rounded-full border border-line bg-white px-6 py-3.5 text-sm font-semibold text-ink transition hover:border-ink/30 hover:bg-paper"
          >
            Browse jobs
          </NuxtLink>
        </div>
      </UiCard>

      <!-- Step card -->
      <UiCard v-else :key="step" class="w-full overflow-hidden">
        <UiCardHeader>
          <UiStepper :total="TOTAL_STEPS" :current="step" class="mb-5" />
          <p class="mb-1 text-xs font-semibold text-muted">
            Step {{ step }} of {{ TOTAL_STEPS }}
          </p>
          <UiCardTitle>{{ STEP_META[step - 1]?.label }}</UiCardTitle>
          <UiCardDescription>{{ STEP_META[step - 1]?.desc }}</UiCardDescription>
        </UiCardHeader>

        <UiCardContent>
          <!-- Step 1: About you -->
          <div v-if="step === 1" class="flex flex-col gap-4">
            <div class="flex flex-col gap-1.5">
              <UiLabel for="job-title" required>Current or target job title</UiLabel>
              <UiInput
                id="job-title"
                v-model="jobTitle"
                placeholder="e.g. HR Business Partner"
              />
            </div>

            <div class="flex flex-col gap-1.5">
              <UiLabel for="experience" required>Years of experience</UiLabel>
              <UiSelect v-model="experience">
                <UiSelectTrigger id="experience">
                  <UiSelectValue placeholder="Select experience level" />
                </UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem v-for="opt in experienceOptions" :key="opt" :value="opt">
                    {{ opt }}
                  </UiSelectItem>
                </UiSelectContent>
              </UiSelect>
            </div>

            <div class="flex flex-col gap-1.5">
              <UiLabel for="location">Location</UiLabel>
              <UiInput
                id="location"
                v-model="location"
                placeholder="e.g. Lagos, Nigeria"
              />
            </div>

            <div class="flex flex-col gap-1.5">
              <div class="flex items-center justify-between">
                <UiLabel for="bio">
                  Short bio
                  <span class="font-normal text-muted">(optional)</span>
                </UiLabel>
                <span class="text-xs text-muted">{{ bio.length }}/200</span>
              </div>
              <UiTextarea
                id="bio"
                v-model="bio"
                placeholder="Brief summary of your HR background and what you're looking for..."
                :rows="3"
                :maxlength="200"
              />
            </div>
          </div>

          <!-- Step 2: Expertise -->
          <div v-else-if="step === 2" class="flex flex-col gap-7">
            <div>
              <p class="mb-3 text-xs font-semibold text-ink">
                Skills
                <span class="font-normal text-muted">(select all that apply)</span>
              </p>

              <div class="mb-3 flex items-center gap-2 rounded-xl border border-line bg-paper px-3.5 py-2.5 transition-colors focus-within:border-ink/40">
                <Search class="size-4 shrink-0 text-muted" />
                <input
                  v-model="skillSearch"
                  type="search"
                  placeholder="Search skills (e.g. Figma, Recruitment, Python)"
                  class="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted"
                >
                <button
                  v-if="skillSearch"
                  type="button"
                  aria-label="Clear search"
                  class="text-muted transition hover:text-ink"
                  @click="skillSearch = ''"
                >
                  <X class="size-4" />
                </button>
              </div>

              <UiToggleGroup
                v-if="filteredSkills.length"
                type="multiple"
                :model-value="selectedSkills"
                @update:model-value="setSkills"
              >
                <UiToggleGroupItem
                  v-for="skill in filteredSkills"
                  :key="skill"
                  :value="skill"
                  variant="green"
                  size="sm"
                >
                  {{ skill }}
                </UiToggleGroupItem>
              </UiToggleGroup>
              <p v-else class="mt-2 text-xs text-muted">
                No skills match "{{ skillSearch }}".
              </p>

              <p v-if="selectedSkills.length === 0" class="mt-2 text-xs text-muted">
                Select at least one skill to continue.
              </p>
              <p v-else class="mt-2 text-xs text-muted">
                {{ selectedSkills.length }} selected
              </p>
            </div>

            <div>
              <p class="mb-3 text-xs font-semibold text-ink">Preferred job type</p>
              <UiToggleGroup
                type="multiple"
                :model-value="selectedJobTypes"
                @update:model-value="setJobTypes"
              >
                <UiToggleGroupItem
                  v-for="type in JOB_TYPES"
                  :key="type"
                  :value="type"
                  variant="ink"
                >
                  {{ type }}
                </UiToggleGroupItem>
              </UiToggleGroup>
            </div>

            <div>
              <p class="mb-3 text-xs font-semibold text-ink">Preferred work arrangement</p>
              <UiToggleGroup
                type="multiple"
                :model-value="selectedArrangements"
                @update:model-value="setArrangements"
              >
                <UiToggleGroupItem
                  v-for="arr in ARRANGEMENTS"
                  :key="arr"
                  :value="arr"
                  variant="green"
                >
                  {{ arr }}
                </UiToggleGroupItem>
              </UiToggleGroup>
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
                    : 'border-line bg-paper hover:border-ink/40 hover:bg-ink/2',
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

            <div class="flex flex-col gap-1.5">
              <UiLabel for="linkedin">
                LinkedIn URL
                <span class="font-normal text-muted">(optional)</span>
              </UiLabel>
              <UiInput
                id="linkedin"
                v-model="linkedinUrl"
                type="url"
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>

            <p class="text-xs leading-5 text-muted">
              You can always update your resume later from your profile page.
            </p>
          </div>
        </UiCardContent>

        <UiCardFooter>
          <UiButton
            v-if="step > 1"
            variant="ghost"
            size="sm"
            class="px-0"
            @click="goBack"
          >
            <ArrowLeft class="size-4" /> Back
          </UiButton>
          <span v-else />

          <div class="flex items-center gap-3">
            <UiButton
              v-if="step === TOTAL_STEPS"
              variant="ghost"
              size="sm"
              class="px-0"
              @click="skipStep"
            >
              Skip
            </UiButton>
            <UiButton :disabled="!canContinue" @click="goNext">
              {{ step === TOTAL_STEPS ? "Complete" : "Continue" }}
              <ArrowRight v-if="step < TOTAL_STEPS" class="size-4" />
            </UiButton>
          </div>
        </UiCardFooter>
      </UiCard>
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
