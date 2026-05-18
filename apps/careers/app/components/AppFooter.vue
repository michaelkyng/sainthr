<script setup lang="ts">
import { ArrowUpRight, BriefcaseBusiness, Mail, MapPin } from "@lucide/vue"

defineOptions({ name: "CareersAppFooter" })

const config = useRuntimeConfig()
const mainSiteUrl = computed(() => config.public.mainSiteUrl || "http://localhost:3000")
</script>

<template>
  <footer class="w-full bg-ink text-white">
    <div class="mx-auto w-full max-w-6xl px-5 md:px-8 lg:px-10">
      <div class="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div class="flex flex-col gap-5">
          <NuxtLink to="/" class="flex items-center gap-2">
            <span class="grid size-9 place-items-center rounded-full bg-white/10 text-white">
              <BriefcaseBusiness class="size-4" />
            </span>
            <span class="font-display text-xl font-semibold">SaintHR</span>
          </NuxtLink>
          <p class="max-w-xs text-sm leading-7 text-white/60">
            Smarter HR, real job access, and a hiring experience that still feels human.
          </p>
          <a
            :href="mainSiteUrl"
            class="inline-flex items-center gap-1.5 text-sm font-semibold text-white/70 transition-colors hover:text-white"
          >
            Back to SaintHR.com <ArrowUpRight class="size-3.5" />
          </a>
        </div>

        <div class="flex flex-col gap-4">
          <h3 class="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">For Candidates</h3>
          <ul class="flex flex-col gap-3">
            <li>
              <NuxtLink to="/jobs" class="text-sm font-medium text-white/70 transition-colors hover:text-white">
                Find Work
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/auth/signup" class="text-sm font-medium text-white/70 transition-colors hover:text-white">
                Create Profile
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/auth/login" class="text-sm font-medium text-white/70 transition-colors hover:text-white">
                Sign In
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="flex flex-col gap-4">
          <h3 class="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">For Companies</h3>
          <ul class="flex flex-col gap-3">
            <li>
              <NuxtLink to="/auth/signup" class="text-sm font-medium text-white/70 transition-colors hover:text-white">
                Post a Job
              </NuxtLink>
            </li>
            <li>
              <a :href="mainSiteUrl + '/#services'" class="text-sm font-medium text-white/70 transition-colors hover:text-white">
                Our Services
              </a>
            </li>
            <li>
              <a :href="mainSiteUrl + '/#about'" class="text-sm font-medium text-white/70 transition-colors hover:text-white">
                About SaintHR
              </a>
            </li>
          </ul>
        </div>

        <div class="flex flex-col gap-4">
          <h3 class="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Contact</h3>
          <ul class="flex flex-col gap-4">
            <li>
              <a href="mailto:hello@sainthr.com" class="flex items-start gap-2.5 text-sm text-white/70 transition-colors hover:text-white">
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
          <span class="text-xs text-white/40">Privacy Policy</span>
          <span class="text-xs text-white/40">Terms of Service</span>
        </div>
      </div>
    </div>
  </footer>
</template>
