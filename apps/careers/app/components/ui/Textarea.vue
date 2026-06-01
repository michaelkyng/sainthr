<script setup lang="ts">
import { cn } from "~/lib/utils"

const props = defineProps<{
  class?: string
  placeholder?: string
  disabled?: boolean
  rows?: number | string
  maxlength?: number | string
  resize?: boolean
}>()

const model = defineModel<string>()
</script>

<template>
  <textarea
    v-model="model"
    :placeholder="placeholder"
    :disabled="disabled"
    :rows="rows ?? 4"
    :maxlength="maxlength"
    :class="
      cn(
        'w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink outline-none placeholder:text-muted transition-colors focus:border-ink/40 disabled:cursor-not-allowed disabled:opacity-50',
        resize ? 'resize-y' : 'resize-none',
        props.class,
      )
    "
  />
</template>
