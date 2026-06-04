<script setup lang="ts">
const props = defineProps<{
  name: string;
  class?: string;
}>();

const initials = computed(() =>
  props.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase(),
);
</script>

<template>
  <span
    :class="[
      'grid shrink-0 place-items-center rounded-2xl bg-ink text-xs font-bold text-white',
      props.class ?? 'size-10',
    ]"
  >
    {{ initials }}
  </span>
</template>
