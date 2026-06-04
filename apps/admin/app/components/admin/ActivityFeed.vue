<script setup lang="ts">
import { Clock } from '@lucide/vue';

defineProps<{
  items: { action: string; detail: string; time: string }[];
}>();
</script>

<template>
  <ul class="flex flex-col divide-y divide-line">
    <li
      v-for="(item, i) in items"
      :key="i"
      class="flex items-start justify-between gap-4 py-3"
    >
      <div class="flex items-start gap-3">
        <span class="mt-0.5 grid size-8 shrink-0 place-items-center rounded-xl bg-paper">
          <Clock class="size-3.5 text-muted" />
        </span>
        <div>
          <p class="text-sm font-semibold text-ink">{{ item.action }}</p>
          <p class="text-xs text-muted">{{ item.detail }}</p>
        </div>
      </div>
      <span class="shrink-0 text-xs font-medium text-muted">{{ item.time }}</span>
    </li>
  </ul>
</template>
