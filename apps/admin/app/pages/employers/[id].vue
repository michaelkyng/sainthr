<script setup lang="ts">
import {
  ArrowLeft,
  Building2,
  Globe,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Trash2,
} from '@lucide/vue';
import type { Employer } from '~/composables/useEmployers';

defineOptions({ name: 'AdminEmployerDetailPage' });

const route = useRoute();
const router = useRouter();
const { employers, updateEmployer, deleteEmployer } = useEmployers();

const employer = computed(() =>
  employers.value.find((e) => e.id === Number(route.params.id)),
);

useHead(
  computed(() => ({
    title: employer.value
      ? `${employer.value.name} – SaintHR Admin`
      : 'Employer – SaintHR Admin',
  })),
);

watchEffect(() => {
  if (employers.value.length && !employer.value) navigateTo('/employers');
});

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

// Edit panel
const panelOpen = ref(false);
const form = ref<Omit<Employer, 'id' | 'jobs'>>({
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

function openEdit() {
  if (!employer.value) return;
  form.value = {
    name: employer.value.name,
    industry: employer.value.industry,
    contact: employer.value.contact,
    email: employer.value.email,
    website: employer.value.website,
    phone: employer.value.phone,
    address: employer.value.address,
    status: employer.value.status,
    description: employer.value.description,
  };
  panelOpen.value = true;
}

function saveEmployer() {
  if (!employer.value || !form.value.name.trim()) return;
  updateEmployer(employer.value.id, form.value);
  panelOpen.value = false;
}

// Delete
const confirmDelete = ref(false);

function doDelete() {
  if (!employer.value) return;
  deleteEmployer(employer.value.id);
  router.push('/employers');
}
</script>

<template>
  <div v-if="employer" class="flex flex-col gap-6">
    <!-- Back + actions -->
    <div class="flex items-center justify-between">
      <NuxtLink
        to="/employers"
        class="flex items-center gap-2 text-sm font-semibold text-muted transition hover:text-ink"
      >
        <ArrowLeft class="size-4" />Back to Employers
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
          {{ initials(employer.name) }}
        </span>
        <div class="flex-1">
          <div class="flex flex-wrap items-center gap-3">
            <h1 class="font-display text-2xl font-semibold text-ink">
              {{ employer.name }}
            </h1>
            <span
              :class="[
                'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold',
                statusColor[employer.status],
              ]"
            >
              {{ employer.status }}
            </span>
          </div>
          <p class="mt-1 text-sm text-muted">{{ employer.industry }}</p>
          <div class="mt-2 flex flex-wrap gap-4 text-xs text-muted">
            <span v-if="employer.website" class="flex items-center gap-1.5">
              <Globe class="size-3" />{{ employer.website }}
            </span>
            <span v-if="employer.address" class="flex items-center gap-1.5">
              <MapPin class="size-3" />{{ employer.address }}
            </span>
          </div>
        </div>
        <div class="flex shrink-0 items-center gap-1.5 text-sm font-medium text-ink">
          <Building2 class="size-4 text-muted" />
          {{ employer.jobs }} active job{{ employer.jobs !== 1 ? 's' : '' }}
        </div>
      </div>
    </section>

    <!-- Details grid -->
    <div class="grid gap-6 lg:grid-cols-3">
      <!-- About -->
      <div class="admin-card p-6 lg:col-span-2">
        <h2 class="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-muted">
          About
        </h2>
        <p class="text-sm leading-relaxed text-ink">
          {{ employer.description || 'No description provided.' }}
        </p>
      </div>

      <!-- Contact sidebar -->
      <div class="admin-card p-5">
        <h2 class="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-muted">
          Contact
        </h2>
        <dl class="flex flex-col gap-3">
          <div>
            <dt class="text-xs text-muted">Contact Person</dt>
            <dd class="mt-0.5 text-sm font-semibold text-ink">
              {{ employer.contact || '—' }}
            </dd>
          </div>
          <div>
            <dt class="text-xs text-muted">Email</dt>
            <dd class="mt-0.5">
              <a
                v-if="employer.email"
                :href="`mailto:${employer.email}`"
                class="flex items-center gap-1.5 text-sm font-semibold text-green hover:underline"
              >
                <Mail class="size-3.5" />{{ employer.email }}
              </a>
              <span v-else class="text-sm text-muted">—</span>
            </dd>
          </div>
          <div>
            <dt class="text-xs text-muted">Phone</dt>
            <dd class="mt-0.5">
              <a
                v-if="employer.phone"
                :href="`tel:${employer.phone}`"
                class="flex items-center gap-1.5 text-sm font-semibold text-ink hover:text-green"
              >
                <Phone class="size-3.5 text-muted" />{{ employer.phone }}
              </a>
              <span v-else class="text-sm text-muted">—</span>
            </dd>
          </div>
          <div>
            <dt class="text-xs text-muted">Industry</dt>
            <dd class="mt-0.5 text-sm font-semibold text-ink">
              {{ employer.industry || '—' }}
            </dd>
          </div>
          <div>
            <dt class="text-xs text-muted">Address</dt>
            <dd class="mt-0.5 text-sm font-semibold text-ink">
              {{ employer.address || '—' }}
            </dd>
          </div>
        </dl>
      </div>
    </div>

    <!-- Edit slide-over -->
    <AdminSlideOver
      :open="panelOpen"
      title="Edit Employer"
      subtitle="Update employer details."
      @close="panelOpen = false"
    >
      <form class="flex flex-col gap-5" @submit.prevent="saveEmployer">
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div class="flex flex-col gap-1.5 sm:col-span-2">
            <label class="text-xs font-semibold text-ink">Company Name *</label>
            <input
              v-model="form.name"
              class="admin-input w-full"
              type="text"
            />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold text-ink">Industry</label>
            <input
              v-model="form.industry"
              class="admin-input w-full"
              type="text"
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
            />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold text-ink">Contact Email</label>
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
            <label class="text-xs font-semibold text-ink">Website</label>
            <input
              v-model="form.website"
              class="admin-input w-full"
              type="text"
            />
          </div>
          <div class="flex flex-col gap-1.5 sm:col-span-2">
            <label class="text-xs font-semibold text-ink">Address</label>
            <input
              v-model="form.address"
              class="admin-input w-full"
              type="text"
            />
          </div>
          <div class="flex flex-col gap-1.5 sm:col-span-2">
            <label class="text-xs font-semibold text-ink">Description</label>
            <textarea
              v-model="form.description"
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
          @click="saveEmployer"
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
              Remove this employer?
            </h3>
            <p class="mt-2 text-sm text-muted">
              <strong class="text-ink">{{ employer.name }}</strong> will be
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
