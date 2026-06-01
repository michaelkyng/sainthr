<script setup lang="ts">
import { ArrowLeft, ArrowRight, CheckCircle2 } from "@lucide/vue"

defineOptions({ name: "CompanyNewPage" })
definePageMeta({ layout: "onboarding", middleware: ["employer", "onboarded"] })

useHead({ title: "Add a company – SaintHR" })

const router = useRouter()
const employerStore = useEmployerStore()
const { addCompany } = employerStore

const TOTAL_STEPS = 2
const step = ref(1)
const isDone = computed(() => step.value > TOTAL_STEPS)

const STEP_META = [
  { label: "Company details", desc: "Tell us about the new company." },
  { label: "About the company", desc: "Help candidates understand the culture and mission." },
]

const companyName = ref("")
const industry = ref("")
const size = ref("")
const location = ref("")
const website = ref("")
const description = ref("")

const INDUSTRIES = [
  "Financial Services", "Technology", "Healthcare", "Manufacturing",
  "FMCG / Retail", "Consulting", "Education", "NGO / Non-profit",
  "Government", "Hospitality", "Other",
]
const SIZES = ["1–10", "11–50", "51–200", "201–1,000", "1,000+"]

const canContinue = computed(() => {
  if (step.value === 1) return !!companyName.value.trim() && !!industry.value && !!size.value
  if (step.value === 2) return !!description.value.trim()
  return true
})

const setSize = (v: unknown) => {
  size.value = typeof v === "string" ? v : ""
}

const complete = () => {
  addCompany({
    name: companyName.value.trim(),
    industry: industry.value,
    size: size.value,
    location: location.value.trim(),
    website: website.value.trim(),
    description: description.value.trim(),
  })
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
      <UiCard v-if="isDone" key="done" class="w-full p-10 text-center">
        <div class="mb-5 flex justify-center">
          <div class="flex size-20 items-center justify-center rounded-full bg-mint">
            <CheckCircle2 class="size-10 text-green" />
          </div>
        </div>
        <UiCardTitle class="text-2xl">
          {{ companyName }} added!
        </UiCardTitle>
        <p class="mx-auto mt-2 max-w-xs text-sm leading-6 text-muted">
          Switch between companies using the selector in your dashboard header.
        </p>
        <div class="mt-8 flex flex-col gap-3">
          <UiButton size="lg" class="w-full" @click="router.push('/company/dashboard')">
            Go to dashboard
          </UiButton>
          <NuxtLink
            to="/company/jobs/post"
            class="inline-flex w-full items-center justify-center gap-2 rounded-full border border-line bg-white px-6 py-3.5 text-sm font-semibold text-ink transition hover:border-ink/30 hover:bg-paper"
          >
            Post a job for {{ companyName }}
          </NuxtLink>
        </div>
      </UiCard>

      <!-- Step card -->
      <UiCard v-else :key="step" class="w-full overflow-hidden">
        <UiCardHeader>
          <div class="mb-1 flex items-center gap-2">
            <NuxtLink to="/company/dashboard" class="text-muted transition hover:text-ink">
              <ArrowLeft class="size-4" />
            </NuxtLink>
            <p class="text-xs font-semibold text-muted">
              Add a new company · Step {{ step }} of {{ TOTAL_STEPS }}
            </p>
          </div>
          <UiCardTitle class="mt-3">
            {{ STEP_META[step - 1]?.label }}
          </UiCardTitle>
          <UiCardDescription>{{ STEP_META[step - 1]?.desc }}</UiCardDescription>
          <UiStepper :total="TOTAL_STEPS" :current="step" class="mt-5" />
        </UiCardHeader>

        <UiCardContent>
          <div v-if="step === 1" class="flex flex-col gap-5">
            <div class="flex flex-col gap-1.5">
              <UiLabel for="company-name" required>Company name</UiLabel>
              <UiInput id="company-name" v-model="companyName" placeholder="e.g. Acme Corp" />
            </div>

            <div class="flex flex-col gap-1.5">
              <UiLabel for="industry" required>Industry</UiLabel>
              <UiSelect v-model="industry">
                <UiSelectTrigger id="industry">
                  <UiSelectValue placeholder="Select industry" />
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
              <UiInput id="hq" v-model="location" placeholder="e.g. Lagos, Nigeria" />
            </div>

            <div class="flex flex-col gap-1.5">
              <UiLabel for="website">Website</UiLabel>
              <UiInput id="website" v-model="website" type="url" placeholder="https://yourcompany.com" />
            </div>
          </div>

          <div v-else-if="step === 2" class="flex flex-col gap-4">
            <div class="flex flex-col gap-1.5">
              <div class="flex items-center justify-between">
                <UiLabel for="about" required>
                  About {{ companyName || "this company" }}
                </UiLabel>
                <span class="text-xs text-muted">{{ description.length }}/500</span>
              </div>
              <UiTextarea
                id="about"
                v-model="description"
                placeholder="Mission, culture, and what makes this a great place to work..."
                :rows="7"
                :maxlength="500"
              />
            </div>
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
            {{ step === TOTAL_STEPS ? "Add company" : "Continue" }}
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
