<script setup lang="ts">
import { ArrowUpRight, BriefcaseBusiness, Mail, MapPin } from "@lucide/vue"

defineOptions({
  name: "SiteFooter",
})

const { careersUrl } = useAppLinks()

const services = [
  "Recruitment & Talent Acquisition",
  "Payroll & Benefits",
  "HR Compliance",
  "Training & Development",
  "Performance Management",
  "HR Technology",
]

const navigate = [
  { title: "Services", path: "/#services" },
  { title: "About", path: "/#about" },
  { title: "Careers", path: careersUrl },
]
</script>

<template>
  <footer class="w-full bg-primary text-primary-foreground">
    <div class="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-10">
      <div class="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1fr]">
        <div class="flex flex-col gap-5">
          <NuxtLink to="/" class="flex items-center gap-2">
            <span class="grid size-9 place-items-center rounded-full bg-white/10 text-white">
              <BriefcaseBusiness class="size-4" />
            </span>
            <span class="font-display text-2xl font-semibold text-white">SaintHR</span>
          </NuxtLink>
          <p class="max-w-xs text-sm leading-7 text-white/60">
            Smarter HR, real job access, and a hiring experience that still feels human.
          </p>
          <BaseButton
            :to="careersUrl"
            variant="outline"
            class="w-fit border-white/20! bg-white/10! px-5! py-2.5! text-white! text-sm! hover:bg-white! hover:text-primary!"
          >
            Get started
            <ArrowUpRight class="size-4" />
          </BaseButton>
        </div>

        <div class="flex flex-col gap-4">
          <h3 class="font-display text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Navigate</h3>
          <ul class="flex flex-col gap-3">
            <li v-for="link in navigate" :key="link.title">
              <NuxtLink
                :to="link.path"
                class="group flex items-center gap-1.5 text-sm font-medium text-white/70 transition-colors duration-200 hover:text-white"
              >
                {{ link.title }}
                <ArrowUpRight v-if="link.title === 'Careers'" class="size-3.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="flex flex-col gap-4">
          <h3 class="font-display text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Services</h3>
          <ul class="flex flex-col gap-3">
            <li v-for="service in services" :key="service">
              <span class="text-sm text-white/70">{{ service }}</span>
            </li>
          </ul>
        </div>

        <div class="flex flex-col gap-4">
          <h3 class="font-display text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Contact</h3>
          <ul class="flex flex-col gap-4">
            <li>
              <a
                href="mailto:hello@sainthr.com"
                class="flex items-start gap-2.5 text-sm text-white/70 transition-colors duration-200 hover:text-white"
              >
                <Mail class="mt-0.5 size-4 shrink-0" />
                hello@sainthr.com
              </a>
            </li>
            <li>
              <span class="flex items-start gap-2.5 text-sm text-white/70">
                <MapPin class="mt-0.5 size-4 shrink-0" />
                Lagos, Nigeria
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div class="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 sm:flex-row">
        <p class="text-xs text-white/40">
          &copy; {{ new Date().getFullYear() }} SaintHR. All rights reserved.
        </p>
        <div class="flex items-center gap-5">
          <NuxtLink to="/privacy" class="text-xs text-white/40 transition-colors hover:text-white/70">
            Privacy Policy
          </NuxtLink>
          <NuxtLink to="/terms" class="text-xs text-white/40 transition-colors hover:text-white/70">
            Terms of Service
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
