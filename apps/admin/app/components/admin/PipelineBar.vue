<script setup lang="ts">
defineProps<{
  items: { label: string; value: number; color: string }[];
}>();
</script>

<template>
  <div class="flex flex-col gap-4">
    <div
      v-for="item in items"
      :key="item.label"
      class="grid grid-cols-[96px_1fr_42px] items-center gap-3"
    >
      <span class="text-sm font-medium text-muted">{{ item.label }}</span>
      <div class="h-2 overflow-hidden rounded-full bg-paper">
        <div
          :class="['h-full rounded-full', item.color]"
          :style="`width: ${item.value}%`"
        />
      </div>
      <span class="text-right text-sm font-semibold text-ink">{{ item.value }}</span>
    </div>
  </div>
</template>
