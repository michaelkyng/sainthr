<script setup lang="ts">
import { X } from '@lucide/vue';

export interface FilterGroup {
  label: string;
  key: string;
  options: string[];
}

const props = defineProps<{
  open: boolean;
  groups: FilterGroup[];
}>();

const model = defineModel<Record<string, string[]>>({ required: true });

const activeCount = computed(() =>
  Object.values(model.value).reduce((n, arr) => n + arr.length, 0),
);

function toggle(key: string, option: string) {
  const current = model.value[key] ?? [];
  model.value = {
    ...model.value,
    [key]: current.includes(option)
      ? current.filter((v) => v !== option)
      : [...current, option],
  };
}

function clear() {
  model.value = Object.fromEntries(props.groups.map((g) => [g.key, []]));
}

function isSelected(key: string, option: string) {
  return (model.value[key] ?? []).includes(option);
}
</script>

<template>
  <Transition
    enter-active-class="transition-all duration-200 ease-out"
    enter-from-class="opacity-0 -translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-150 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-2"
  >
    <div
      v-if="open"
      class="mt-3 overflow-hidden rounded-2xl border border-line bg-white shadow-[0_16px_50px_rgba(16,30,68,0.08)]"
    >
      <div class="flex items-center justify-between border-b border-line px-4 py-3">
        <span class="text-xs font-semibold uppercase tracking-wider text-muted">Filters</span>
        <button
          v-if="activeCount > 0"
          type="button"
          class="flex items-center gap-1 text-xs font-semibold text-coral hover:text-coral/80 transition"
          @click="clear"
        >
          <X class="size-3" />
          Clear {{ activeCount }} filter{{ activeCount !== 1 ? 's' : '' }}
        </button>
      </div>

      <div class="flex flex-wrap gap-6 p-4">
        <div v-for="group in groups" :key="group.key" class="flex flex-col gap-2">
          <p class="text-xs font-semibold text-muted">{{ group.label }}</p>
          <div class="flex flex-wrap gap-1.5">
            <button
              v-for="option in group.options"
              :key="option"
              type="button"
              :class="[
                'rounded-lg border px-2.5 py-1 text-xs font-semibold transition',
                isSelected(group.key, option)
                  ? 'border-green bg-green/10 text-green'
                  : 'border-line bg-panel-soft text-muted hover:border-green/30 hover:text-ink',
              ]"
              @click="toggle(group.key, option)"
            >
              {{ option }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
