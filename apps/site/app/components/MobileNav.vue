<script setup lang="ts">
import { ArrowUpRight } from "@lucide/vue"
import { routes } from "~/utils/routes"

defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const { careersUrl, routePath } = useAppLinks()
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <button
      v-if="open"
      class="fixed inset-0 bg-primary/30 backdrop-blur-sm md:hidden"
      type="button"
      aria-label="Close menu"
      @click="emit('close')"
    />
  </Transition>

  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="translate-x-full opacity-0"
    enter-to-class="translate-x-0 opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="translate-x-0 opacity-100"
    leave-to-class="translate-x-full opacity-0"
  >
    <aside
      v-if="open"
      class="fixed right-3 top-3 h-[calc(100vh-1.5rem)] w-[82vw] rounded-2xl border border-white/70 bg-white/95 px-5 py-24 shadow-[0_28px_80px_rgba(16,30,68,0.22)] backdrop-blur-xl sm:w-1/2 md:hidden"
    >
      <nav class="flex flex-col gap-1">
        <NuxtLink
          v-for="route in routes"
          :key="route.title"
          :to="routePath(route.path)"
          class="flex items-center justify-between rounded-xl px-4 py-3.5 font-display text-lg font-semibold text-primary transition-all duration-200 hover:bg-primary/10"
          @click="emit('close')"
        >
          {{ route.title }}
          <ArrowUpRight v-if="route.title === 'Careers'" class="size-4 opacity-50" />
        </NuxtLink>
      </nav>

      <div class="mt-8 grid gap-3">
        <BaseButton :to="careersUrl" class="py-3.5!" @click="emit('close')">
          Get Hired
        </BaseButton>
        <BaseButton :to="careersUrl" variant="outline" class="py-3.5!" @click="emit('close')">
          Hire Talent
          <ArrowUpRight class="size-4" />
        </BaseButton>
      </div>
    </aside>
  </Transition>
</template>
