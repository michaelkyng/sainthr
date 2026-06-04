<script setup lang="ts">
import { X } from '@lucide/vue';
import Button from '~/components/ui/Button.vue';

defineProps<{ open: boolean; title: string; subtitle?: string }>();
const emit = defineEmits<{ close: [] }>();
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 z-40 bg-ink/30 backdrop-blur-sm"
        @click="emit('close')"
      />
    </Transition>

    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-250 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <aside
        v-if="open"
        class="fixed inset-y-0 right-0 z-50 flex w-full max-w-xl flex-col bg-panel shadow-2xl"
      >
        <header class="flex items-start justify-between border-b border-line px-6 py-5">
          <div>
            <h2 class="font-display text-lg font-semibold text-ink">{{ title }}</h2>
            <p v-if="subtitle" class="mt-0.5 text-sm text-muted">{{ subtitle }}</p>
          </div>
          <Button variant="ghost" size="icon" aria-label="Close panel" @click="emit('close')">
            <X class="size-4" />
          </Button>
        </header>

        <div class="flex-1 overflow-y-auto px-6 py-5">
          <slot />
        </div>

        <footer
          v-if="$slots.footer"
          class="flex items-center justify-end gap-3 border-t border-line px-6 py-4"
        >
          <slot name="footer" />
        </footer>
      </aside>
    </Transition>
  </Teleport>
</template>
