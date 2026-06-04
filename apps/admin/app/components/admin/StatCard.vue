<script setup lang="ts">
import { TrendingUp } from '@lucide/vue';
import type { Component } from 'vue';

const props = defineProps<{
  label: string;
  value: string;
  delta: string;
  icon: Component;
  iconColor: string;
  iconFill: string;
}>();
</script>

<template>
  <div class="admin-card flex flex-col gap-4 p-5">
    <div class="flex items-center justify-between">
      <span class="text-sm font-medium text-muted">{{ label }}</span>
      <span :class="['grid size-10 place-items-center rounded-2xl', iconFill, iconColor]">
        <component :is="icon" class="size-4" />
      </span>
    </div>
    <div>
      <p class="font-display text-3xl font-semibold text-ink">{{ value }}</p>
      <p class="mt-0.5 flex items-center gap-1 text-xs text-green">
        <TrendingUp class="size-3" />
        {{ delta }}
      </p>
    </div>
  </div>
</template>
