<script setup lang="ts">
import { ArrowLeft, Pencil, Trash2 } from '@lucide/vue';
import type { Application } from '~/composables/useApplications';

defineOptions({ name: 'AdminApplicationDetailPage' });

const route = useRoute();
const router = useRouter();
const { applications, updateApplication, deleteApplication } =
  useApplications();

const application = computed(() =>
  applications.value.find((a) => a.id === Number(route.params.id)),
);

useHead(
  computed(() => ({
    title: application.value
      ? `${application.value.candidate} – ${application.value.job} – SaintHR Admin`
      : 'Application – SaintHR Admin',
  })),
);

watchEffect(() => {
  if (applications.value.length && !application.value)
    navigateTo('/applications');
});

const stages = ['New', 'Review', 'Interview', 'Offer', 'Hired', 'Rejected'];

const stageColor: Record<string, string> = {
  New: 'bg-gold/10 text-gold',
  Review: 'bg-ink/10 text-ink',
  Interview: 'bg-mint text-ink',
  Offer: 'bg-green/10 text-green',
  Hired: 'bg-green/20 text-green',
  Rejected: 'bg-coral/10 text-coral',
};

const scoreColor = (score: number) => {
  if (score >= 80) return 'text-green';
  if (score >= 60) return 'text-gold';
  return 'text-coral';
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
const form = ref<Omit<Application, 'id' | 'date'>>({
  candidate: '',
  job: '',
  department: '',
  stage: 'New',
  score: 0,
  notes: '',
});

function openEdit() {
  if (!application.value) return;
  form.value = {
    candidate: application.value.candidate,
    job: application.value.job,
    department: application.value.department,
    stage: application.value.stage,
    score: application.value.score,
    notes: application.value.notes,
  };
  panelOpen.value = true;
}

function saveApplication() {
  if (!application.value || !form.value.candidate.trim()) return;
  updateApplication(application.value.id, form.value);
  panelOpen.value = false;
}

// Delete
const confirmDelete = ref(false);

function doDelete() {
  if (!application.value) return;
  deleteApplication(application.value.id);
  router.push('/applications');
}
</script>

<template>
  <div v-if="application" class="flex flex-col gap-6">
    <!-- Back + actions -->
    <div class="flex items-center justify-between">
      <NuxtLink
        to="/applications"
        class="flex items-center gap-2 text-sm font-semibold text-muted transition hover:text-ink"
      >
        <ArrowLeft class="size-4" />Back to Applications
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
          {{ initials(application.candidate) }}
        </span>
        <div class="flex-1">
          <div class="flex flex-wrap items-center gap-3">
            <h1 class="font-display text-2xl font-semibold text-ink">
              {{ application.candidate }}
            </h1>
            <span
              :class="[
                'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold',
                stageColor[application.stage],
              ]"
            >
              {{ application.stage }}
            </span>
          </div>
          <p class="mt-1 text-sm text-muted">
            Applied for:
            <strong class="text-ink">{{ application.job }}</strong>
            <span class="mx-2">·</span>
            {{ application.department }}
          </p>
        </div>
        <!-- Score -->
        <div class="flex shrink-0 flex-col items-center gap-1">
          <span
            :class="['font-display text-3xl font-semibold', scoreColor(application.score)]"
          >
            {{ application.score }}
          </span>
          <span class="text-xs text-muted">Score</span>
        </div>
      </div>

      <!-- Score bar -->
      <div class="mt-5">
        <div class="h-2 w-full overflow-hidden rounded-full bg-paper">
          <div
            class="h-full rounded-full transition-all duration-500"
            :class="application.score >= 80 ? 'bg-green' : application.score >= 60 ? 'bg-gold' : 'bg-coral'"
            :style="`width: ${application.score}%`"
          />
        </div>
      </div>
    </section>

    <!-- Pipeline stages -->
    <div class="admin-card p-5">
      <h2 class="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-muted">
        Pipeline Stage
      </h2>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="stage in stages"
          :key="stage"
          :class="[
            'inline-flex items-center rounded-full px-3 py-1.5 text-xs font-bold transition',
            application.stage === stage
              ? stageColor[stage] + ' ring-2 ring-offset-1 ring-current'
              : 'bg-panel-soft text-muted',
          ]"
        >
          {{ stage }}
        </span>
      </div>
    </div>

    <!-- Details grid -->
    <div class="grid gap-6 lg:grid-cols-3">
      <!-- Notes -->
      <div class="admin-card p-6 lg:col-span-2">
        <h2 class="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-muted">
          Reviewer Notes
        </h2>
        <p class="text-sm leading-relaxed text-ink">
          {{ application.notes || 'No notes added yet.' }}
        </p>
      </div>

      <!-- Details sidebar -->
      <div class="admin-card p-5">
        <h2 class="mb-4 text-xs font-bold uppercase tracking-[0.12em] text-muted">
          Details
        </h2>
        <dl class="flex flex-col gap-3">
          <div>
            <dt class="text-xs text-muted">Candidate</dt>
            <dd class="mt-0.5 text-sm font-semibold text-ink">
              {{ application.candidate }}
            </dd>
          </div>
          <div>
            <dt class="text-xs text-muted">Job</dt>
            <dd class="mt-0.5 text-sm font-semibold text-ink">
              {{ application.job }}
            </dd>
          </div>
          <div>
            <dt class="text-xs text-muted">Department</dt>
            <dd class="mt-0.5 text-sm font-semibold text-ink">
              {{ application.department || '—' }}
            </dd>
          </div>
          <div>
            <dt class="text-xs text-muted">Date Applied</dt>
            <dd class="mt-0.5 text-sm font-semibold text-ink">
              {{ application.date }}
            </dd>
          </div>
        </dl>
      </div>
    </div>

    <!-- Edit slide-over -->
    <AdminSlideOver
      :open="panelOpen"
      title="Edit Application"
      subtitle="Update application details."
      @close="panelOpen = false"
    >
      <form class="flex flex-col gap-5" @submit.prevent="saveApplication">
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold text-ink">Candidate *</label>
            <input
              v-model="form.candidate"
              class="admin-input w-full"
              type="text"
            />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold text-ink">Job *</label>
            <input
              v-model="form.job"
              class="admin-input w-full"
              type="text"
            />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold text-ink">Department</label>
            <input
              v-model="form.department"
              class="admin-input w-full"
              type="text"
            />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-semibold text-ink">Stage</label>
            <select v-model="form.stage" class="admin-input w-full">
              <option v-for="s in stages" :key="s" :value="s">{{ s }}</option>
            </select>
          </div>
          <div class="flex flex-col gap-1.5 sm:col-span-2">
            <label class="text-xs font-semibold text-ink">Score (0–100)</label>
            <input
              v-model.number="form.score"
              class="admin-input w-full"
              type="number"
              min="0"
              max="100"
            />
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
          :disabled="!form.candidate.trim()"
          @click="saveApplication"
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
              Remove this application?
            </h3>
            <p class="mt-2 text-sm text-muted">
              The application for
              <strong class="text-ink">{{ application.candidate }}</strong> will
              be permanently removed.
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
