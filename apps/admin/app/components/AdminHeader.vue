<script setup lang="ts">
import { Bell, Search } from "@lucide/vue"

const route = useRoute()

const pageTitle = computed(() => {
  const segment = route.path.split("/").filter(Boolean)[0] ?? "dashboard"
  return segment.charAt(0).toUpperCase() + segment.slice(1)
})
</script>

<template>
  <header class="flex h-16 shrink-0 items-center justify-between border-b border-line bg-panel px-6">
    <h1 class="font-display text-lg font-semibold text-ink">{{ pageTitle }}</h1>

    <div class="flex items-center gap-3">
      <!-- Search -->
      <div class="flex items-center gap-2 rounded-xl border border-line bg-paper px-3 py-2 text-sm text-muted">
        <Search class="size-4 shrink-0" />
        <input
          class="w-44 bg-transparent outline-none placeholder:text-muted"
          placeholder="Search…"
          type="search"
        >
      </div>

      <!-- Notifications -->
      <button
        class="relative grid size-9 place-items-center rounded-xl border border-line bg-paper text-muted transition hover:text-ink"
        type="button"
        aria-label="Notifications"
      >
        <Bell class="size-4" />
        <span class="absolute right-2 top-2 size-1.5 rounded-full bg-coral" />
      </button>

      <!-- Avatar -->
      <button
        class="grid size-9 place-items-center rounded-xl bg-ink text-xs font-semibold text-white"
        type="button"
        aria-label="Account"
      >
        AD
      </button>
    </div>
  </header>
</template>
