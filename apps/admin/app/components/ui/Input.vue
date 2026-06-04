<script setup lang="ts">
import { cn } from '~/lib/utils';

const props = defineProps<{
  class?: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
}>();

const model = defineModel<string | number>();
</script>

<template>
  <input
    v-model="model"
    :type="type ?? 'text'"
    :placeholder="placeholder"
    :disabled="disabled"
    :class="
      cn(
        'flex h-10 w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none placeholder:text-muted transition focus:border-green focus:ring-2 focus:ring-green/10 disabled:cursor-not-allowed disabled:opacity-50',
        props.class,
      )
    "
  />
</template>
