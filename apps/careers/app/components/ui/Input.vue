<script setup lang="ts">
import { cn } from "~/lib/utils"

const props = defineProps<{
  class?: string
  type?: string
  placeholder?: string
  disabled?: boolean
  maxlength?: number | string
  autocomplete?: string
}>()

const model = defineModel<string | number>()
</script>

<template>
  <input
    v-model="model"
    :type="type ?? 'text'"
    :placeholder="placeholder"
    :disabled="disabled"
    :maxlength="maxlength"
    :autocomplete="autocomplete"
    :class="
      cn(
        'w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink outline-none placeholder:text-muted transition-colors focus:border-ink/40 disabled:cursor-not-allowed disabled:opacity-50',
        props.class,
      )
    "
  >
</template>
