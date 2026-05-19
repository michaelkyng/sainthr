<script setup lang="ts">
import {
  ChevronDown,
  MoreVertical,
  Pencil,
  Plus,
  Search,
  SlidersHorizontal,
  Trash2,
} from '@lucide/vue';
import type { Application } from '~/composables/useApplications';
import AdminFilterPanel from '~/components/admin/FilterPanel.vue';
import type { FilterGroup } from '~/components/admin/FilterPanel.vue';

defineOptions({ name: 'AdminApplicationsPage' });
useHead({ title: 'Applications – SaintHR Admin' });

const { applications, addApplication, updateApplication, deleteApplication } =
  useApplications();

const stages = ['New', 'Review', 'Interview', 'Offer', 'Hired', 'Rejected'];

const stageColor: Record<string, string> = {
  New: 'bg-gold/10 text-gold',
  Review: 'bg-ink/10 text-ink',
  Interview: 'bg-mint text-ink',
  Offer: 'bg-green/10 text-green',
  Hired: 'bg-green/20 text-green',
  Rejected: 'bg-coral/10 text-coral',
};

const pipeline = computed(() =>
  stages.map((stage) => ({
    stage,
    count: applications.value.filter((a) => a.stage === stage).length,
  })),
);

const initials = (name: string) =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

// Search
const search = ref('');

// Filters
const filterOpen = ref(false);
const filterGroups: FilterGroup[] = [
  { label: 'Stage', key: 'stage', options: ['New', 'Review', 'Interview', 'Offer', 'Hired', 'Rejected'] },
  { label: 'Department', key: 'department', options: ['Engineering', 'Product', 'Design', 'Human Resources', 'Analytics'] },
];
const activeFilters = ref<Record<string, string[]>>({ stage: [], department: [] });
const filterCount = computed(() =>
  Object.values(activeFilters.value).reduce((n, arr) => n + arr.length, 0),
);

// Score filter (separate simple range)
const minScore = ref(0);

const filtered = computed(() =>
  applications.value.filter((a) => {
    if (search.value && !a.candidate.toLowerCase().includes(search.value.toLowerCase()) && !a.job.toLowerCase().includes(search.value.toLowerCase()) && !a.department.toLowerCase().includes(search.value.toLowerCase())) return false;
    if (activeFilters.value.stage.length && !activeFilters.value.stage.includes(a.stage)) return false;
    if (activeFilters.value.department.length && !activeFilters.value.department.includes(a.department)) return false;
    if (a.score < minScore.value) return false;
    return true;
  }),
);

// Slide-over form
const panelOpen = ref(false);
const editingId = ref<number | null>(null);

const emptyForm = (): Omit<Application, 'id' | 'date'> => ({
  candidate: '',
  job: '',
  department: '',
  stage: 'New',
  score: 0,
  notes: '',
});

const form = ref(emptyForm());

function openCreate() {
  editingId.value = null;
  form.value = emptyForm();
  panelOpen.value = true;
}

function openEdit(app: Application) {
  editingId.value = app.id;
  form.value = {
    candidate: app.candidate,
    job: app.job,
    department: app.department,
    stage: app.stage,
    score: app.score,
    notes: app.notes,
  };
  panelOpen.value = true;
}

function closePanel() {
  panelOpen.value = false;
}

function saveApplication() {
  if (!form.value.candidate.trim() || !form.value.job.trim()) return;
  if (editingId.value !== null) {
    updateApplication(editingId.value, form.value);
  } else {
    addApplication(form.value);
  }
  closePanel();
}

// Delete
const confirmDeleteId = ref<number | null>(null);

function doDelete() {
  if (confirmDeleteId.value !== null) {
    deleteApplication(confirmDeleteId.value);
    confirmDeleteId.value = null;
  }
}

// Action menu
const openMenuId = ref<number | null>(null);

function toggleMenu(id: number) {
  openMenuId.value = openMenuId.value === id ? null : id;
}

function closeMenu() {
  openMenuId.value = null;
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <section class="admin-card p-5">
      <div
        class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
      >
        <div>
          <p class="text-sm font-semibold text-ink">
            Track every application through the hiring pipeline
          </p>
          <p class="mt-1 text-sm text-muted">
            Review scores, stages, and handoffs without losing context.
          </p>
        </div>
        <div class="flex items-center gap-2">
          <button class="admin-secondary-button relative" type="button" @click="filterOpen = !filterOpen">
            All Stages
            <ChevronDown class="size-4" />
            <span
              v-if="filterCount > 0"
              class="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-green text-[10px] font-bold text-white"
            >{{ filterCount }}</span>
          </button>
          <button
            class="admin-primary-button"
            type="button"
            @click="openCreate"
          >
            <Plus class="size-4" />
            Add Application
          </button>
        </div>
      </div>
      <div class="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label
          class="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-line bg-panel-soft px-3.5 py-2.5 text-sm text-muted"
        >
          <Search class="size-4 shrink-0" />
          <input
            v-model="search"
            class="w-full bg-transparent outline-none placeholder:text-muted"
            placeholder="Search applications, jobs, candidates"
            type="search"
          />
        </label>
        <div class="flex items-center gap-2 rounded-xl border border-line bg-panel-soft px-3.5 py-2 text-sm text-muted">
          <SlidersHorizontal class="size-4 shrink-0" />
          <span class="text-xs font-medium">Min score</span>
          <input
            v-model.number="minScore"
            type="range"
            min="0"
            max="100"
            step="5"
            class="w-24 accent-green"
          />
          <span class="w-6 text-right text-xs font-bold text-ink">{{ minScore }}</span>
        </div>
      </div>
      <AdminFilterPanel v-model="activeFilters" :open="filterOpen" :groups="filterGroups" />
    </section>

    <div class="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
      <div
        v-for="item in pipeline"
        :key="item.stage"
        class="admin-surface flex flex-col items-center gap-2 p-4 text-center"
      >
        <span
          :class="[
            'inline-flex rounded-full px-2.5 py-1 text-xs font-bold',
            stageColor[item.stage],
          ]"
        >
          {{ item.stage }}
        </span>
        <p class="font-display text-2xl font-semibold text-ink">
          {{ item.count }}
        </p>
      </div>
    </div>

    <div class="admin-card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="admin-table">
          <thead>
            <tr class="border-b border-line bg-panel-soft">
              <th>Candidate</th>
              <th>Job</th>
              <th>Department</th>
              <th>Score</th>
              <th>Stage</th>
              <th>Date</th>
              <th />
            </tr>
          </thead>
          <tbody class="divide-y divide-line bg-white">
            <tr
              v-for="app in filtered"
              :key="app.id"
              class="transition-colors hover:bg-panel-soft"
            >
              <td>
                <NuxtLink
                  :to="`/applications/${app.id}`"
                  class="flex items-center gap-3"
                >
                  <span
                    class="grid size-10 shrink-0 place-items-center rounded-2xl bg-ink text-xs font-bold text-white"
                  >
                    {{ initials(app.candidate) }}
                  </span>
                  <p class="font-semibold text-ink hover:text-green">
                    {{ app.candidate }}
                  </p>
                </NuxtLink>
              </td>
              <td class="text-muted">{{ app.job }}</td>
              <td class="text-muted">{{ app.department }}</td>
              <td>
                <div class="flex items-center gap-2">
                  <div class="h-2 w-20 overflow-hidden rounded-full bg-paper">
                    <div
                      class="h-full rounded-full bg-green"
                      :style="`width: ${app.score}%`"
                    />
                  </div>
                  <span class="text-xs font-bold text-ink">{{
                    app.score
                  }}</span>
                </div>
              </td>
              <td>
                <span
                  :class="[
                    'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold',
                    stageColor[app.stage],
                  ]"
                >
                  {{ app.stage }}
                </span>
              </td>
              <td class="text-xs font-medium text-muted">{{ app.date }}</td>
              <td>
                <div class="relative">
                  <button
                    class="admin-icon-button size-8"
                    type="button"
                    :aria-label="`Actions for ${app.candidate}`"
                    @click.stop="toggleMenu(app.id)"
                  >
                    <MoreVertical class="size-4" />
                  </button>
                  <div
                    v-if="openMenuId === app.id"
                    v-click-outside="closeMenu"
                    class="absolute right-0 top-9 z-10 min-w-36 rounded-xl border border-line bg-panel py-1 shadow-lg"
                  >
                    <button
                      class="flex w-full items-center gap-2 px-4 py-2 text-sm text-ink hover:bg-panel-soft"
                      type="button"
                      @click="openEdit(app); closeMenu()"
                    >
                      <Pencil class="size-3.5" />Edit
                    </button>
                    <button
                      class="flex w-full items-center gap-2 px-4 py-2 text-sm text-coral hover:bg-coral/5"
                      type="button"
                      @click="confirmDeleteId = app.id; closeMenu()"
                    >
                      <Trash2 class="size-3.5" />Delete
                    </button>
                  </div>
                </div>
              </td>
            </tr>
            <tr v-if="filtered.length === 0">
              <td colspan="7" class="py-12 text-center text-sm text-muted">
                No applications match your search.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create / Edit slide-over -->
    <AdminSlideOver
      :open="panelOpen"
      :title="editingId ? 'Edit Application' : 'Add Application'"
      :subtitle="editingId ? 'Update application details.' : 'Log a new application to the pipeline.'"
      @close="closePanel"
    >
      <form class="flex flex-col gap-5" @submit.prevent="saveApplication">
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold text-ink">Candidate *</label>
            <input
              v-model="form.candidate"
              class="admin-input w-full"
              type="text"
              placeholder="Candidate name"
              required
            />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold text-ink">Job *</label>
            <input
              v-model="form.job"
              class="admin-input w-full"
              type="text"
              placeholder="Job title"
              required
            />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold text-ink">Department</label>
            <input
              v-model="form.department"
              class="admin-input w-full"
              type="text"
              placeholder="e.g. Engineering"
            />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold text-ink">Stage</label>
            <select v-model="form.stage" class="admin-input w-full">
              <option v-for="s in stages" :key="s" :value="s">{{ s }}</option>
            </select>
          </div>
          <div class="flex flex-col gap-1.5 sm:col-span-2">
            <label class="text-xs font-semibold text-ink"
              >Score (0–100)</label
            >
            <input
              v-model.number="form.score"
              class="admin-input w-full"
              type="number"
              min="0"
              max="100"
              placeholder="0"
            />
          </div>
          <div class="flex flex-col gap-1.5 sm:col-span-2">
            <label class="text-xs font-semibold text-ink">Notes</label>
            <textarea
              v-model="form.notes"
              class="admin-input w-full resize-none"
              rows="4"
              placeholder="Reviewer notes about this application…"
            />
          </div>
        </div>
      </form>
      <template #footer>
        <button
          class="admin-secondary-button"
          type="button"
          @click="closePanel"
        >
          Cancel
        </button>
        <button
          class="admin-primary-button"
          type="button"
          :disabled="!form.candidate.trim() || !form.job.trim()"
          @click="saveApplication"
        >
          {{ editingId ? 'Save Changes' : 'Add Application' }}
        </button>
      </template>
    </AdminSlideOver>

    <!-- Delete confirmation -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-150"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-150"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="confirmDeleteId !== null"
          class="fixed inset-0 z-50 flex items-center justify-center bg-ink/30 backdrop-blur-sm"
          @click.self="confirmDeleteId = null"
        >
          <div class="admin-card w-full max-w-sm p-6">
            <h3 class="font-display text-base font-semibold text-ink">
              Remove this application?
            </h3>
            <p class="mt-2 text-sm text-muted">
              This will permanently remove the application record. This action
              cannot be undone.
            </p>
            <div class="mt-5 flex justify-end gap-3">
              <button
                class="admin-secondary-button"
                type="button"
                @click="confirmDeleteId = null"
              >
                Cancel
              </button>
              <button
                class="inline-flex items-center justify-center gap-2 rounded-xl bg-coral px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                type="button"
                @click="doDelete"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
