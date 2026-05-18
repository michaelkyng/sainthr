<script setup lang="ts">
import { ArrowUpRight, BriefcaseBusiness, Eye, EyeOff, ShieldCheck } from "@lucide/vue"

defineOptions({ name: "AdminLoginPage" })
definePageMeta({ layout: "auth" })

useHead({ title: "Sign in – SaintHR Admin" })

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
  router.push("/dashboard")
}
</script>

<template>
  <div class="w-full max-w-md">
    <div class="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.4)] backdrop-blur-sm">
      <!-- Header -->
      <div class="mb-8 flex flex-col items-center gap-3 text-center">
        <div class="flex items-center gap-2.5">
          <span class="grid size-10 place-items-center rounded-xl bg-white/10 text-white">
            <BriefcaseBusiness class="size-5" />
          </span>
          <span class="font-display text-xl font-semibold text-white">SaintHR Admin</span>
        </div>
        <div>
          <h1 class="font-display text-2xl font-semibold text-white">Admin sign in</h1>
          <p class="mt-1.5 flex items-center justify-center gap-1.5 text-sm text-white/50">
            <ShieldCheck class="size-3.5" />
            Restricted access
          </p>
        </div>
      </div>

      <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
        <label class="flex flex-col gap-1.5">
          <span class="text-xs font-semibold text-white/70">Email address</span>
          <input
            v-model="form.email"
            class="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 transition-colors focus:border-white/30"
            placeholder="admin@sainthr.com"
            type="email"
            required
          >
        </label>

        <label class="flex flex-col gap-1.5">
          <span class="text-xs font-semibold text-white/70">Password</span>
          <div class="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition-colors focus-within:border-white/30">
            <input
              v-model="form.password"
              class="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
              placeholder="Your password"
              :type="showPassword ? 'text' : 'password'"
              required
            >
            <button
              class="text-white/40 transition hover:text-white"
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
            !loading
              ? 'bg-white text-sidebar hover:bg-white/90'
              : 'cursor-not-allowed bg-white/10 text-white/40',
          ]"
          type="submit"
          :disabled="loading"
        >
          <span v-if="loading" class="size-4 animate-spin rounded-full border-2 border-sidebar border-t-transparent" />
          <ArrowUpRight v-else class="size-4" />
          {{ loading ? "Signing in…" : "Sign in" }}
        </button>
      </form>
    </div>
  </div>
</template>
