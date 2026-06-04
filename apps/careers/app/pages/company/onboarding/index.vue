<script setup lang="ts">
import { ArrowLeft, ArrowRight, CheckCircle2 } from "@lucide/vue"

defineOptions({ name: "CompanyOnboardingPage" })
definePageMeta({ layout: "onboarding", middleware: ["employer", "not-onboarded"] })

useHead({ title: "Set up your company – SaintHR" })

const router = useRouter()
const employerStore = useEmployerStore()
const { addCompany } = employerStore
const { markOnboarded } = useSharedAuth()

const TOTAL_STEPS = 2
const step = ref(1)
const isDone = computed(() => step.value > TOTAL_STEPS)

const STEP_META = [
  { label: "Company details", desc: "Tell us about the company you're hiring for." },
  { label: "Your story", desc: "Help candidates understand your culture and mission." },
]

const companyName = ref("")
const industry = ref("")
const size = ref("")
const location = ref("")
const website = ref("")

const INDUSTRIES = [
  "Financial Services", "Technology", "Healthcare", "Manufacturing",
  "FMCG / Retail", "Consulting", "Education", "NGO / Non-profit",
  "Government", "Hospitality", "Other",
]
const SIZES = ["1–10", "11–50", "51–200", "201–1,000", "1,000+"]

const description = ref("")

const canContinue = computed(() => {
  if (step.value === 1) return !!companyName.value.trim() && !!industry.value && !!size.value
  if (step.value === 2) return !!description.value.trim()
  return true
})

const complete = async () => {
  addCompany(
    {
      name: companyName.value.trim(),
      industry: industry.value,
      size: size.value,
      location: location.value.trim(),
      website: website.value.trim(),
      description: description.value.trim(),
    },
    [
      {
        title: "HR Business Partner",
        department: "HR & People Ops",
        location: location.value || "Lagos, Nigeria",
        locationType: "hybrid",
        jobType: "full-time",
        salary: "₦700,000 – ₦1,100,000/month",
        description: "We are looking for a strategic HR Business Partner to join our team and support our growing workforce.",
        responsibilities: ["Partner with leadership on people strategy", "Manage the full employee lifecycle"],
        requirements: ["5+ years HR experience", "Strong knowledge of Nigerian labour law"],
        benefits: ["Health insurance", "Flexible hours", "Annual bonus"],
        skills: ["HRIS", "Employee Relations", "Recruitment"],
        status: "active",
        postedAt: "2026-05-15",
        applications: 8,
      },
      {
        title: "Talent Acquisition Specialist",
        department: "Talent Acquisition",
        location: "Remote",
        locationType: "remote",
        jobType: "contract",
        salary: "₦400,000 – ₦600,000/month",
        description: "Join our talent team and drive recruitment for high-growth teams across the business.",
        responsibilities: ["Manage end-to-end recruitment", "Build and maintain talent pipelines"],
        requirements: ["3+ years in talent acquisition", "Experience with ATS platforms"],
        benefits: ["Remote work", "Flexible hours", "Learning budget"],
        skills: ["Recruitment", "Talent Management", "HR Analytics"],
        status: "active",
        postedAt: "2026-05-12",
        applications: 14,
      },
    ],
  )
  await markOnboarded("employer")
  step.value++
}

const goNext = async () => {
  if (step.value === TOTAL_STEPS) await complete()
  else step.value++
}

const setSize = (v: unknown) => {
  size.value = typeof v === "string" ? v : ""
}
</script>

<template>
  <div class="w-full max-w-lg">
    <Transition name="step" mode="out-in">
      <!-- Done screen -->
      <UiCard v-if="isDone" key="done" class="w-full p-10 text-center">
        <div class="mb-5 flex justify-center">
          <div class="flex size-20 items-center justify-center rounded-full bg-mint">
            <CheckCircle2 class="size-10 text-green" />
          </div>
        </div>
        <UiCardTitle class="text-2xl">
          {{ companyName }} is ready!
        </UiCardTitle>
        <p class="mx-auto mt-2 max-w-xs text-sm leading-6 text-muted">
          Start posting roles and connecting with vetted HR talent across Nigeria.
        </p>
        <div class="mt-8 flex flex-col gap-3">
          <UiButton size="lg" class="w-full" @click="router.push('/company/dashboard')">
            Go to dashboard
          </UiButton>
          <NuxtLink
            to="/company/jobs/post"
            class="inline-flex w-full items-center justify-center gap-2 rounded-full border border-line bg-white px-6 py-3.5 text-sm font-semibold text-ink transition hover:border-ink/30 hover:bg-paper"
          >
            Post a job now
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
          <!-- Step 1 -->
          <div v-if="step === 1" class="flex flex-col gap-5">
            <div class="flex flex-col gap-1.5">
              <UiLabel for="company-name" required>Company name</UiLabel>
              <UiInput
                id="company-name"
                v-model="companyName"
                placeholder="e.g. Northstar Health"
              />
            </div>

            <div class="flex flex-col gap-1.5">
              <UiLabel for="industry" required>Industry</UiLabel>
              <UiSelect v-model="industry">
                <UiSelectTrigger id="industry">
                  <UiSelectValue placeholder="Select your industry" />
                </UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem v-for="i in INDUSTRIES" :key="i" :value="i">
                    {{ i }}
                  </UiSelectItem>
                </UiSelectContent>
              </UiSelect>
            </div>

            <div class="flex flex-col gap-2">
              <UiLabel required>Company size</UiLabel>
              <UiToggleGroup
                type="single"
                :model-value="size"
                @update:model-value="setSize"
              >
                <UiToggleGroupItem v-for="s in SIZES" :key="s" :value="s">
                  {{ s }} employees
                </UiToggleGroupItem>
              </UiToggleGroup>
            </div>

            <div class="flex flex-col gap-1.5">
              <UiLabel for="hq">Headquarters</UiLabel>
              <UiInput
                id="hq"
                v-model="location"
                placeholder="e.g. Lagos, Nigeria"
              />
            </div>

            <div class="flex flex-col gap-1.5">
              <UiLabel for="website">Website</UiLabel>
              <UiInput
                id="website"
                v-model="website"
                type="url"
                placeholder="https://yourcompany.com"
              />
            </div>
          </div>

          <!-- Step 2: About -->
          <div v-else-if="step === 2" class="flex flex-col gap-4">
            <div class="flex flex-col gap-1.5">
              <div class="flex items-center justify-between">
                <UiLabel for="about" required>
                  About {{ companyName || "your company" }}
                </UiLabel>
                <span class="text-xs text-muted">{{ description.length }}/500</span>
              </div>
              <UiTextarea
                id="about"
                v-model="description"
                placeholder="Tell candidates about your mission, culture, and what makes this a great place to work..."
                :rows="7"
                :maxlength="500"
              />
            </div>
            <p class="text-xs leading-5 text-muted">
              This appears on all your job listings and your company profile.
            </p>
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
            {{ step === TOTAL_STEPS ? "Finish setup" : "Continue" }}
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
