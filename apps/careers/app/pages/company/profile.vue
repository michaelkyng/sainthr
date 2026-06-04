<script setup lang="ts">
import {
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Edit2,
  FileText,
  Globe,
  Plus,
  Save,
  X,
} from "@lucide/vue"

defineOptions({ name: "CompanyProfilePage" })
definePageMeta({ layout: "company", middleware: ["employer", "onboarded"] })

useHead({ title: "My Profile – SaintHR Employers" })

const employerStore = useEmployerStore()
const { employer, activeCompany, totalApplications } = storeToRefs(employerStore)
const { setActiveCompany, updateCompany } = employerStore
const { fullName, email, user } = useSharedAuth()

const userImageUrl = computed(() => user.value?.imageUrl ?? "")
const displayName = computed(() => fullName.value || employer.value.fullName || "Your account")
const displayEmail = computed(() => email.value || employer.value.email || "")
const userInitials = computed(() => {
  const source = displayName.value && displayName.value !== "Your account" ? displayName.value : displayEmail.value
  if (!source) return "?"
  return source
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() ?? "")
    .join("") || source[0]?.toUpperCase() || "?"
})

const companyInitialsFor = (name: string) => (
  name
    .split(/\s+/)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase() ?? "")
    .join("") || "?"
)

const INDUSTRIES = [
  "Financial Services", "Technology", "Healthcare", "Manufacturing",
  "FMCG / Retail", "Consulting", "Education", "NGO / Non-profit",
  "Government", "Hospitality", "Other",
]
const SIZES = ["1–10", "11–50", "51–200", "201–1,000", "1,000+"]

const editingCompanyId = ref<string | null>(null)
const editForm = reactive({
  name: "",
  industry: "",
  size: "",
  location: "",
  website: "",
  description: "",
})

const startEdit = (companyId: string) => {
  const company = employer.value.companies.find(c => c.id === companyId)
  if (!company) return
  setActiveCompany(companyId)
  editingCompanyId.value = companyId
  editForm.name = company.name
  editForm.industry = company.industry
  editForm.size = company.size
  editForm.location = company.location
  editForm.website = company.website
  editForm.description = company.description
}

const cancelEdit = () => {
  editingCompanyId.value = null
}

const saveEdit = () => {
  if (!editingCompanyId.value) return
  updateCompany(editingCompanyId.value, {
    name: editForm.name.trim(),
    industry: editForm.industry,
    size: editForm.size,
    location: editForm.location.trim(),
    website: editForm.website.trim(),
    description: editForm.description.trim(),
  })
  editingCompanyId.value = null
}

const setEditSize = (v: unknown) => {
  editForm.size = typeof v === "string" ? v : ""
}

const canSaveEdit = computed(() => (
  !!editForm.name.trim() && !!editForm.industry && !!editForm.size && !!editForm.description.trim()
))

const totalActiveJobsAcross = computed(() =>
  employer.value.companies.reduce(
    (sum, c) => sum + c.jobs.filter(j => j.status === "active").length,
    0,
  ),
)
</script>

<template>
  <div>
    <div class="bg-ink text-white">
      <div class="mx-auto max-w-5xl px-5 py-10 lg:px-8">
        <div class="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div class="flex items-start gap-5">
            <UiAvatar class="size-20 rounded-2xl ring-2 ring-white/15">
              <UiAvatarImage v-if="userImageUrl" :src="userImageUrl" :alt="displayName" />
              <UiAvatarFallback class="rounded-2xl bg-white/10 font-display text-2xl">
                {{ userInitials }}
              </UiAvatarFallback>
            </UiAvatar>
            <div class="flex flex-col gap-2">
              <h1 class="font-display text-2xl font-semibold leading-tight md:text-3xl">
                {{ displayName }}
              </h1>
              <p v-if="displayEmail" class="text-sm text-white/60">
                {{ displayEmail }}
              </p>
              <div class="flex flex-wrap items-center gap-2">
                <UiBadge class="bg-white/10 px-2.5 py-1 text-white/75">
                  Employer
                </UiBadge>
                <UiBadge class="bg-mint/20 px-2.5 py-1 text-mint">
                  {{ employer.companies.length }} {{ employer.companies.length === 1 ? "company" : "companies" }}
                </UiBadge>
              </div>
            </div>
          </div>

          <div class="flex shrink-0 flex-wrap items-center gap-2">
            <UiButton as-child size="sm" class="border-white/20 bg-white text-ink hover:bg-white/90">
              <NuxtLink to="/company/new">
                <Plus class="size-3.5" /> Add company
              </NuxtLink>
            </UiButton>
            <UiButton as-child variant="secondary" size="sm" class="border-white/20 bg-white/10 text-white hover:border-white/30 hover:bg-white/20">
              <NuxtLink to="/company/dashboard">
                Dashboard <ArrowUpRight class="size-3.5" />
              </NuxtLink>
            </UiButton>
          </div>
        </div>
      </div>
    </div>

    <div class="mx-auto max-w-5xl px-5 py-8 lg:px-8">
      <!-- Stats summary -->
      <div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <UiCard variant="panel" class="flex items-center gap-4 p-5">
          <div class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-mint text-green">
            <Building2 class="size-5" />
          </div>
          <div>
            <p class="text-xs font-semibold uppercase tracking-widest text-muted/70">Companies</p>
            <p class="mt-0.5 font-display text-2xl font-semibold text-ink">
              {{ employer.companies.length }}
            </p>
          </div>
        </UiCard>
        <UiCard variant="panel" class="flex items-center gap-4 p-5">
          <div class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#e8eeff] text-[#3b55c4]">
            <FileText class="size-5" />
          </div>
          <div>
            <p class="text-xs font-semibold uppercase tracking-widest text-muted/70">Active jobs</p>
            <p class="mt-0.5 font-display text-2xl font-semibold text-ink">
              {{ totalActiveJobsAcross }}
            </p>
          </div>
        </UiCard>
        <UiCard variant="panel" class="flex items-center gap-4 p-5">
          <div class="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#fff3e0] text-[#b35a00]">
            <CheckCircle2 class="size-5" />
          </div>
          <div>
            <p class="text-xs font-semibold uppercase tracking-widest text-muted/70">Applicants</p>
            <p class="mt-0.5 font-display text-2xl font-semibold text-ink">
              {{ totalApplications }}
            </p>
          </div>
        </UiCard>
      </div>

      <!-- Companies list + editor -->
      <div class="grid gap-5 lg:grid-cols-[1fr_360px]">
        <UiCard variant="panel" class="overflow-hidden">
          <div class="flex items-center justify-between border-b border-line px-6 py-4">
            <h2 class="font-display text-lg font-semibold text-ink">
              Your companies
            </h2>
            <span class="text-xs font-semibold text-muted">
              Click a company to manage it
            </span>
          </div>

          <div v-if="!employer.companies.length" class="flex flex-col items-center gap-4 py-16 text-center">
            <div class="flex size-14 items-center justify-center rounded-2xl bg-paper text-muted">
              <Building2 class="size-6" />
            </div>
            <div>
              <p class="font-display text-lg font-semibold text-ink">
                No companies yet
              </p>
              <p class="mt-1 text-sm text-muted">
                Add your first company to start posting roles.
              </p>
            </div>
            <UiButton as-child>
              <NuxtLink to="/company/new">
                <Plus class="size-4" /> Add a company
              </NuxtLink>
            </UiButton>
          </div>

          <div v-else class="divide-y divide-line">
            <button
              v-for="c in employer.companies"
              :key="c.id"
              type="button"
              :class="[
                'flex w-full items-start gap-4 px-6 py-5 text-left transition cursor-pointer',
                c.id === editingCompanyId ? 'bg-paper/80' : 'hover:bg-paper/50',
              ]"
              @click="startEdit(c.id)"
            >
              <div
                :class="[
                  'flex size-12 shrink-0 items-center justify-center rounded-xl font-display text-sm font-bold transition',
                  c.id === activeCompany?.id ? 'bg-ink text-white' : 'bg-paper text-ink',
                ]"
              >
                {{ companyInitialsFor(c.name) }}
              </div>
              <div class="min-w-0 flex-1">
                <div class="flex flex-wrap items-center gap-2">
                  <h3 class="font-display text-base font-semibold text-ink">
                    {{ c.name }}
                  </h3>
                  <UiBadge
                    v-if="c.id === activeCompany?.id"
                    class="bg-mint/30 px-2 py-0.5 text-[10px] uppercase tracking-wider text-green"
                  >
                    Active
                  </UiBadge>
                </div>
                <p class="mt-0.5 text-sm text-muted">
                  {{ c.industry }}
                  <template v-if="c.industry && c.location">·</template>
                  {{ c.location }}
                  <template v-if="c.size">· {{ c.size }} employees</template>
                </p>
                <div class="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted">
                  <span>{{ c.jobs.filter(j => j.status === "active").length }} active jobs</span>
                  <span>· {{ c.jobs.reduce((s, j) => s + j.applications, 0) }} applicants</span>
                  <a
                    v-if="c.website"
                    :href="c.website"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1 text-green transition hover:text-ink"
                    @click.stop
                  >
                    <Globe class="size-3" /> Website
                  </a>
                </div>
              </div>
              <Edit2 class="mt-1 size-4 shrink-0 text-muted" />
            </button>
          </div>
        </UiCard>

        <!-- Editor panel -->
        <UiCard variant="panel" class="overflow-hidden self-start sticky top-24">
          <div v-if="!editingCompanyId" class="flex flex-col items-center gap-3 px-6 py-12 text-center">
            <div class="flex size-12 items-center justify-center rounded-2xl bg-paper text-muted">
              <Edit2 class="size-5" />
            </div>
            <p class="font-display text-base font-semibold text-ink">
              Manage a company
            </p>
            <p class="text-xs leading-5 text-muted">
              Pick a company on the left to edit its details, switch it as active, or open its dashboard.
            </p>
          </div>

          <template v-else>
            <div class="flex items-center justify-between border-b border-line px-5 py-4">
              <div>
                <p class="text-[11px] font-semibold uppercase tracking-widest text-muted/60">
                  Editing company
                </p>
                <h3 class="mt-0.5 font-display text-base font-semibold text-ink">
                  {{ editForm.name || "New name" }}
                </h3>
              </div>
              <button
                type="button"
                aria-label="Close editor"
                class="rounded-full p-1.5 text-muted transition hover:bg-paper hover:text-ink"
                @click="cancelEdit"
              >
                <X class="size-4" />
              </button>
            </div>

            <div class="flex flex-col gap-4 p-5">
              <div class="flex flex-col gap-1.5">
                <UiLabel for="edit-name" required>Name</UiLabel>
                <UiInput id="edit-name" v-model="editForm.name" placeholder="Company name" />
              </div>

              <div class="flex flex-col gap-1.5">
                <UiLabel for="edit-industry" required>Industry</UiLabel>
                <UiSelect v-model="editForm.industry">
                  <UiSelectTrigger id="edit-industry">
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
                <UiLabel required>Size</UiLabel>
                <UiToggleGroup
                  type="single"
                  :model-value="editForm.size"
                  @update:model-value="setEditSize"
                >
                  <UiToggleGroupItem v-for="s in SIZES" :key="s" :value="s">
                    {{ s }}
                  </UiToggleGroupItem>
                </UiToggleGroup>
              </div>

              <div class="flex flex-col gap-1.5">
                <UiLabel for="edit-location">Headquarters</UiLabel>
                <UiInput id="edit-location" v-model="editForm.location" placeholder="e.g. Lagos, Nigeria" />
              </div>

              <div class="flex flex-col gap-1.5">
                <UiLabel for="edit-website">Website</UiLabel>
                <UiInput id="edit-website" v-model="editForm.website" type="url" placeholder="https://..." />
              </div>

              <div class="flex flex-col gap-1.5">
                <div class="flex items-center justify-between">
                  <UiLabel for="edit-description" required>About</UiLabel>
                  <span class="text-xs text-muted">{{ editForm.description.length }}/500</span>
                </div>
                <UiTextarea
                  id="edit-description"
                  v-model="editForm.description"
                  :rows="5"
                  :maxlength="500"
                  placeholder="Mission, culture, and what makes this a great place to work..."
                />
              </div>
            </div>

            <div class="flex items-center justify-end gap-2 border-t border-line bg-paper/50 px-5 py-4">
              <UiButton variant="secondary" size="sm" @click="cancelEdit">
                Cancel
              </UiButton>
              <UiButton size="sm" :disabled="!canSaveEdit" @click="saveEdit">
                <Save class="size-3.5" /> Save changes
              </UiButton>
            </div>
          </template>
        </UiCard>
      </div>
    </div>
  </div>
</template>
