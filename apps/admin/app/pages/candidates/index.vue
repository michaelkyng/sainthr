<script setup lang="ts">
import {
  Filter,
  Mail,
  MoreVertical,
  Pencil,
  Phone,
  Plus,
  Search,
  Trash2,
} from '@lucide/vue';
import type { Candidate } from '~/composables/useCandidates';
import AdminFilterPanel from '~/components/admin/FilterPanel.vue';
import type { FilterGroup } from '~/components/admin/FilterPanel.vue';

defineOptions({ name: 'AdminCandidatesPage' });
useHead({ title: 'Candidates – SaintHR Admin' });

const { candidates, addCandidate, updateCandidate, deleteCandidate } =
  useCandidates();

const statusColor: Record<string, string> = {
  New: 'bg-gold/10 text-gold',
  Reviewed: 'bg-ink/10 text-ink',
  Shortlisted: 'bg-green/10 text-green',
  Interview: 'bg-mint text-ink',
  Rejected: 'bg-coral/10 text-coral',
};

const statusCounts = computed(() => ({
  New: candidates.value.filter((c) => c.status === 'New').length,
  Shortlisted: candidates.value.filter((c) => c.status === 'Shortlisted').length,
  Interview: candidates.value.filter((c) => c.status === 'Interview').length,
  Rejected: candidates.value.filter((c) => c.status === 'Rejected').length,
}));

const initials = (name: string) =>
  name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();

const search = ref('');

// Filters
const filterOpen = ref(false);
const filterGroups: FilterGroup[] = [
  { label: 'Status', key: 'status', options: ['New', 'Reviewed', 'Shortlisted', 'Interview', 'Rejected'] },
  { label: 'Source', key: 'source', options: ['Direct', 'LinkedIn', 'Referral', 'Careers Page'] },
];
const activeFilters = ref<Record<string, string[]>>({ status: [], source: [] });
const filterCount = computed(() =>
  Object.values(activeFilters.value).reduce((n, arr) => n + arr.length, 0),
);

const filtered = computed(() =>
  candidates.value.filter((c) => {
    if (search.value && !c.name.toLowerCase().includes(search.value.toLowerCase()) && !c.role.toLowerCase().includes(search.value.toLowerCase()) && !c.source.toLowerCase().includes(search.value.toLowerCase())) return false;
    if (activeFilters.value.status.length && !activeFilters.value.status.includes(c.status)) return false;
    if (activeFilters.value.source.length && !activeFilters.value.source.includes(c.source)) return false;
    return true;
  }),
);

const panelOpen = ref(false);
const editingId = ref<number | null>(null);

const emptyForm = (): Omit<Candidate, 'id' | 'added'> => ({
  name: '',
  email: '',
  phone: '',
  role: '',
  status: 'New',
  source: 'Direct',
  notes: '',
});

const form = ref(emptyForm());

function openCreate() {
  editingId.value = null;
  form.value = emptyForm();
  panelOpen.value = true;
}

function openEdit(c: Candidate) {
  editingId.value = c.id;
  form.value = { name: c.name, email: c.email, phone: c.phone, role: c.role, status: c.status, source: c.source, notes: c.notes };
  panelOpen.value = true;
}

function closePanel() { panelOpen.value = false; }

function saveCandidate() {
  if (!form.value.name.trim()) return;
  if (editingId.value !== null) {
    updateCandidate(editingId.value, form.value);
  } else {
    addCandidate(form.value);
  }
  closePanel();
}

const confirmDeleteId = ref<number | null>(null);

function doDelete() {
  if (confirmDeleteId.value !== null) {
    deleteCandidate(confirmDeleteId.value);
    confirmDeleteId.value = null;
  }
}

const openMenuId = ref<number | null>(null);
function toggleMenu(id: number) { openMenuId.value = openMenuId.value === id ? null : id; }
function closeMenu() { openMenuId.value = null; }
</script>

<template>
  <div class="flex flex-col gap-6">
    <section class="admin-card p-5">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p class="text-sm font-semibold text-ink">All candidates in the pipeline</p>
          <p class="mt-1 text-sm text-muted">Shortlist, filter, and contact talent from one place.</p>
        </div>
        <button class="admin-primary-button" type="button" @click="openCreate">
          <Plus class="size-4" />Add Candidate
        </button>
      </div>
      <div class="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label class="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-line bg-panel-soft px-3.5 py-2.5 text-sm text-muted">
          <Search class="size-4 shrink-0" />
          <input v-model="search" class="w-full bg-transparent outline-none placeholder:text-muted" placeholder="Search candidates, roles, sources" type="search" />
        </label>
        <button
          class="admin-secondary-button relative"
          type="button"
          @click="filterOpen = !filterOpen"
        >
          <Filter class="size-4" />Filter
          <span
            v-if="filterCount > 0"
            class="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center rounded-full bg-green text-[10px] font-bold text-white"
          >{{ filterCount }}</span>
        </button>
      </div>
      <AdminFilterPanel v-model="activeFilters" :open="filterOpen" :groups="filterGroups" />
    </section>

    <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <div class="admin-surface p-4">
        <p class="text-xs font-bold uppercase tracking-[0.12em] text-muted">New</p>
        <p class="mt-2 font-display text-2xl font-semibold text-ink">{{ statusCounts.New }}</p>
      </div>
      <div class="admin-surface p-4">
        <p class="text-xs font-bold uppercase tracking-[0.12em] text-muted">Shortlisted</p>
        <p class="mt-2 font-display text-2xl font-semibold text-green">{{ statusCounts.Shortlisted }}</p>
      </div>
      <div class="admin-surface p-4">
        <p class="text-xs font-bold uppercase tracking-[0.12em] text-muted">Interview</p>
        <p class="mt-2 font-display text-2xl font-semibold text-plum">{{ statusCounts.Interview }}</p>
      </div>
      <div class="admin-surface p-4">
        <p class="text-xs font-bold uppercase tracking-[0.12em] text-muted">Rejected</p>
        <p class="mt-2 font-display text-2xl font-semibold text-coral">{{ statusCounts.Rejected }}</p>
      </div>
    </div>

    <div class="admin-card overflow-hidden">
      <div class="overflow-x-auto">
        <table class="admin-table">
          <thead>
            <tr class="border-b border-line bg-panel-soft">
              <th>Candidate</th><th>Contact</th><th>Applied For</th><th>Source</th><th>Status</th><th>Added</th><th />
            </tr>
          </thead>
          <tbody class="divide-y divide-line bg-white">
            <tr v-for="c in filtered" :key="c.id" class="transition-colors hover:bg-panel-soft">
              <td>
                <NuxtLink :to="`/candidates/${c.id}`" class="flex items-center gap-3">
                  <span class="grid size-10 shrink-0 place-items-center rounded-2xl bg-ink text-xs font-bold text-white">{{ initials(c.name) }}</span>
                  <p class="font-semibold text-ink hover:text-green">{{ c.name }}</p>
                </NuxtLink>
              </td>
              <td>
                <div class="flex flex-col gap-1">
                  <span class="flex items-center gap-1.5 text-xs text-muted"><Mail class="size-3" />{{ c.email }}</span>
                  <span class="flex items-center gap-1.5 text-xs text-muted"><Phone class="size-3" />{{ c.phone }}</span>
                </div>
              </td>
              <td class="text-muted">{{ c.role }}</td>
              <td class="text-muted">{{ c.source }}</td>
              <td>
                <span :class="['inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold', statusColor[c.status]]">{{ c.status }}</span>
              </td>
              <td class="text-xs font-medium text-muted">{{ c.added }}</td>
              <td>
                <div class="relative">
                  <button class="admin-icon-button size-8" type="button" :aria-label="`Actions for ${c.name}`" @click.stop="toggleMenu(c.id)">
                    <MoreVertical class="size-4" />
                  </button>
                  <div v-if="openMenuId === c.id" class="absolute right-0 top-9 z-10 min-w-36 rounded-xl border border-line bg-panel py-1 shadow-lg">
                    <button class="flex w-full items-center gap-2 px-4 py-2 text-sm text-ink hover:bg-panel-soft" type="button" @click="openEdit(c); closeMenu()">
                      <Pencil class="size-3.5" />Edit
                    </button>
                    <button class="flex w-full items-center gap-2 px-4 py-2 text-sm text-coral hover:bg-coral/5" type="button" @click="confirmDeleteId = c.id; closeMenu()">
                      <Trash2 class="size-3.5" />Delete
                    </button>
                  </div>
                </div>
              </td>
            </tr>
            <tr v-if="filtered.length === 0">
              <td colspan="7" class="py-12 text-center text-sm text-muted">No candidates match your search.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <AdminSlideOver
      :open="panelOpen"
      :title="editingId ? 'Edit Candidate' : 'Add Candidate'"
      :subtitle="editingId ? 'Update candidate details.' : 'Add a new candidate to the pipeline.'"
      @close="closePanel"
    >
      <form class="flex flex-col gap-5" @submit.prevent="saveCandidate">
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div class="flex flex-col gap-1.5 sm:col-span-2">
            <label class="text-xs font-semibold text-ink">Full Name *</label>
            <input v-model="form.name" class="admin-input w-full" type="text" placeholder="e.g. Jane Doe" required />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold text-ink">Email</label>
            <input v-model="form.email" class="admin-input w-full" type="email" placeholder="jane@email.com" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold text-ink">Phone</label>
            <input v-model="form.phone" class="admin-input w-full" type="tel" placeholder="+234 800 000 0000" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold text-ink">Applied For</label>
            <input v-model="form.role" class="admin-input w-full" type="text" placeholder="e.g. Senior Designer" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold text-ink">Source</label>
            <select v-model="form.source" class="admin-input w-full">
              <option>Direct</option><option>LinkedIn</option><option>Referral</option><option>Careers Page</option><option>Other</option>
            </select>
          </div>
          <div class="flex flex-col gap-1.5 sm:col-span-2">
            <label class="text-xs font-semibold text-ink">Status</label>
            <select v-model="form.status" class="admin-input w-full">
              <option>New</option><option>Reviewed</option><option>Shortlisted</option><option>Interview</option><option>Rejected</option>
            </select>
          </div>
          <div class="flex flex-col gap-1.5 sm:col-span-2">
            <label class="text-xs font-semibold text-ink">Notes</label>
            <textarea v-model="form.notes" class="admin-input w-full resize-none" rows="4" placeholder="Internal notes about this candidate…" />
          </div>
        </div>
      </form>
      <template #footer>
        <button class="admin-secondary-button" type="button" @click="closePanel">Cancel</button>
        <button class="admin-primary-button" type="button" :disabled="!form.name.trim()" @click="saveCandidate">
          {{ editingId ? 'Save Changes' : 'Add Candidate' }}
        </button>
      </template>
    </AdminSlideOver>

    <Teleport to="body">
      <Transition enter-active-class="transition-opacity duration-150" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition-opacity duration-150" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="confirmDeleteId !== null" class="fixed inset-0 z-50 flex items-center justify-center bg-ink/30 backdrop-blur-sm" @click.self="confirmDeleteId = null">
          <div class="admin-card w-full max-w-sm p-6">
            <h3 class="font-display text-base font-semibold text-ink">Remove this candidate?</h3>
            <p class="mt-2 text-sm text-muted">This will permanently remove the candidate record. This action cannot be undone.</p>
            <div class="mt-5 flex justify-end gap-3">
              <button class="admin-secondary-button" type="button" @click="confirmDeleteId = null">Cancel</button>
              <button class="inline-flex items-center justify-center gap-2 rounded-xl bg-coral px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-90" type="button" @click="doDelete">Delete</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
