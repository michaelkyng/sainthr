<script setup lang="ts">
import { ArrowLeft, Mail, Pencil, Phone, Trash2 } from '@lucide/vue';
import type { Candidate } from '~/composables/useCandidates';

defineOptions({ name: 'AdminCandidateDetailPage' });

const route = useRoute();
const router = useRouter();
const { candidates, updateCandidate, deleteCandidate } = useCandidates();

const candidate = computed(() =>
  candidates.value.find((c) => c.id === Number(route.params.id)),
);

useHead(
  computed(() => ({
    title: candidate.value
      ? `${candidate.value.name} – SaintHR Admin`
      : 'Candidate – SaintHR Admin',
  })),
);

watchEffect(() => {
  if (candidates.value.length && !candidate.value) navigateTo('/candidates');
});

const statusColor: Record<string, string> = {
  New: 'bg-gold/10 text-gold',
  Reviewed: 'bg-ink/10 text-ink',
  Shortlisted: 'bg-green/10 text-green',
  Interview: 'bg-mint text-ink',
  Rejected: 'bg-coral/10 text-coral',
};

const initials = (name: string) =>
  name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

// Edit panel
const panelOpen = ref(false);
const form = ref<Omit<Candidate, 'id' | 'added'>>({
  name: '',
  email: '',
  phone: '',
  role: '',
  status: 'New',
  source: 'Direct',
  notes: '',
});

function openEdit() {
  if (!candidate.value) return;
  form.value = {
    name: candidate.value.name,
    email: candidate.value.email,
    phone: candidate.value.phone,
    role: candidate.value.role,
    status: candidate.value.status,
    source: candidate.value.source,
    notes: candidate.value.notes,
  };
  panelOpen.value = true;
}

function saveCandidate() {
  if (!candidate.value || !form.value.name.trim()) return;
  updateCandidate(candidate.value.id, form.value);
  panelOpen.value = false;
}

// Delete
const confirmDelete = ref(false);

function doDelete() {
  if (!candidate.value) return;
  deleteCandidate(candidate.value.id);
  router.push('/candidates');
}
</script>

<template>
  <div v-if="candidate" class="flex flex-col gap-6">
    <!-- Back + actions -->
    <div class="flex items-center justify-between">
      <NuxtLink
        to="/candidates"
        class="flex items-center gap-2 text-sm font-semibold text-muted transition hover:text-ink"
      >
        <ArrowLeft class="size-4" />Back to Candidates
      </NuxtLink>
      <div class="flex items-center gap-2">
        <button class="admin-secondary-button" type="button" @click="openEdit">
          <Pencil class="size-4" />
          Edit
        </button>
        <button
          class="inline-flex items-center justify-center gap-2 rounded-xl border border-coral/30 bg-coral/5 px-3.5 py-2.5 text-sm font-semibold text-coral transition hover:bg-coral/10"
          type="button"
          @click="confirmDelete = true"
        >
          <Trash2 class="size-4" />
          Delete
        </button>
      </div>
    </div>

    <!-- Header card -->
    <section class="admin-card p-6">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
        <span
          class="grid size-16 shrink-0 place-items-center rounded-2xl bg-ink text-lg font-bold text-white"
        >
          {{ initials(candidate.name) }}
        </span>
        <div class="flex-1">
          <div class="flex flex-wrap items-center gap-3">
            <h1 class="font-display text-2xl font-semibold text-ink">
              {{ candidate.name }}
            </h1>
            <span
              :class="[
                'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold',
                statusColor[candidate.status],
              ]"
            >
              {{ candidate.status }}
            </span>
          </div>
          <p class="mt-1 text-sm text-muted">
            Applied for: <strong class="text-ink">{{ candidate.role || '—' }}</strong>
          </p>
          <div class="mt-2 flex flex-wrap gap-4 text-xs text-muted">
            <span class="flex items-center gap-1.5">
              <Mail class="size-3" />{{ candidate.email || '—' }}
            </span>
            <span class="flex items-center gap-1.5">
              <Phone class="size-3" />{{ candidate.phone || '—' }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Details grid -->
    <div class="grid gap-6 lg:grid-cols-3">
      <!-- Notes -->
      <div class="admin-card p-6 lg:col-span-2">
        <h2 class="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-muted">
          Notes
        </h2>
        <p class="text-sm leading-relaxed text-ink">
          {{ candidate.notes || 'No notes added yet.' }}
        </p>
      </div>

      <!-- Info sidebar -->
      <div class="admin-card p-5">
        <h2 class="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-muted">
          Profile Details
        </h2>
        <dl class="flex flex-col gap-3">
          <div>
            <dt class="text-xs text-muted">Status</dt>
            <dd class="mt-0.5">
              <span
                :class="[
                  'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold',
                  statusColor[candidate.status],
                ]"
              >
                {{ candidate.status }}
              </span>
            </dd>
          </div>
          <div>
            <dt class="text-xs text-muted">Applied For</dt>
            <dd class="mt-0.5 text-sm font-semibold text-ink">
              {{ candidate.role || '—' }}
            </dd>
          </div>
          <div>
            <dt class="text-xs text-muted">Source</dt>
            <dd class="mt-0.5 text-sm font-semibold text-ink">
              {{ candidate.source || '—' }}
            </dd>
          </div>
          <div>
            <dt class="text-xs text-muted">Added</dt>
            <dd class="mt-0.5 text-sm font-semibold text-ink">
              {{ candidate.added }}
            </dd>
          </div>
        </dl>
      </div>
    </div>

    <!-- Edit slide-over -->
    <AdminSlideOver
      :open="panelOpen"
      title="Edit Candidate"
      subtitle="Update candidate details."
      @close="panelOpen = false"
    >
      <form class="flex flex-col gap-5" @submit.prevent="saveCandidate">
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div class="flex flex-col gap-1.5 sm:col-span-2">
            <label class="text-xs font-semibold text-ink">Full Name *</label>
            <input
              v-model="form.name"
              class="admin-input w-full"
              type="text"
              placeholder="e.g. Jane Doe"
            />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold text-ink">Email</label>
            <input
              v-model="form.email"
              class="admin-input w-full"
              type="email"
            />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold text-ink">Phone</label>
            <input
              v-model="form.phone"
              class="admin-input w-full"
              type="tel"
            />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold text-ink">Applied For</label>
            <input
              v-model="form.role"
              class="admin-input w-full"
              type="text"
            />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold text-ink">Source</label>
            <select v-model="form.source" class="admin-input w-full">
              <option>Direct</option>
              <option>LinkedIn</option>
              <option>Referral</option>
              <option>Careers Page</option>
              <option>Other</option>
            </select>
          </div>
          <div class="flex flex-col gap-1.5 sm:col-span-2">
            <label class="text-xs font-semibold text-ink">Status</label>
            <select v-model="form.status" class="admin-input w-full">
              <option>New</option>
              <option>Reviewed</option>
              <option>Shortlisted</option>
              <option>Interview</option>
              <option>Rejected</option>
            </select>
          </div>
          <div class="flex flex-col gap-1.5 sm:col-span-2">
            <label class="text-xs font-semibold text-ink">Notes</label>
            <textarea
              v-model="form.notes"
              class="admin-input w-full resize-none"
              rows="4"
            />
          </div>
        </div>
      </form>
      <template #footer>
        <button
          class="admin-secondary-button"
          type="button"
          @click="panelOpen = false"
        >
          Cancel
        </button>
        <button
          class="admin-primary-button"
          type="button"
          :disabled="!form.name.trim()"
          @click="saveCandidate"
        >
          Save Changes
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
          v-if="confirmDelete"
          class="fixed inset-0 z-50 flex items-center justify-center bg-ink/30 backdrop-blur-sm"
          @click.self="confirmDelete = false"
        >
          <div class="admin-card w-full max-w-sm p-6">
            <h3 class="font-display text-base font-semibold text-ink">
              Remove this candidate?
            </h3>
            <p class="mt-2 text-sm text-muted">
              <strong class="text-ink">{{ candidate.name }}</strong> will be
              permanently removed.
            </p>
            <div class="mt-5 flex justify-end gap-3">
              <button
                class="admin-secondary-button"
                type="button"
                @click="confirmDelete = false"
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
