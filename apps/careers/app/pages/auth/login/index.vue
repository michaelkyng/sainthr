<script setup lang="ts">
import { ArrowLeft } from "@lucide/vue"

defineOptions({ name: "CareersLoginPage" })
definePageMeta({ layout: "auth", middleware: "guest" })

useHead({ title: "Sign in – SaintHR Careers" })

const route = useRoute()
// Always land on /auth/continue so the role context resolves (and the backend
// bootstrap runs) before routing. Carry the original deep link along.
const redirectUrl = computed(() => {
  const target = route.query.redirect_url
  const safe = typeof target === "string" && target.startsWith("/") ? target : null
  return safe
    ? `/auth/continue?redirect_url=${encodeURIComponent(safe)}`
    : "/auth/continue"
})
</script>

<template>
  <div class="w-full max-w-md">
    <AuthLoginForm :redirect-url="redirectUrl">
      <p class="mt-6 text-center text-sm text-muted">
        New to SaintHR?
        <NuxtLink to="/auth/signup" class="font-semibold text-ink transition hover:text-green">
          Create a profile
        </NuxtLink>
      </p>
    </AuthLoginForm>

    <UiButton as-child variant="ghost" size="sm" class="mt-4 w-full">
      <NuxtLink to="/jobs">
        <ArrowLeft class="size-4" /> Back to jobs
      </NuxtLink>
    </UiButton>
  </div>
</template>
