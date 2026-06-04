<script setup lang="ts">
import { ArrowLeft, ArrowRight, CheckCircle2, Plus, X } from "@lucide/vue"

defineOptions({ name: "CompanyPostJobPage" })
definePageMeta({ layout: "company", middleware: ["employer", "onboarded"] })

useHead({ title: "Post a Job – SaintHR" })

const router = useRouter()
const { addJob } = useEmployerStore()

const TOTAL_STEPS = 3
const step = ref(1)
const isDone = computed(() => step.value > TOTAL_STEPS)

const STEP_META = [
  { label: "Role basics", desc: "Set the essentials for this position." },
  { label: "Role details", desc: "Describe responsibilities and requirements." },
  { label: "Benefits & publish", desc: "Add perks, then launch your listing." },
]

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

const addResponsibility = () => {
  const val = newResponsibility.value.trim()
  if (val && !responsibilities.value.includes(val)) responsibilities.value.push(val)
  newResponsibility.value = ""
}
const removeResponsibility = (idx: number) => {
  responsibilities.value.splice(idx, 1)
}
const addRequirement = () => {
  const val = newRequirement.value.trim()
  if (val && !requirements.value.includes(val)) requirements.value.push(val)
  newRequirement.value = ""
}
const removeRequirement = (idx: number) => {
  requirements.value.splice(idx, 1)
}

const setLocationType = (v: unknown) => {
  if (v === "remote" || v === "hybrid" || v === "on-site") locationType.value = v
}
const setJobType = (v: unknown) => {
  if (v === "full-time" || v === "part-time" || v === "contract") jobType.value = v
}
const setSkills = (v: unknown) => {
  selectedSkills.value = Array.isArray(v) ? (v as string[]) : []
}

const BENEFIT_OPTIONS = [
  "Health insurance", "Pension / retirement plan", "Remote work",
  "Flexible hours", "Learning & development budget", "Stock options / equity",
  "Annual bonus", "Paid time off (PTO)", "Team retreats",
  "Gym / wellness allowance", "Company device", "Transport allowance",
]
const selectedBenefits = ref<string[]>([])

const toggleBenefit = (b: string) => {
  const i = selectedBenefits.value.indexOf(b)
  if (i >= 0) selectedBenefits.value.splice(i, 1)
  else selectedBenefits.value.push(b)
}

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
      <UiCard
        v-if="isDone"
        key="done"
        variant="panel"
        class="rounded-3xl p-10 text-center shadow-[0_8px_40px_rgba(16,30,68,0.08)]"
      >
        <div class="mb-5 flex justify-center">
          <div class="flex size-20 items-center justify-center rounded-full bg-mint">
            <CheckCircle2 class="size-10 text-green" />
          </div>
        </div>
        <UiCardTitle class="text-2xl">
          Job posted!
        </UiCardTitle>
        <p class="mx-auto mt-2 max-w-xs text-sm leading-6 text-muted">
          Your listing is live. Candidates can now find and apply for the role.
        </p>
        <div class="mt-8 flex flex-col gap-3">
          <UiButton size="lg" class="w-full" @click="router.push('/company/dashboard')">
            Back to dashboard
          </UiButton>
          <UiButton variant="secondary" size="lg" class="w-full" @click="router.push('/company/jobs/post')">
            Post another job
          </UiButton>
        </div>
      </UiCard>

      <!-- Step card -->
      <UiCard
        v-else
        :key="step"
        variant="panel"
        class="overflow-hidden rounded-3xl shadow-[0_8px_40px_rgba(16,30,68,0.08)]"
      >
        <UiCardHeader>
          <UiStepper :total="TOTAL_STEPS" :current="step" class="mb-5" />
          <p class="mb-1 text-xs font-semibold text-muted">
            Step {{ step }} of {{ TOTAL_STEPS }}
          </p>
          <UiCardTitle>{{ STEP_META[step - 1]?.label }}</UiCardTitle>
          <UiCardDescription>{{ STEP_META[step - 1]?.desc }}</UiCardDescription>
        </UiCardHeader>

        <UiCardContent>
          <!-- Step 1: Role basics -->
          <div v-if="step === 1" class="flex flex-col gap-5">
            <div class="flex flex-col gap-1.5">
              <UiLabel for="job-title" required>Job title</UiLabel>
              <UiInput id="job-title" v-model="title" placeholder="e.g. Senior HR Business Partner" />
            </div>

            <div class="flex flex-col gap-1.5">
              <UiLabel for="department" required>Department</UiLabel>
              <UiSelect v-model="department">
                <UiSelectTrigger id="department">
                  <UiSelectValue placeholder="Select department" />
                </UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem v-for="d in DEPARTMENTS" :key="d" :value="d">
                    {{ d }}
                  </UiSelectItem>
                </UiSelectContent>
              </UiSelect>
            </div>

            <div class="grid gap-5 sm:grid-cols-2">
              <div class="flex flex-col gap-2">
                <UiLabel>Work type</UiLabel>
                <UiToggleGroup
                  type="single"
                  :model-value="locationType"
                  @update:model-value="setLocationType"
                >
                  <UiToggleGroupItem v-for="t in LOCATION_TYPES" :key="t.value" :value="t.value">
                    {{ t.label }}
                  </UiToggleGroupItem>
                </UiToggleGroup>
              </div>
              <div class="flex flex-col gap-2">
                <UiLabel>Employment</UiLabel>
                <UiToggleGroup
                  type="single"
                  :model-value="jobType"
                  @update:model-value="setJobType"
                >
                  <UiToggleGroupItem v-for="t in JOB_TYPES" :key="t.value" :value="t.value">
                    {{ t.label }}
                  </UiToggleGroupItem>
                </UiToggleGroup>
              </div>
            </div>

            <div class="flex flex-col gap-1.5">
              <UiLabel for="job-location" required>Location</UiLabel>
              <UiInput id="job-location" v-model="location" placeholder="e.g. Lagos, Nigeria" />
            </div>

            <div class="flex flex-col gap-1.5">
              <UiLabel for="salary">
                Salary range
                <span class="font-normal text-muted">(optional)</span>
              </UiLabel>
              <UiInput id="salary" v-model="salary" placeholder="e.g. ₦700,000 – ₦1,100,000/month" />
            </div>
          </div>

          <!-- Step 2: Role details -->
          <div v-else-if="step === 2" class="flex flex-col gap-7">
            <div class="flex flex-col gap-1.5">
              <div class="flex items-center justify-between">
                <UiLabel for="description" required>Job description</UiLabel>
                <span class="text-xs text-muted">{{ description.length }}/600</span>
              </div>
              <UiTextarea
                id="description"
                v-model="description"
                placeholder="Describe the role, its purpose within the company, and what success looks like..."
                :rows="4"
                :maxlength="600"
              />
            </div>

            <!-- Responsibilities -->
            <div class="flex flex-col gap-2">
              <UiLabel required>
                Responsibilities
                <span class="font-normal text-muted">(at least one)</span>
              </UiLabel>
              <ul v-if="responsibilities.length" class="mb-2 flex flex-col gap-1.5">
                <li
                  v-for="(item, i) in responsibilities"
                  :key="i"
                  class="flex items-center gap-2 rounded-xl border border-line bg-paper px-4 py-2.5 text-sm text-ink"
                >
                  <span class="flex-1">{{ item }}</span>
                  <button class="text-muted transition hover:text-coral" type="button" @click="removeResponsibility(i)">
                    <X class="size-3.5" />
                  </button>
                </li>
              </ul>
              <div class="flex gap-2">
                <UiInput
                  v-model="newResponsibility"
                  class="flex-1 py-2.5"
                  placeholder="e.g. Partner with leadership on people strategy"
                  @keyup.enter="addResponsibility()"
                />
                <UiButton
                  variant="secondary"
                  size="sm"
                  class="rounded-xl"
                  @click="addResponsibility()"
                >
                  <Plus class="size-3.5" /> Add
                </UiButton>
              </div>
            </div>

            <!-- Requirements -->
            <div class="flex flex-col gap-2">
              <UiLabel required>
                Requirements
                <span class="font-normal text-muted">(at least one)</span>
              </UiLabel>
              <ul v-if="requirements.length" class="mb-2 flex flex-col gap-1.5">
                <li
                  v-for="(item, i) in requirements"
                  :key="i"
                  class="flex items-center gap-2 rounded-xl border border-line bg-paper px-4 py-2.5 text-sm text-ink"
                >
                  <span class="flex-1">{{ item }}</span>
                  <button class="text-muted transition hover:text-coral" type="button" @click="removeRequirement(i)">
                    <X class="size-3.5" />
                  </button>
                </li>
              </ul>
              <div class="flex gap-2">
                <UiInput
                  v-model="newRequirement"
                  class="flex-1 py-2.5"
                  placeholder="e.g. 5+ years of HR experience"
                  @keyup.enter="addRequirement()"
                />
                <UiButton
                  variant="secondary"
                  size="sm"
                  class="rounded-xl"
                  @click="addRequirement()"
                >
                  <Plus class="size-3.5" /> Add
                </UiButton>
              </div>
            </div>

            <!-- Skills -->
            <div class="flex flex-col gap-2">
              <UiLabel>
                Required skills
                <span class="font-normal text-muted">(optional)</span>
              </UiLabel>
              <UiToggleGroup
                type="multiple"
                :model-value="selectedSkills"
                @update:model-value="setSkills"
              >
                <UiToggleGroupItem
                  v-for="skill in ALL_SKILLS"
                  :key="skill"
                  :value="skill"
                  variant="green"
                  size="sm"
                >
                  {{ skill }}
                </UiToggleGroupItem>
              </UiToggleGroup>
            </div>
          </div>

          <!-- Step 3: Benefits & publish -->
          <div v-else-if="step === 3" class="flex flex-col gap-7">
            <div class="flex flex-col gap-3">
              <UiLabel>
                Benefits & perks
                <span class="font-normal text-muted">(select all that apply)</span>
              </UiLabel>
              <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <label
                  v-for="benefit in BENEFIT_OPTIONS"
                  :key="benefit"
                  :class="[
                    'flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-200',
                    selectedBenefits.includes(benefit)
                      ? 'border-ink/30 bg-ink/4'
                      : 'border-line bg-paper hover:border-ink/20',
                  ]"
                >
                  <input
                    :checked="selectedBenefits.includes(benefit)"
                    class="accent-ink"
                    type="checkbox"
                    @change="toggleBenefit(benefit)"
                  >
                  <span class="text-xs font-semibold text-ink">{{ benefit }}</span>
                </label>
              </div>
            </div>

            <!-- Summary preview -->
            <UiCard variant="flat" class="border-line bg-paper p-5">
              <p class="mb-3 text-xs font-semibold uppercase tracking-wider text-muted/60">
                Listing preview
              </p>
              <h3 class="font-display text-lg font-semibold text-ink">
                {{ title }}
              </h3>
              <p class="mt-0.5 text-sm text-muted">
                {{ department }}
              </p>
              <div class="mt-2 flex flex-wrap gap-2 text-xs text-muted">
                <span>{{ location }}</span>
                <span>·</span>
                <span class="capitalize">{{ locationType }}</span>
                <span>·</span>
                <span class="capitalize">{{ jobType }}</span>
                <span v-if="salary">· {{ salary }}</span>
              </div>
              <div v-if="selectedSkills.length" class="mt-3 flex flex-wrap gap-1.5">
                <UiBadge
                  v-for="s in selectedSkills.slice(0, 5)"
                  :key="s"
                  variant="outline"
                  class="bg-panel px-2.5 py-0.5"
                >
                  {{ s }}
                </UiBadge>
                <span v-if="selectedSkills.length > 5" class="text-xs text-muted">
                  +{{ selectedSkills.length - 5 }} more
                </span>
              </div>
            </UiCard>
          </div>
        </UiCardContent>

        <UiCardFooter>
          <UiButton
            v-if="step > 1"
            variant="ghost"
            size="sm"
            class="px-0"
            @click="step--"
          >
            <ArrowLeft class="size-4" /> Back
          </UiButton>
          <span v-else />
          <UiButton :disabled="!canContinue" @click="goNext">
            {{ step === TOTAL_STEPS ? "Publish listing" : "Continue" }}
            <ArrowRight v-if="step < TOTAL_STEPS" class="size-4" />
          </UiButton>
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
