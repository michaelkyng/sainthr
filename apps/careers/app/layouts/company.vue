<script setup lang="ts">
import { ChevronDown, LayoutDashboard, Plus } from "@lucide/vue"

defineOptions({ name: "CompanyLayout" })

const { employer, activeCompany, companyInitials, setActiveCompany } = useCompany()
const router = useRouter()

onMounted(() => {
  if (!employer.value.fullName) router.push("/auth/signup?role=employer")
  else if (!employer.value.isOnboarded) router.push("/company/onboarding")
})

const ddOpen = ref(false)

const switchCompany = (id: string) => {
  setActiveCompany(id)
  ddOpen.value = false
}
</script>

<template>
  <div class="flex min-h-screen flex-col bg-paper">
    <AppNavbar />
    <main class="flex-1 pt-20">
      <!-- Company subheader -->
      <div class="sticky top-20 z-40 border-b border-line bg-white/95 backdrop-blur-sm">
        <div class="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 lg:px-8">
          <!-- Company selector -->
          <div class="relative z-50">
            <button
              class="flex items-center gap-2.5 rounded-full py-1.5 pl-1.5 pr-3 text-sm font-semibold text-ink transition hover:bg-paper"
              type="button"
              @click="ddOpen = !ddOpen"
            >
              <div class="flex size-7 shrink-0 items-center justify-center rounded-lg bg-ink font-display text-[11px] font-bold text-white">
                {{ companyInitials }}
              </div>
              <span class="max-w-35 truncate">{{ activeCompany?.name ?? "My Company" }}</span>
              <ChevronDown
                :class="['size-3.5 text-muted transition-transform duration-200', ddOpen ? 'rotate-180' : '']"
              />
            </button>

            <!-- Dropdown -->
            <Transition
              enter-active-class="transition duration-150 ease-out"
              enter-from-class="-translate-y-1 opacity-0"
              enter-to-class="translate-y-0 opacity-100"
              leave-active-class="transition duration-100 ease-in"
              leave-from-class="translate-y-0 opacity-100"
              leave-to-class="-translate-y-1 opacity-0"
            >
              <div
                v-if="ddOpen"
                class="absolute left-0 top-full mt-2 w-60 overflow-hidden rounded-2xl border border-line bg-white shadow-[0_12px_40px_rgba(16,30,68,0.14)]"
              >
                <div class="p-1.5">
                  <p class="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-muted/60">
                    Your companies
                  </p>
                  <button
                    v-for="c in employer.companies"
                    :key="c.id"
                    class="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition hover:bg-paper"
                    type="button"
                    @click="switchCompany(c.id)"
                  >
                    <div
                      :class="[
                        'flex size-7 shrink-0 items-center justify-center rounded-lg font-display text-[11px] font-bold transition',
                        c.id === activeCompany?.id ? 'bg-ink text-white' : 'bg-paper text-ink',
                      ]"
                    >
                      {{ c.name.split(/\s+/).slice(0, 2).map(w => w[0]?.toUpperCase()).join('') }}
                    </div>
                    <div class="min-w-0 flex-1">
                      <p class="truncate text-sm font-semibold text-ink">{{ c.name }}</p>
                      <p class="text-xs text-muted">{{ c.jobs.filter(j => j.status === 'active').length }} active jobs</p>
                    </div>
                    <span v-if="c.id === activeCompany?.id" class="size-1.5 shrink-0 rounded-full bg-green" />
                  </button>
                </div>
                <div class="border-t border-line p-1.5">
                  <NuxtLink
                    to="/company/new"
                    class="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-muted transition hover:bg-paper hover:text-ink"
                    @click="ddOpen = false"
                  >
                    <Plus class="size-4" /> Add another company
                  </NuxtLink>
                </div>
              </div>
            </Transition>
          </div>

          <!-- Subheader nav -->
          <nav class="flex items-center gap-1">
            <NuxtLink
              to="/company/dashboard"
              active-class="bg-paper! text-ink!"
              class="flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-ink/60 transition hover:bg-paper hover:text-ink"
            >
              <LayoutDashboard class="size-3.5" />
              <span class="hidden sm:inline">Dashboard</span>
            </NuxtLink>
            <NuxtLink
              to="/company/jobs/post"
              class="flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white transition hover:bg-ink-2"
            >
              <Plus class="size-3.5" /> Post a job
            </NuxtLink>
          </nav>
        </div>
      </div>

      <slot />
    </main>

    <!-- Backdrop for dropdown -->
    <div
      v-if="ddOpen"
      class="fixed inset-0 z-39"
      @click="ddOpen = false"
    />

    <AppFooter />
  </div>
</template>
