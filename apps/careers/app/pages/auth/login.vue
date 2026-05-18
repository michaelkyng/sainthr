<script setup lang="ts">
import { ArrowLeft, ArrowUpRight, BriefcaseBusiness, Eye, EyeOff } from "@lucide/vue"

defineOptions({ name: "CareersLoginPage" })
definePageMeta({ layout: "auth" })

useHead({ title: "Sign in – SaintHR Careers" })

const router = useRouter()

const form = reactive({
  email: "",
  password: "",
})

const showPassword = ref(false)
const loading = ref(false)

const handleSubmit = async () => {
  loading.value = true
  await new Promise((r) => setTimeout(r, 800))
  loading.value = false
  router.push("/jobs")
}
</script>

<template>
  <div class="w-full max-w-md">
    <div class="rounded-3xl border border-line bg-panel p-8 shadow-[0_24px_80px_rgba(16,30,68,0.14)]">
      <!-- Header -->
      <div class="mb-8 flex flex-col items-center gap-3 text-center">
        <NuxtLink to="/" class="flex items-center gap-2.5 text-ink">
          <span class="grid size-10 place-items-center rounded-xl bg-ink text-white">
            <BriefcaseBusiness class="size-5" />
          </span>
          <span class="font-display text-xl font-semibold">SaintHR</span>
        </NuxtLink>
        <div>
          <h1 class="font-display text-2xl font-semibold text-ink">Welcome back</h1>
          <p class="mt-1.5 text-sm text-muted">Sign in to your SaintHR account.</p>
        </div>
      </div>

      <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
        <label class="flex flex-col gap-1.5">
          <span class="text-xs font-semibold text-ink">Email address</span>
          <input
            v-model="form.email"
            class="rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink outline-none placeholder:text-muted transition-colors focus:border-ink/40"
            placeholder="you@example.com"
            type="email"
            required
          >
        </label>

        <label class="flex flex-col gap-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-ink">Password</span>
            <button class="text-xs font-semibold text-muted transition hover:text-green" type="button">
              Forgot password?
            </button>
          </div>
          <div class="flex items-center gap-3 rounded-xl border border-line bg-paper px-4 py-3 transition-colors focus-within:border-ink/40">
            <input
              v-model="form.password"
              class="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted"
              placeholder="Your password"
              :type="showPassword ? 'text' : 'password'"
              required
            >
            <button
              class="text-muted transition hover:text-ink"
              type="button"
              :aria-label="showPassword ? 'Hide password' : 'Show password'"
              @click="showPassword = !showPassword"
            >
              <EyeOff v-if="showPassword" class="size-4" />
              <Eye v-else class="size-4" />
            </button>
          </div>
        </label>

        <button
          :class="[
            'flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-200',
            !loading ? 'bg-ink text-white hover:bg-ink-2' : 'cursor-not-allowed bg-line text-muted',
          ]"
          type="submit"
          :disabled="loading"
        >
          <span v-if="loading" class="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          <ArrowUpRight v-else class="size-4" />
          {{ loading ? "Signing in..." : "Sign in" }}
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-muted">
        New to SaintHR?
        <NuxtLink to="/auth/signup" class="font-semibold text-ink transition hover:text-green">
          Create a profile
        </NuxtLink>
      </p>
    </div>

    <NuxtLink
      to="/jobs"
      class="mt-4 flex items-center justify-center gap-1.5 text-sm font-semibold text-muted transition hover:text-ink"
    >
      <ArrowLeft class="size-4" /> Back to jobs
    </NuxtLink>
  </div>
</template>
