<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
}>();

defineSlots<{
  actions(): unknown;
  filters?(): unknown;
}>();
</script>

<template>
  <div class="admin-card p-5">
    <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p class="text-sm font-semibold text-ink">{{ title }}</p>
        <p class="mt-1 text-sm text-muted">{{ description }}</p>
      </div>
      <div class="flex shrink-0 items-center gap-2">
        <slot name="actions" />
      </div>
    </div>
    <div v-if="$slots.filters" class="mt-5">
      <slot name="filters" />
    </div>
  </div>
</template>
