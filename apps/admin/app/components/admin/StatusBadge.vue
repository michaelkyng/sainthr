<script setup lang="ts">
defineProps<{
  status: string;
  colorMap: Record<string, string>;
}>();
</script>

<template>
  <span
    :class="[
      'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold',
      colorMap[status] ?? 'bg-line text-muted',
    ]"
  >
    {{ status }}
  </span>
</template>
