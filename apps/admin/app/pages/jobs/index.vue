<script setup lang="ts">
import {
  BriefcaseBusiness,
  Filter,
  MapPin,
  MoreVertical,
  Pencil,
  Plus,
  Search,
  Trash2,
  Users,
} from '@lucide/vue';
import type { Job } from '~/composables/useJobs';
import AdminFilterPanel from '~/components/admin/FilterPanel.vue';
import type { FilterGroup } from '~/components/admin/FilterPanel.vue';

defineOptions({ name: 'AdminJobsPage' });
useHead({ title: 'Jobs – SaintHR Admin' });

const { jobs, addJob, updateJob, deleteJob } = useJobs();

const statusColor: Record<string, string> = {
  Open: 'bg-green/10 text-green',
  Draft: 'bg-gold/10 text-gold',
  Closed: 'bg-coral/10 text-coral',
};

// Search
const search = ref('');

// Filters
const filterOpen = ref(false);
const filterGroups: FilterGroup[] = [
  { label: 'Status', key: 'status', options: ['Open', 'Draft', 'Closed'] },
  { label: 'Type', key: 'type', options: ['Full-time', 'Part-time', 'Contract', 'Internship'] },
];
const activeFilters = ref<Record<string, string[]>>({ status: [], type: [] });
const filterCount = computed(() =>
  Object.values(activeFilters.value).reduce((n, arr) => n + arr.length, 0),
);

const filtered = computed(() =>
  jobs.value.filter((j) => {
    if (search.value && !j.title.toLowerCase().includes(search.value.toLowerCase()) && !j.department.toLowerCase().includes(search.value.toLowerCase()) && !j.location.toLowerCase().includes(search.value.toLowerCase())) return false;
    if (activeFilters.value.status.length && !activeFilters.value.status.includes(j.status)) return false;
    if (activeFilters.value.type.length && !activeFilters.value.type.includes(j.type)) return false;
    return true;
  }),
);

// Slide-over form
const panelOpen = ref(false);
const editingId = ref<number | null>(null);

const emptyForm = (): Omit<Job, 'id' | 'applicants' | 'posted'> => ({
  title: '',
  department: '',
  location: '',
  type: 'Full-time',
  status: 'Draft',
  salary: '',
  employer: '',
  description: '',
});

const form = ref(emptyForm());

function openCreate() {
  editingId.value = null;
  form.value = emptyForm();
  panelOpen.value = true;
}

function openEdit(job: Job) {
  editingId.value = job.id;
  form.value = {
    title: job.title,
    department: job.department,
    location: job.location,
    type: job.type,
    status: job.status,
    salary: job.salary,
    employer: job.employer,
    description: job.description,
  };
  panelOpen.value = true;
}

function closePanel() {
  panelOpen.value = false;
}

function saveJob() {
  if (!form.value.title.trim()) return;
  if (editingId.value !== null) {
    updateJob(editingId.value, form.value);
  } else {
    addJob(form.value);
  }
  closePanel();
}

// Delete confirmation
const confirmDeleteId = ref<number | null>(null);

function doDelete() {
  if (confirmDeleteId.value !== null) {
    deleteJob(confirmDeleteId.value);
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
            Manage and track all open positions
          </p>
          <p class="mt-1 text-sm text-muted">
            {{ jobs.length }} roles across departments.
          </p>
        </div>
        <button class="admin-primary-button" type="button" @click="openCreate">
          <Plus class="size-4" />
          Post New Job
        </button>
      </div>
      <div class="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label
          class="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-line bg-panel-soft px-3.5 py-2.5 text-sm text-muted"
        >
          <Search class="size-4 shrink-0" />
          <input
            v-model="search"
            class="w-full bg-transparent outline-none placeholder:text-muted"
            placeholder="Search jobs, departments, locations"
            type="search"
          />
        </label>
        <button
          class="admin-secondary-button relative"
          type="button"
          @click="filterOpen = !filterOpen"
        >
          <Filter class="size-4" />
          Filters
          <span
            v-if="filterCount > 0"
            class="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-green text-[10px] font-bold text-white"
          >{{ filterCount }}</span>
        </button>
      </div>
      <AdminFilterPanel v-model="activeFilters" :open="filterOpen" :groups="filterGroups" />
    </section>

    <div class="admin-card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="admin-table">
          <thead>
            <tr class="border-b border-line bg-panel-soft">
              <th>Job Title</th>
              <th>Department</th>
              <th>Location</th>
              <th>Applicants</th>
              <th>Status</th>
              <th>Posted</th>
              <th />
            </tr>
          </thead>
          <tbody class="divide-y divide-line bg-white">
            <tr
              v-for="job in filtered"
              :key="job.id"
              class="transition-colors hover:bg-panel-soft"
            >
              <td>
                <NuxtLink
                  :to="`/jobs/${job.id}`"
                  class="flex items-center gap-3"
                >
                  <span
                    class="grid size-10 shrink-0 place-items-center rounded-2xl bg-sky/10 text-sky"
                  >
                    <BriefcaseBusiness class="size-4" />
                  </span>
                  <div>
                    <p class="font-semibold text-ink hover:text-green">
                      {{ job.title }}
                    </p>
                    <p class="text-xs text-muted">{{ job.type }}</p>
                  </div>
                </NuxtLink>
              </td>
              <td class="text-muted">{{ job.department }}</td>
              <td>
                <span class="flex items-center gap-1.5 text-muted">
                  <MapPin class="size-3.5" />{{ job.location }}
                </span>
              </td>
              <td>
                <span class="flex items-center gap-1.5 font-medium text-ink">
                  <Users class="size-3.5 text-muted" />{{ job.applicants }}
                </span>
              </td>
              <td>
                <span
                  :class="[
                    'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold',
                    statusColor[job.status],
                  ]"
                >
                  {{ job.status }}
                </span>
              </td>
              <td class="text-xs font-medium text-muted">{{ job.posted }}</td>
              <td>
                <div class="relative">
                  <button
                    class="admin-icon-button size-8"
                    type="button"
                    :aria-label="`Actions for ${job.title}`"
                    @click.stop="toggleMenu(job.id)"
                  >
                    <MoreVertical class="size-4" />
                  </button>
                  <div
                    v-if="openMenuId === job.id"
                    class="absolute right-0 top-9 z-10 min-w-36 rounded-xl border border-line bg-panel py-1 shadow-lg"
                  >
                    <button
                      class="flex w-full items-center gap-2 px-4 py-2 text-sm text-ink hover:bg-panel-soft"
                      type="button"
                      @click="openEdit(job); closeMenu()"
                    >
                      <Pencil class="size-3.5" />Edit
                    </button>
                    <button
                      class="flex w-full items-center gap-2 px-4 py-2 text-sm text-coral hover:bg-coral/5"
                      type="button"
                      @click="confirmDeleteId = job.id; closeMenu()"
                    >
                      <Trash2 class="size-3.5" />Delete
                    </button>
                  </div>
                </div>
              </td>
            </tr>
            <tr v-if="filtered.length === 0">
              <td colspan="7" class="py-12 text-center text-sm text-muted">
                No jobs match your search.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create / Edit slide-over -->
    <AdminSlideOver
      :open="panelOpen"
      :title="editingId ? 'Edit Job' : 'Post New Job'"
      :subtitle="
        editingId
          ? 'Update the job details below.'
          : 'Fill in the details to publish a new role.'
      "
      @close="closePanel"
    >
      <form class="flex flex-col gap-5" @submit.prevent="saveJob">
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div class="flex flex-col gap-1.5 sm:col-span-2">
            <label class="text-xs font-semibold text-ink">Job Title *</label>
            <input
              v-model="form.title"
              class="admin-input w-full"
              type="text"
              placeholder="e.g. Senior Frontend Developer"
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
            <label class="text-xs font-semibold text-ink">Location</label>
            <input
              v-model="form.location"
              class="admin-input w-full"
              type="text"
              placeholder="e.g. Lagos, NG or Remote"
            />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold text-ink">Type</label>
            <select v-model="form.type" class="admin-input w-full">
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Internship</option>
            </select>
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold text-ink">Status</label>
            <select v-model="form.status" class="admin-input w-full">
              <option>Open</option>
              <option>Draft</option>
              <option>Closed</option>
            </select>
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold text-ink">Salary</label>
            <input
              v-model="form.salary"
              class="admin-input w-full"
              type="text"
              placeholder="e.g. ₦500,000/mo"
            />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold text-ink">Employer</label>
            <input
              v-model="form.employer"
              class="admin-input w-full"
              type="text"
              placeholder="Hiring company"
            />
          </div>
          <div class="flex flex-col gap-1.5 sm:col-span-2">
            <label class="text-xs font-semibold text-ink">Description</label>
            <textarea
              v-model="form.description"
              class="admin-input w-full resize-none"
              rows="5"
              placeholder="Describe the role, responsibilities, and requirements…"
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
          :disabled="!form.title.trim()"
          @click="saveJob"
        >
          {{ editingId ? 'Save Changes' : 'Post Job' }}
        </button>
      </template>
    </AdminSlideOver>

    <!-- Delete confirmation overlay -->
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
              Delete this job?
            </h3>
            <p class="mt-2 text-sm text-muted">
              This will permanently remove the job listing. This action cannot
              be undone.
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
