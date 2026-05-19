<script setup lang="ts">
import {
  ArrowLeft,
  BriefcaseBusiness,
  MapPin,
  Pencil,
  Trash2,
  Users,
} from '@lucide/vue';
import type { Job } from '~/composables/useJobs';

defineOptions({ name: 'AdminJobDetailPage' });

const route = useRoute();
const router = useRouter();
const { jobs, updateJob, deleteJob } = useJobs();

const job = computed(() =>
  jobs.value.find((j) => j.id === Number(route.params.id)),
);

useHead(
  computed(() => ({ title: job.value ? `${job.value.title} – SaintHR Admin` : 'Job – SaintHR Admin' })),
);

watchEffect(() => {
  if (jobs.value.length && !job.value) navigateTo('/jobs');
});

const statusColor: Record<string, string> = {
  Open: 'bg-green/10 text-green',
  Draft: 'bg-gold/10 text-gold',
  Closed: 'bg-coral/10 text-coral',
};

// Edit panel
const panelOpen = ref(false);

const form = ref<Omit<Job, 'id' | 'applicants' | 'posted'>>({
  title: '',
  department: '',
  location: '',
  type: '',
  status: '',
  salary: '',
  employer: '',
  description: '',
});

function openEdit() {
  if (!job.value) return;
  form.value = {
    title: job.value.title,
    department: job.value.department,
    location: job.value.location,
    type: job.value.type,
    status: job.value.status,
    salary: job.value.salary,
    employer: job.value.employer,
    description: job.value.description,
  };
  panelOpen.value = true;
}

function saveJob() {
  if (!job.value || !form.value.title.trim()) return;
  updateJob(job.value.id, form.value);
  panelOpen.value = false;
}

// Delete
const confirmDelete = ref(false);

function doDelete() {
  if (!job.value) return;
  deleteJob(job.value.id);
  router.push('/jobs');
}
</script>

<template>
  <div v-if="job" class="flex flex-col gap-6">
    <!-- Back + actions -->
    <div class="flex items-center justify-between">
      <NuxtLink
        to="/jobs"
        class="flex items-center gap-2 text-sm font-semibold text-muted transition hover:text-ink"
      >
        <ArrowLeft class="size-4" />Back to Jobs
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
      <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
        <span
          class="grid size-14 shrink-0 place-items-center rounded-2xl bg-sky/10 text-sky"
        >
          <BriefcaseBusiness class="size-6" />
        </span>
        <div class="flex-1">
          <div class="flex flex-wrap items-center gap-3">
            <h1 class="font-display text-2xl font-semibold text-ink">
              {{ job.title }}
            </h1>
            <span
              :class="[
                'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold',
                statusColor[job.status],
              ]"
            >
              {{ job.status }}
            </span>
          </div>
          <div class="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted">
            <span class="flex items-center gap-1.5">
              <MapPin class="size-3.5" />{{ job.location }}
            </span>
            <span>{{ job.department }}</span>
            <span>{{ job.type }}</span>
            <span v-if="job.employer">{{ job.employer }}</span>
          </div>
        </div>
        <div class="flex shrink-0 items-center gap-1.5 text-sm font-medium text-ink">
          <Users class="size-4 text-muted" />
          {{ job.applicants }} applicant{{ job.applicants !== 1 ? 's' : '' }}
        </div>
      </div>
    </section>

    <!-- Details grid -->
    <div class="grid gap-6 lg:grid-cols-3">
      <!-- Description -->
      <div class="admin-card p-6 lg:col-span-2">
        <h2 class="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-muted">
          Description
        </h2>
        <p class="text-sm leading-relaxed text-ink">
          {{ job.description || 'No description provided.' }}
        </p>
      </div>

      <!-- Details sidebar -->
      <div class="flex flex-col gap-4">
        <div class="admin-card p-5">
          <h2 class="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-muted">
            Job Details
          </h2>
          <dl class="flex flex-col gap-3">
            <div>
              <dt class="text-xs text-muted">Department</dt>
              <dd class="mt-0.5 text-sm font-semibold text-ink">
                {{ job.department || '—' }}
              </dd>
            </div>
            <div>
              <dt class="text-xs text-muted">Location</dt>
              <dd class="mt-0.5 text-sm font-semibold text-ink">
                {{ job.location || '—' }}
              </dd>
            </div>
            <div>
              <dt class="text-xs text-muted">Type</dt>
              <dd class="mt-0.5 text-sm font-semibold text-ink">
                {{ job.type || '—' }}
              </dd>
            </div>
            <div>
              <dt class="text-xs text-muted">Salary</dt>
              <dd class="mt-0.5 text-sm font-semibold text-ink">
                {{ job.salary || '—' }}
              </dd>
            </div>
            <div>
              <dt class="text-xs text-muted">Employer</dt>
              <dd class="mt-0.5 text-sm font-semibold text-ink">
                {{ job.employer || '—' }}
              </dd>
            </div>
            <div>
              <dt class="text-xs text-muted">Posted</dt>
              <dd class="mt-0.5 text-sm font-semibold text-ink">
                {{ job.posted }}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>

    <!-- Edit slide-over -->
    <AdminSlideOver
      :open="panelOpen"
      title="Edit Job"
      subtitle="Update the job details below."
      @close="panelOpen = false"
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
              placeholder="Describe the role…"
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
          :disabled="!form.title.trim()"
          @click="saveJob"
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
              Delete this job?
            </h3>
            <p class="mt-2 text-sm text-muted">
              <strong class="text-ink">{{ job.title }}</strong> will be
              permanently removed. This action cannot be undone.
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
