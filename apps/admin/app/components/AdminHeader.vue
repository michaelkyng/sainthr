<script setup lang="ts">
import { Bell, Plus, Search, SlidersHorizontal } from '@lucide/vue';
import Button from '~/components/ui/Button.vue';
import DropdownMenu from '~/components/ui/DropdownMenu.vue';
import DropdownMenuContent from '~/components/ui/DropdownMenuContent.vue';
import DropdownMenuItem from '~/components/ui/DropdownMenuItem.vue';
import DropdownMenuSeparator from '~/components/ui/DropdownMenuSeparator.vue';

const route = useRoute();

const pageCopy: Record<string, { title: string; eyebrow: string }> = {
  dashboard: { title: 'Command Center', eyebrow: 'Live hiring overview' },
  jobs: { title: 'Jobs', eyebrow: 'Open roles and requisitions' },
  candidates: { title: 'Candidates', eyebrow: 'Talent pool and profiles' },
  applications: { title: 'Applications', eyebrow: 'Pipeline review' },
  employers: { title: 'Employers', eyebrow: 'Client company directory' },
  settings: { title: 'Settings', eyebrow: 'Workspace configuration' },
};

const segment = computed(() => route.path.split('/').filter(Boolean)[0] ?? 'dashboard');
const pageTitle = computed(() => pageCopy[segment.value]?.title ?? segment.value.charAt(0).toUpperCase() + segment.value.slice(1));
const pageEyebrow = computed(() => pageCopy[segment.value]?.eyebrow ?? 'SaintHR admin');
</script>

<template>
  <header
    class="sticky top-0 z-20 flex min-h-20 shrink-0 items-center justify-between border-b border-line/70 bg-paper/85 px-4 backdrop-blur-xl sm:px-6 lg:px-8"
  >
    <!-- Page identity -->
    <div class="flex min-w-0 items-center gap-3">
      <div class="min-w-0">
        <p class="text-xs font-bold uppercase tracking-[0.18em] text-green">{{ pageEyebrow }}</p>
        <h1 class="truncate font-display text-2xl font-semibold text-ink">{{ pageTitle }}</h1>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-2">
      <!-- Search -->
      <div
        class="hidden items-center gap-2 rounded-2xl border border-line bg-white px-3.5 py-2.5 text-sm text-muted shadow-sm transition focus-within:border-green/40 focus-within:ring-2 focus-within:ring-green/10 md:flex"
      >
        <Search class="size-4 shrink-0" />
        <input
          class="w-48 bg-transparent outline-none placeholder:text-muted"
          placeholder="Search workspace"
          type="search"
        />
        <kbd class="rounded-md border border-line bg-paper px-1.5 py-0.5 text-[10px] font-semibold text-muted">/</kbd>
      </div>

      <Button variant="secondary" size="sm" class="hidden xl:inline-flex">
        <SlidersHorizontal class="size-4" />
        Filters
      </Button>

      <Button size="sm" class="hidden sm:inline-flex">
        <Plus class="size-4" />
        Create
      </Button>

      <!-- Notifications -->
      <DropdownMenu>
        <template #default="{ open, toggle }">
          <Button variant="outline" size="icon" class="relative" aria-label="Notifications" @click="toggle">
            <Bell class="size-4" />
            <span class="absolute right-2 top-2 size-2 rounded-full border-2 border-white bg-coral" />
          </Button>
          <DropdownMenuContent v-if="open" align="end">
            <div class="px-3 py-2 text-sm font-semibold text-ink">Notifications</div>
            <DropdownMenuSeparator />
            <div class="px-3 py-4 text-center text-xs text-muted">No new notifications</div>
          </DropdownMenuContent>
        </template>
      </DropdownMenu>

      <!-- Avatar -->
      <DropdownMenu>
        <template #default="{ open, toggle }">
          <button
            class="grid size-10 place-items-center rounded-2xl bg-ink text-xs font-bold text-white shadow-lg shadow-ink/10 transition hover:bg-ink-2"
            type="button"
            aria-label="Account"
            @click="toggle"
          >
            AD
          </button>
          <DropdownMenuContent v-if="open" align="end">
            <div class="px-3 py-2">
              <p class="text-sm font-semibold text-ink">Admin user</p>
              <p class="text-xs text-muted">admin@sainthr.com</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem :destructive="true">Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </template>
      </DropdownMenu>
    </div>
  </header>
</template>
