<script setup lang="ts">
import { cn } from '~/lib/utils';

const props = defineProps<{
  value: string;
  active: string;
  class?: string;
}>();

const emit = defineEmits<{ select: [value: string] }>();
</script>

<template>
  <button
    type="button"
    :class="
      cn(
        'shrink-0 rounded-xl px-4 py-2.5 text-sm font-bold transition-colors',
        active === props.value ? 'bg-ink text-white shadow-sm' : 'text-muted hover:bg-paper hover:text-ink',
        props.class,
      )
    "
    @click="emit('select', props.value)"
  >
    <slot />
  </button>
</template>
