<script setup lang="ts">
import { ArrowUpRight, BriefcaseBusiness, Menu, X } from "@lucide/vue"
import { routes } from "~/utils/routes"

defineOptions({
  name: "SiteNavbar",
})

const menuToggled = ref(false)
const { careersUrl, routePath } = useAppLinks()
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 px-3 py-3 md:px-5">
    <div class="relative mx-auto flex w-full max-w-7xl items-center justify-between rounded-full border border-white/70 bg-white/85 px-3 py-2 shadow-[0_20px_70px_rgba(16,30,68,0.12)] backdrop-blur-xl md:px-4">
      <NuxtLink to="/" class="flex items-center gap-2 text-primary">
        <span class="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground">
          <BriefcaseBusiness class="size-4" />
        </span>
        <span class="font-display text-2xl font-semibold">SaintHR</span>
      </NuxtLink>

      <nav class="hidden items-center gap-1 md:flex">
        <NuxtLink
          v-for="route in routes"
          :key="route.title"
          :to="routePath(route.path)"
          class="inline-flex h-10 items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold text-primary/75 transition-all duration-200 hover:bg-primary/10 hover:text-primary"
        >
          {{ route.title }}
          <ArrowUpRight v-if="route.title === 'Careers'" class="size-3.5 opacity-50" />
        </NuxtLink>
      </nav>

      <div class="hidden items-center justify-center gap-x-2 md:flex">
        <BaseButton :to="careersUrl" variant="outline" class="px-5! py-2.5!">
          Get Hired
        </BaseButton>
        <BaseButton :to="careersUrl" class="px-5! py-2.5!">
          Hire Talent
          <ArrowUpRight class="size-4" />
        </BaseButton>
      </div>

      <button
        class="z-10 flex size-fit cursor-pointer items-center justify-center p-2.5 md:hidden"
        type="button"
        :aria-label="menuToggled ? 'Close menu' : 'Open menu'"
        @click="menuToggled = !menuToggled"
      >
        <X v-if="menuToggled" class="m-auto size-6 text-primary" />
        <Menu v-else class="m-auto size-6 text-primary" />
      </button>

      <MobileNav :open="menuToggled" @close="menuToggled = false" />
    </div>
  </header>
</template>
