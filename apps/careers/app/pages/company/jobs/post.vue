<script setup lang="ts">
import { ArrowLeft, ArrowRight, CheckCircle2, Plus, X } from "@lucide/vue"

defineOptions({ name: "CompanyPostJobPage" })
definePageMeta({ layout: "company" })

useHead({ title: "Post a Job – SaintHR" })

const router = useRouter()
const { addJob } = useCompany()

const TOTAL_STEPS = 3
const step = ref(1)
const isDone = computed(() => step.value > TOTAL_STEPS)

const STEP_META = [
  { label: "Role basics", desc: "Set the essentials for this position." },
  { label: "Role details", desc: "Describe responsibilities and requirements." },
  { label: "Benefits & publish", desc: "Add perks, then launch your listing." },
]

// ── Step 1 ──────────────────────────────────────────────
const title = ref("")
const department = ref("")
const location = ref("")
const locationType = ref<"remote" | "hybrid" | "on-site">("hybrid")
const jobType = ref<"full-time" | "part-time" | "contract">("full-time")
const salary = ref("")

const DEPARTMENTS = [
  "HR & People Ops", "Talent Acquisition", "Payroll & Finance",
  "HR Compliance", "Learning & Development", "HR Technology",
]
const LOCATION_TYPES = [
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
  { value: "on-site", label: "On-site" },
] as const
const JOB_TYPES = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
] as const

// ── Step 2 ──────────────────────────────────────────────
const description = ref("")
const responsibilities = ref<string[]>([])
const requirements = ref<string[]>([])
const newResponsibility = ref("")
const newRequirement = ref("")

const ALL_SKILLS = [
  "Recruitment", "Payroll", "HRIS", "Compliance", "L&D",
  "Employee Relations", "Talent Management", "Performance Mgmt",
  "HR Analytics", "Compensation", "Onboarding", "Policy Dev",
  "Org Design", "D&I", "Change Management", "Workforce Planning",
]
const selectedSkills = ref<string[]>([])

const addListItem = (list: Ref<string[]>, input: Ref<string>) => {
  const val = input.value.trim()
  if (val && !list.value.includes(val)) list.value.push(val)
  input.value = ""
}

const removeItem = (list: Ref<string[]>, idx: number) => {
  list.value.splice(idx, 1)
}

const toggleSkill = (s: string) => {
  const i = selectedSkills.value.indexOf(s)
  i >= 0 ? selectedSkills.value.splice(i, 1) : selectedSkills.value.push(s)
}

// ── Step 3 ──────────────────────────────────────────────
const BENEFIT_OPTIONS = [
  "Health insurance", "Pension / retirement plan", "Remote work",
  "Flexible hours", "Learning & development budget", "Stock options / equity",
  "Annual bonus", "Paid time off (PTO)", "Team retreats",
  "Gym / wellness allowance", "Company device", "Transport allowance",
]
const selectedBenefits = ref<string[]>([])

const toggleBenefit = (b: string) => {
  const i = selectedBenefits.value.indexOf(b)
  i >= 0 ? selectedBenefits.value.splice(i, 1) : selectedBenefits.value.push(b)
}

// ── Navigation ──────────────────────────────────────────
const canContinue = computed(() => {
  if (step.value === 1) return !!title.value.trim() && !!department.value && !!location.value.trim()
  if (step.value === 2) return !!description.value.trim() && responsibilities.value.length > 0 && requirements.value.length > 0
  return true
})

const publish = () => {
  addJob({
    title: title.value.trim(),
    department: department.value,
    location: location.value.trim(),
    locationType: locationType.value,
    jobType: jobType.value,
    salary: salary.value.trim() || "Competitive",
    description: description.value.trim(),
    responsibilities: [...responsibilities.value],
    requirements: [...requirements.value],
    benefits: [...selectedBenefits.value],
    skills: [...selectedSkills.value],
  })
  step.value++
}

const goNext = () => {
  if (step.value === TOTAL_STEPS) publish()
  else step.value++
}
</script>

<template>
  <div class="mx-auto max-w-2xl px-5 py-10 lg:px-8">
    <Transition name="step" mode="out-in">
      <!-- Done screen -->
      <div
        v-if="isDone"
        key="done"
        class="rounded-3xl border border-line bg-panel p-10 text-center shadow-[0_8px_40px_rgba(16,30,68,0.08)]"
      >
        <div class="mb-5 flex justify-center">
          <div class="flex size-20 items-center justify-center rounded-full bg-mint">
            <CheckCircle2 class="size-10 text-green" />
          </div>
        </div>
        <h2 class="font-display text-2xl font-semibold text-ink">Job posted!</h2>
        <p class="mx-auto mt-2 max-w-xs text-sm leading-6 text-muted">
          Your listing is live. Candidates can now find and apply for the role.
        </p>
        <div class="mt-8 flex flex-col gap-3">
          <button
            class="flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-ink-2"
            type="button"
            @click="router.push('/company/dashboard')"
          >
            Back to dashboard
          </button>
          <button
            class="flex w-full items-center justify-center gap-2 rounded-full border border-line px-6 py-3.5 text-sm font-semibold text-ink transition hover:border-ink/30 hover:bg-paper"
            type="button"
            @click="router.push('/company/jobs/post')"
          >
            Post another job
          </button>
        </div>
      </div>

      <!-- Step card -->
      <div v-else :key="step" class="overflow-hidden rounded-3xl border border-line bg-panel shadow-[0_8px_40px_rgba(16,30,68,0.08)]">
        <!-- Header -->
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
          <h2 class="font-display text-xl font-semibold text-ink">{{ STEP_META[step - 1]?.label }}</h2>
          <p class="mt-0.5 text-sm text-muted">{{ STEP_META[step - 1]?.desc }}</p>
        </div>

        <!-- Content -->
        <div class="px-8 py-7">
          <!-- Step 1: Role basics -->
          <div v-if="step === 1" class="flex flex-col gap-5">
            <label class="flex flex-col gap-1.5">
              <span class="text-xs font-semibold text-ink">Job title <span class="text-coral">*</span></span>
              <input
                v-model="title"
                class="rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink outline-none placeholder:text-muted transition-colors focus:border-ink/40"
                placeholder="e.g. Senior HR Business Partner"
                type="text"
              >
            </label>

            <label class="flex flex-col gap-1.5">
              <span class="text-xs font-semibold text-ink">Department <span class="text-coral">*</span></span>
              <select
                v-model="department"
                class="appearance-none rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink/40"
              >
                <option value="" disabled>Select department</option>
                <option v-for="d in DEPARTMENTS" :key="d" :value="d">{{ d }}</option>
              </select>
            </label>

            <div class="grid gap-5 sm:grid-cols-2">
              <div class="flex flex-col gap-2">
                <span class="text-xs font-semibold text-ink">Work type</span>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="t in LOCATION_TYPES"
                    :key="t.value"
                    :class="[
                      'rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200',
                      locationType === t.value
                        ? 'border-ink bg-ink text-white'
                        : 'border-line bg-paper text-muted hover:border-ink/30 hover:text-ink',
                    ]"
                    type="button"
                    @click="locationType = t.value"
                  >
                    {{ t.label }}
                  </button>
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <span class="text-xs font-semibold text-ink">Employment</span>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="t in JOB_TYPES"
                    :key="t.value"
                    :class="[
                      'rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200',
                      jobType === t.value
                        ? 'border-ink bg-ink text-white'
                        : 'border-line bg-paper text-muted hover:border-ink/30 hover:text-ink',
                    ]"
                    type="button"
                    @click="jobType = t.value"
                  >
                    {{ t.label }}
                  </button>
                </div>
              </div>
            </div>

            <label class="flex flex-col gap-1.5">
              <span class="text-xs font-semibold text-ink">Location <span class="text-coral">*</span></span>
              <input
                v-model="location"
                class="rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink outline-none placeholder:text-muted transition-colors focus:border-ink/40"
                placeholder="e.g. Lagos, Nigeria"
                type="text"
              >
            </label>

            <label class="flex flex-col gap-1.5">
              <span class="text-xs font-semibold text-ink">
                Salary range
                <span class="font-normal text-muted">(optional)</span>
              </span>
              <input
                v-model="salary"
                class="rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink outline-none placeholder:text-muted transition-colors focus:border-ink/40"
                placeholder="e.g. ₦700,000 – ₦1,100,000/month"
                type="text"
              >
            </label>
          </div>

          <!-- Step 2: Role details -->
          <div v-else-if="step === 2" class="flex flex-col gap-7">
            <label class="flex flex-col gap-1.5">
              <div class="flex items-center justify-between">
                <span class="text-xs font-semibold text-ink">Job description <span class="text-coral">*</span></span>
                <span class="text-xs text-muted">{{ description.length }}/600</span>
              </div>
              <textarea
                v-model="description"
                class="resize-none rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink outline-none placeholder:text-muted transition-colors focus:border-ink/40"
                placeholder="Describe the role, its purpose within the company, and what success looks like..."
                rows="4"
                maxlength="600"
              />
            </label>

            <!-- Responsibilities -->
            <div class="flex flex-col gap-2">
              <span class="text-xs font-semibold text-ink">
                Responsibilities <span class="text-coral">*</span>
                <span class="font-normal text-muted">(at least one)</span>
              </span>
              <ul v-if="responsibilities.length" class="mb-2 flex flex-col gap-1.5">
                <li
                  v-for="(item, i) in responsibilities"
                  :key="i"
                  class="flex items-center gap-2 rounded-xl border border-line bg-paper px-4 py-2.5 text-sm text-ink"
                >
                  <span class="flex-1">{{ item }}</span>
                  <button class="text-muted transition hover:text-coral" type="button" @click="removeItem(responsibilities, i)">
                    <X class="size-3.5" />
                  </button>
                </li>
              </ul>
              <div class="flex gap-2">
                <input
                  v-model="newResponsibility"
                  class="flex-1 rounded-xl border border-line bg-paper px-4 py-2.5 text-sm text-ink outline-none placeholder:text-muted transition-colors focus:border-ink/40"
                  placeholder="e.g. Partner with leadership on people strategy"
                  type="text"
                  @keyup.enter="addListItem(responsibilities, newResponsibility)"
                >
                <button
                  class="flex items-center gap-1 rounded-xl border border-line bg-paper px-4 py-2.5 text-xs font-semibold text-muted transition hover:border-ink/30 hover:text-ink"
                  type="button"
                  @click="addListItem(responsibilities, newResponsibility)"
                >
                  <Plus class="size-3.5" /> Add
                </button>
              </div>
            </div>

            <!-- Requirements -->
            <div class="flex flex-col gap-2">
              <span class="text-xs font-semibold text-ink">
                Requirements <span class="text-coral">*</span>
                <span class="font-normal text-muted">(at least one)</span>
              </span>
              <ul v-if="requirements.length" class="mb-2 flex flex-col gap-1.5">
                <li
                  v-for="(item, i) in requirements"
                  :key="i"
                  class="flex items-center gap-2 rounded-xl border border-line bg-paper px-4 py-2.5 text-sm text-ink"
                >
                  <span class="flex-1">{{ item }}</span>
                  <button class="text-muted transition hover:text-coral" type="button" @click="removeItem(requirements, i)">
                    <X class="size-3.5" />
                  </button>
                </li>
              </ul>
              <div class="flex gap-2">
                <input
                  v-model="newRequirement"
                  class="flex-1 rounded-xl border border-line bg-paper px-4 py-2.5 text-sm text-ink outline-none placeholder:text-muted transition-colors focus:border-ink/40"
                  placeholder="e.g. 5+ years of HR experience"
                  type="text"
                  @keyup.enter="addListItem(requirements, newRequirement)"
                >
                <button
                  class="flex items-center gap-1 rounded-xl border border-line bg-paper px-4 py-2.5 text-xs font-semibold text-muted transition hover:border-ink/30 hover:text-ink"
                  type="button"
                  @click="addListItem(requirements, newRequirement)"
                >
                  <Plus class="size-3.5" /> Add
                </button>
              </div>
            </div>

            <!-- Skills -->
            <div class="flex flex-col gap-2">
              <span class="text-xs font-semibold text-ink">
                Required skills
                <span class="font-normal text-muted">(optional)</span>
              </span>
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
            </div>
          </div>

          <!-- Step 3: Benefits & publish -->
          <div v-else-if="step === 3" class="flex flex-col gap-7">
            <div class="flex flex-col gap-3">
              <span class="text-xs font-semibold text-ink">
                Benefits & perks
                <span class="font-normal text-muted">(select all that apply)</span>
              </span>
              <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <label
                  v-for="benefit in BENEFIT_OPTIONS"
                  :key="benefit"
                  :class="[
                    'flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-200',
                    selectedBenefits.includes(benefit)
                      ? 'border-green/30 bg-mint/20'
                      : 'border-line bg-paper hover:border-ink/20',
                  ]"
                >
                  <input
                    :checked="selectedBenefits.includes(benefit)"
                    class="accent-green"
                    type="checkbox"
                    @change="toggleBenefit(benefit)"
                  >
                  <span class="text-xs font-semibold text-ink">{{ benefit }}</span>
                </label>
              </div>
            </div>

            <!-- Summary preview -->
            <div class="rounded-2xl border border-line bg-paper p-5">
              <p class="mb-3 text-xs font-semibold uppercase tracking-wider text-muted/60">Listing preview</p>
              <h3 class="font-display text-lg font-semibold text-ink">{{ title }}</h3>
              <p class="mt-0.5 text-sm text-muted">{{ department }}</p>
              <div class="mt-2 flex flex-wrap gap-2 text-xs text-muted">
                <span>{{ location }}</span>
                <span>·</span>
                <span class="capitalize">{{ locationType }}</span>
                <span>·</span>
                <span class="capitalize">{{ jobType }}</span>
                <span v-if="salary">· {{ salary }}</span>
              </div>
              <div v-if="selectedSkills.length" class="mt-3 flex flex-wrap gap-1.5">
                <span
                  v-for="s in selectedSkills.slice(0, 5)"
                  :key="s"
                  class="rounded-full border border-line bg-panel px-2.5 py-0.5 text-xs font-medium text-muted"
                >
                  {{ s }}
                </span>
                <span v-if="selectedSkills.length > 5" class="text-xs text-muted">
                  +{{ selectedSkills.length - 5 }} more
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <div class="flex items-center justify-between border-t border-line px-8 py-5">
          <button
            v-if="step > 1"
            class="flex items-center gap-1.5 text-sm font-semibold text-muted transition hover:text-ink"
            type="button"
            @click="step--"
          >
            <ArrowLeft class="size-4" /> Back
          </button>
          <span v-else />
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
            {{ step === TOTAL_STEPS ? "Publish listing" : "Continue" }}
            <ArrowRight v-if="step < TOTAL_STEPS" class="size-4" />
          </button>
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
