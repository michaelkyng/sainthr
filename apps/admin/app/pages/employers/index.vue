<script setup lang="ts">
import {
  Building2,
  Filter,
  Globe,
  Mail,
  MoreVertical,
  Pencil,
  Plus,
  Search,
  Trash2,
} from '@lucide/vue';
import type { Employer } from '~/composables/useEmployers';
import AdminFilterPanel from '~/components/admin/FilterPanel.vue';
import type { FilterGroup } from '~/components/admin/FilterPanel.vue';

defineOptions({ name: 'AdminEmployersPage' });
useHead({ title: 'Employers – SaintHR Admin' });

const { employers, addEmployer, updateEmployer, deleteEmployer } =
  useEmployers();

const statusColor: Record<string, string> = {
  Active: 'bg-green/10 text-green',
  Inactive: 'bg-coral/10 text-coral',
};

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
  { label: 'Status', key: 'status', options: ['Active', 'Inactive'] },
  { label: 'Industry', key: 'industry', options: ['Technology', 'Energy', 'Finance', 'Healthcare', 'Media & Comms', 'Construction'] },
];
const activeFilters = ref<Record<string, string[]>>({ status: [], industry: [] });
const filterCount = computed(() =>
  Object.values(activeFilters.value).reduce((n, arr) => n + arr.length, 0),
);

const filtered = computed(() =>
  employers.value.filter((e) => {
    if (search.value && !e.name.toLowerCase().includes(search.value.toLowerCase()) && !e.industry.toLowerCase().includes(search.value.toLowerCase()) && !e.contact.toLowerCase().includes(search.value.toLowerCase())) return false;
    if (activeFilters.value.status.length && !activeFilters.value.status.includes(e.status)) return false;
    if (activeFilters.value.industry.length && !activeFilters.value.industry.includes(e.industry)) return false;
    return true;
  }),
);

// Slide-over form
const panelOpen = ref(false);
const editingId = ref<number | null>(null);

const emptyForm = (): Omit<Employer, 'id' | 'jobs'> => ({
  name: '',
  industry: '',
  contact: '',
  email: '',
  website: '',
  phone: '',
  address: '',
  status: 'Active',
  description: '',
});

const form = ref(emptyForm());

function openCreate() {
  editingId.value = null;
  form.value = emptyForm();
  panelOpen.value = true;
}

function openEdit(emp: Employer) {
  editingId.value = emp.id;
  form.value = {
    name: emp.name,
    industry: emp.industry,
    contact: emp.contact,
    email: emp.email,
    website: emp.website,
    phone: emp.phone,
    address: emp.address,
    status: emp.status,
    description: emp.description,
  };
  panelOpen.value = true;
}

function closePanel() {
  panelOpen.value = false;
}

function saveEmployer() {
  if (!form.value.name.trim()) return;
  if (editingId.value !== null) {
    updateEmployer(editingId.value, form.value);
  } else {
    addEmployer(form.value);
  }
  closePanel();
}

// Delete
const confirmDeleteId = ref<number | null>(null);

function doDelete() {
  if (confirmDeleteId.value !== null) {
    deleteEmployer(confirmDeleteId.value);
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
            Companies and organisations using SaintHR
          </p>
          <p class="mt-1 text-sm text-muted">
            Monitor active clients, contacts, and job volume.
          </p>
        </div>
        <button class="admin-primary-button" type="button" @click="openCreate">
          <Plus class="size-4" />
          Add Employer
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
            placeholder="Search employers, contacts, industries"
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
              <th>Company</th>
              <th>Industry</th>
              <th>Contact</th>
              <th>Website</th>
              <th>Active Jobs</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody class="divide-y divide-line bg-white">
            <tr
              v-for="emp in filtered"
              :key="emp.id"
              class="transition-colors hover:bg-panel-soft"
            >
              <td>
                <NuxtLink
                  :to="`/employers/${emp.id}`"
                  class="flex items-center gap-3"
                >
                  <span
                    class="grid size-10 shrink-0 place-items-center rounded-2xl bg-ink text-xs font-bold text-white"
                  >
                    {{ initials(emp.name) }}
                  </span>
                  <p class="font-semibold text-ink hover:text-green">
                    {{ emp.name }}
                  </p>
                </NuxtLink>
              </td>
              <td class="text-muted">{{ emp.industry }}</td>
              <td>
                <div class="flex flex-col gap-1">
                  <p class="text-xs font-bold text-ink">{{ emp.contact }}</p>
                  <span class="flex items-center gap-1.5 text-xs text-muted"
                    ><Mail class="size-3" />{{ emp.email }}</span
                  >
                </div>
              </td>
              <td>
                <span class="flex items-center gap-1.5 text-xs text-muted">
                  <Globe class="size-3" />{{ emp.website }}
                </span>
              </td>
              <td>
                <span class="flex items-center gap-2 font-semibold text-ink">
                  <Building2 class="size-4 text-muted" />{{ emp.jobs }}
                </span>
              </td>
              <td>
                <span
                  :class="[
                    'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold',
                    statusColor[emp.status],
                  ]"
                >
                  {{ emp.status }}
                </span>
              </td>
              <td>
                <div class="relative">
                  <button
                    class="admin-icon-button size-8"
                    type="button"
                    :aria-label="`Actions for ${emp.name}`"
                    @click.stop="toggleMenu(emp.id)"
                  >
                    <MoreVertical class="size-4" />
                  </button>
                  <div
                    v-if="openMenuId === emp.id"
                    v-click-outside="closeMenu"
                    class="absolute right-0 top-9 z-10 min-w-36 rounded-xl border border-line bg-panel py-1 shadow-lg"
                  >
                    <button
                      class="flex w-full items-center gap-2 px-4 py-2 text-sm text-ink hover:bg-panel-soft"
                      type="button"
                      @click="openEdit(emp); closeMenu()"
                    >
                      <Pencil class="size-3.5" />Edit
                    </button>
                    <button
                      class="flex w-full items-center gap-2 px-4 py-2 text-sm text-coral hover:bg-coral/5"
                      type="button"
                      @click="confirmDeleteId = emp.id; closeMenu()"
                    >
                      <Trash2 class="size-3.5" />Delete
                    </button>
                  </div>
                </div>
              </td>
            </tr>
            <tr v-if="filtered.length === 0">
              <td colspan="7" class="py-12 text-center text-sm text-muted">
                No employers match your search.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create / Edit slide-over -->
    <AdminSlideOver
      :open="panelOpen"
      :title="editingId ? 'Edit Employer' : 'Add Employer'"
      :subtitle="editingId ? 'Update employer details.' : 'Add a new company to the directory.'"
      @close="closePanel"
    >
      <form class="flex flex-col gap-5" @submit.prevent="saveEmployer">
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div class="flex flex-col gap-1.5 sm:col-span-2">
            <label class="text-xs font-semibold text-ink">Company Name *</label>
            <input
              v-model="form.name"
              class="admin-input w-full"
              type="text"
              placeholder="e.g. TechNova Ltd"
              required
            />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold text-ink">Industry</label>
            <input
              v-model="form.industry"
              class="admin-input w-full"
              type="text"
              placeholder="e.g. Technology"
            />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold text-ink">Status</label>
            <select v-model="form.status" class="admin-input w-full">
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold text-ink">Contact Name</label>
            <input
              v-model="form.contact"
              class="admin-input w-full"
              type="text"
              placeholder="Primary contact"
            />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold text-ink">Contact Email</label>
            <input
              v-model="form.email"
              class="admin-input w-full"
              type="email"
              placeholder="contact@company.com"
            />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold text-ink">Phone</label>
            <input
              v-model="form.phone"
              class="admin-input w-full"
              type="tel"
              placeholder="+234 700 000 0000"
            />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold text-ink">Website</label>
            <input
              v-model="form.website"
              class="admin-input w-full"
              type="text"
              placeholder="company.com"
            />
          </div>
          <div class="flex flex-col gap-1.5 sm:col-span-2">
            <label class="text-xs font-semibold text-ink">Address</label>
            <input
              v-model="form.address"
              class="admin-input w-full"
              type="text"
              placeholder="City, State, Country"
            />
          </div>
          <div class="flex flex-col gap-1.5 sm:col-span-2">
            <label class="text-xs font-semibold text-ink">Description</label>
            <textarea
              v-model="form.description"
              class="admin-input w-full resize-none"
              rows="4"
              placeholder="Brief description of the company…"
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
          :disabled="!form.name.trim()"
          @click="saveEmployer"
        >
          {{ editingId ? 'Save Changes' : 'Add Employer' }}
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
              Remove this employer?
            </h3>
            <p class="mt-2 text-sm text-muted">
              This will permanently remove the employer record. This action
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
