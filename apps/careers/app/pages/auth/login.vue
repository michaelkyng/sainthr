<script setup lang="ts">
import { ArrowLeft } from "@lucide/vue"

defineOptions({ name: "CareersLoginPage" })
definePageMeta({ layout: "auth" })

useHead({ title: "Sign in – SaintHR Careers" })

const router = useRouter()
</script>

<template>
  <div class="w-full max-w-md">
    <AuthLoginForm @submit="router.push('/jobs')">
      <p class="mt-6 text-center text-sm text-muted">
        New to SaintHR?
        <NuxtLink to="/auth/signup" class="font-semibold text-ink transition hover:text-green">
          Create a profile
        </NuxtLink>
      </p>
    </AuthLoginForm>

    <NuxtLink
      to="/jobs"
      class="mt-4 flex items-center justify-center gap-1.5 text-sm font-semibold text-muted transition hover:text-ink"
    >
      <ArrowLeft class="size-4" /> Back to jobs
    </NuxtLink>
  </div>
</template>
