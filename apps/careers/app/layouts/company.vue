<script setup lang="ts">
import { ChevronDown, Plus } from '@lucide/vue';

defineOptions({ name: 'CompanyLayout' });

const employerStore = useEmployerStore();
const { employer, activeCompany, companyInitials } = storeToRefs(employerStore);
const { setActiveCompany } = employerStore;

const ddOpen = ref(false);

const switchCompany = (id: string) => {
  setActiveCompany(id);
  ddOpen.value = false;
};
</script>

<template>
  <div class="flex min-h-screen flex-col bg-paper">
    <AppNavbar />
    <main class="flex-1 pt-20">
      <!-- Company subheader -->
      <div
        class="sticky top-20 z-40 backdrop-blur-sm"
      >
        <div
          class="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 lg:px-8"
        >
          <!-- Company selector -->
          <div class="relative z-50">
            <button
              class="flex items-baseline gap-2.5 rounded-full py-1.5 px-3 text-sm font-semibold text-ink transition bg-white/90 hover:bg-paper cursor-pointer"
              type="button"
              @click="ddOpen = !ddOpen"
            >
              <div
                class="flex size-7 shrink-0 items-center justify-center rounded-lg bg-ink font-display text-[11px] font-bold text-white"
              >
                {{ companyInitials }}
              </div>
              <div class="flex gap-2 items-center">
                <div class="flex flex-col items-start">
                  <span class="max-w-35 truncate text-base">{{
                    activeCompany?.name ?? 'My Company'
                  }}</span>
                  <p class=" text-xs text-muted">
                    {{ activeCompany?.industry }}
                    <template
                      v-if="activeCompany?.industry && activeCompany?.location"
                    >
                      ·
                    </template>
                    {{ activeCompany?.location }}
                    <template v-if="activeCompany?.size">
                      · {{ activeCompany.size }} employees</template
                    >
                  </p>
                </div>
                <ChevronDown
                  :class="[
                    'size-3.5 text-muted transition-transform duration-200',
                    ddOpen ? 'rotate-180' : '',
                  ]"
                />
              </div>
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
                  <p
                    class="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-muted/60"
                  >
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
                        c.id === activeCompany?.id
                          ? 'bg-ink text-white'
                          : 'bg-paper text-ink',
                      ]"
                    >
                      {{
                        c.name
                          .split(/\s+/)
                          .slice(0, 2)
                          .map((w) => w[0]?.toUpperCase())
                          .join('')
                      }}
                    </div>
                    <div class="min-w-0 flex-1">
                      <p class="truncate text-sm font-semibold text-ink">
                        {{ c.name }}
                      </p>
                      <p class="text-xs text-muted">
                        {{ c.jobs.filter((j) => j.status === 'active').length }}
                        active jobs
                      </p>
                    </div>
                    <span
                      v-if="c.id === activeCompany?.id"
                      class="size-1.5 shrink-0 rounded-full bg-ink"
                    />
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
    <div v-if="ddOpen" class="fixed inset-0 z-39" @click="ddOpen = false" />

    <AppFooter />
  </div>
</template>
