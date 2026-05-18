<script setup lang="ts">
import { ArrowLeft, ArrowRight, CheckCircle2 } from "@lucide/vue"

defineOptions({ name: "CompanyOnboardingPage" })
definePageMeta({ layout: "onboarding" })

useHead({ title: "Set up your company – SaintHR" })

const router = useRouter()
const { employer, addCompany } = useCompany()

onMounted(() => {
  if (!employer.value.fullName) router.push("/auth/signup?role=employer")
})

const TOTAL_STEPS = 2
const step = ref(1)
const isDone = computed(() => step.value > TOTAL_STEPS)

const STEP_META = [
  { label: "Company details", desc: "Tell us about the company you're hiring for." },
  { label: "Your story", desc: "Help candidates understand your culture and mission." },
]

// Step 1
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

// Step 2
const description = ref("")

const canContinue = computed(() => {
  if (step.value === 1) return !!companyName.value.trim() && !!industry.value && !!size.value
  if (step.value === 2) return !!description.value.trim()
  return true
})

const complete = () => {
  addCompany(
    {
      name: companyName.value.trim(),
      industry: industry.value,
      size: size.value,
      location: location.value.trim(),
      website: website.value.trim(),
      description: description.value.trim(),
    },
    // Seed two demo jobs so the dashboard isn't empty
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
  employer.value.isOnboarded = true
  step.value++
}

const goNext = () => {
  if (step.value === TOTAL_STEPS) complete()
  else step.value++
}
</script>

<template>
  <div class="w-full max-w-lg">
    <Transition name="step" mode="out-in">
      <!-- Done screen -->
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
        <h2 class="font-display text-2xl font-semibold text-ink">{{ companyName }} is ready!</h2>
        <p class="mx-auto mt-2 max-w-xs text-sm leading-6 text-muted">
          Start posting roles and connecting with vetted HR talent across Nigeria.
        </p>
        <div class="mt-8 flex flex-col gap-3">
          <button
            class="flex w-full items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-ink-2"
            type="button"
            @click="router.push('/company/dashboard')"
          >
            Go to dashboard
          </button>
          <NuxtLink
            to="/company/jobs/post"
            class="flex w-full items-center justify-center gap-2 rounded-full border border-line px-6 py-3.5 text-sm font-semibold text-ink transition hover:border-ink/30 hover:bg-paper"
          >
            Post a job now
          </NuxtLink>
        </div>
      </div>

      <!-- Step card -->
      <div
        v-else
        :key="step"
        class="w-full overflow-hidden rounded-3xl border border-line/50 bg-white shadow-[0_24px_80px_rgba(16,30,68,0.14)]"
      >
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

        <div class="px-8 py-7">
          <!-- Step 1 -->
          <div v-if="step === 1" class="flex flex-col gap-5">
            <label class="flex flex-col gap-1.5">
              <span class="text-xs font-semibold text-ink">Company name <span class="text-coral">*</span></span>
              <input
                v-model="companyName"
                class="rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink outline-none placeholder:text-muted transition-colors focus:border-ink/40"
                placeholder="e.g. Northstar Health"
                type="text"
              >
            </label>

            <label class="flex flex-col gap-1.5">
              <span class="text-xs font-semibold text-ink">Industry <span class="text-coral">*</span></span>
              <select
                v-model="industry"
                class="appearance-none rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-ink/40"
              >
                <option value="" disabled>Select your industry</option>
                <option v-for="i in INDUSTRIES" :key="i" :value="i">{{ i }}</option>
              </select>
            </label>

            <div class="flex flex-col gap-2">
              <span class="text-xs font-semibold text-ink">Company size <span class="text-coral">*</span></span>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="s in SIZES"
                  :key="s"
                  :class="[
                    'rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200',
                    size === s ? 'border-ink bg-ink text-white' : 'border-line bg-paper text-muted hover:border-ink/30 hover:text-ink',
                  ]"
                  type="button"
                  @click="size = s"
                >
                  {{ s }} employees
                </button>
              </div>
            </div>

            <label class="flex flex-col gap-1.5">
              <span class="text-xs font-semibold text-ink">Headquarters</span>
              <input
                v-model="location"
                class="rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink outline-none placeholder:text-muted transition-colors focus:border-ink/40"
                placeholder="e.g. Lagos, Nigeria"
                type="text"
              >
            </label>

            <label class="flex flex-col gap-1.5">
              <span class="text-xs font-semibold text-ink">Website</span>
              <input
                v-model="website"
                class="rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink outline-none placeholder:text-muted transition-colors focus:border-ink/40"
                placeholder="https://yourcompany.com"
                type="url"
              >
            </label>
          </div>

          <!-- Step 2: About -->
          <div v-else-if="step === 2" class="flex flex-col gap-4">
            <label class="flex flex-col gap-1.5">
              <div class="flex items-center justify-between">
                <span class="text-xs font-semibold text-ink">
                  About {{ companyName || "your company" }} <span class="text-coral">*</span>
                </span>
                <span class="text-xs text-muted">{{ description.length }}/500</span>
              </div>
              <textarea
                v-model="description"
                class="resize-none rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink outline-none placeholder:text-muted transition-colors focus:border-ink/40"
                placeholder="Tell candidates about your mission, culture, and what makes this a great place to work..."
                rows="7"
                maxlength="500"
              />
            </label>
            <p class="text-xs leading-5 text-muted">This appears on all your job listings and your company profile.</p>
          </div>
        </div>

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
              canContinue ? 'bg-ink text-white hover:bg-ink-2' : 'cursor-not-allowed bg-line text-muted',
            ]"
            type="button"
            :disabled="!canContinue"
            @click="goNext"
          >
            {{ step === TOTAL_STEPS ? "Finish setup" : "Continue" }}
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
