<script setup lang="ts">
import { Search } from '@lucide/vue';

defineProps<{
  placeholder?: string;
}>();

const model = defineModel<string>({ default: '' });
</script>

<template>
  <label
    class="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-line bg-panel-soft px-3.5 py-2.5 text-sm text-muted focus-within:border-green/40 focus-within:ring-2 focus-within:ring-green/10 transition"
  >
    <Search class="size-4 shrink-0" />
    <input
      v-model="model"
      class="w-full bg-transparent outline-none placeholder:text-muted"
      :placeholder="placeholder ?? 'Search…'"
      type="search"
    />
  </label>
</template>
