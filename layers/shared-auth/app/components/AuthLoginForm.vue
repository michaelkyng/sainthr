<script setup lang="ts">
import { ArrowUpRight, BriefcaseBusiness, Eye, EyeOff } from '@lucide/vue';
import { reactive, ref } from 'vue';

const emit = defineEmits<{
  submit: [credentials: { email: string; password: string }];
}>();

const form = reactive({
  email: '',
  password: '',
});

const showPassword = ref(false);
const loading = ref(false);

const handleSubmit = async () => {
  loading.value = true;
  await new Promise((r) => setTimeout(r, 800));
  loading.value = false;
  emit('submit', { ...form });
};
</script>

<template>
  <div class="relative w-full max-w-md">
    <div
      class="rounded-[1.75rem] border border-white/20 bg-panel/95 p-7 shadow-[0_28px_90px_rgba(0,0,0,0.28)] backdrop-blur sm:p-8"
    >
      <div class="mb-8 flex flex-col items-center gap-3 text-center">
        <NuxtLink to="/" class="flex items-center gap-2.5 text-ink">
          <span
            class="grid size-11 place-items-center rounded-2xl bg-ink text-white shadow-lg shadow-ink/15"
          >
            <BriefcaseBusiness class="size-5" />
          </span>
          <span class="font-display text-xl font-semibold">SaintHR</span>
        </NuxtLink>
        <div>
          <h1 class="font-display text-2xl font-semibold text-ink">
            Welcome back
          </h1>
          <p class="mt-1.5 text-sm text-muted">
            Sign in to your SaintHR account.
          </p>
        </div>
      </div>

      <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
        <label class="flex flex-col gap-1.5">
          <span class="text-xs font-semibold text-ink">Email address</span>
          <input
            v-model="form.email"
            class="rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink outline-none placeholder:text-muted transition focus:border-green focus:ring-4 focus:ring-green/10"
            placeholder="you@example.com"
            type="email"
            required
          />
        </label>

        <label class="flex flex-col gap-1.5">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-ink">Password</span>
            <button
              class="text-xs font-semibold text-muted transition hover:text-green"
              type="button"
            >
              Forgot password?
            </button>
          </div>
          <div
            class="flex items-center gap-3 rounded-xl border border-line bg-paper px-4 py-3 transition focus-within:border-green focus-within:ring-4 focus-within:ring-green/10"
          >
            <input
              v-model="form.password"
              class="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted"
              placeholder="Your password"
              :type="showPassword ? 'text' : 'password'"
              required
            />
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
            'flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-semibold transition-all duration-200',
            !loading
              ? 'bg-ink text-white hover:bg-ink-2 hover:shadow-xl hover:shadow-ink/15'
              : 'cursor-not-allowed bg-line text-muted',
          ]"
          type="submit"
          :disabled="loading"
        >
          <span
            v-if="loading"
            class="size-4 animate-spin rounded-full border-2 border-white border-t-transparent"
          />
          <ArrowUpRight v-else class="size-4" />
          {{ loading ? 'Signing in...' : 'Sign in' }}
        </button>
      </form>

      <slot />
    </div>
  </div>
</template>
