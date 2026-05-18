<script setup lang="ts">
import { ArrowLeft, ArrowUpRight, BriefcaseBusiness, Building2, Eye, EyeOff, Search, UserRound } from "@lucide/vue"

defineOptions({ name: "CareersSignupPage" })
definePageMeta({ layout: "auth" })

useHead({ title: "Join SaintHR – Create your account" })

const route = useRoute()
const router = useRouter()
const { profile } = useProfile()
const { employer } = useCompany()

type Role = "candidate" | "employer"
const role = ref<Role | null>(null)

onMounted(() => {
  const q = route.query.role
  if (q === "employer") role.value = "employer"
  else if (q === "candidate") role.value = "candidate"
})

const form = reactive({ name: "", email: "", password: "" })
const showPassword = ref(false)
const loading = ref(false)
const agreed = ref(false)

const handleSubmit = async () => {
  if (!agreed.value || !role.value) return
  loading.value = true
  await new Promise(r => setTimeout(r, 800))
  if (role.value === "candidate") {
    profile.value.fullName = form.name
    profile.value.email = form.email
    router.push("/onboarding")
  }
  else {
    employer.value.fullName = form.name
    employer.value.email = form.email
    router.push("/company/onboarding")
  }
  loading.value = false
}

const ROLES = [
  {
    id: "candidate" as Role,
    icon: UserRound,
    title: "Job Seeker",
    tagline: "Find your next HR role",
    perks: ["Build a searchable candidate profile", "Apply to vetted HR roles", "Track your applications"],
    cta: "Create candidate profile",
    color: "group-hover:bg-mint group-hover:text-green",
    badge: "bg-mint text-green",
  },
  {
    id: "employer" as Role,
    icon: Building2,
    title: "Employer",
    tagline: "Hire vetted HR professionals",
    perks: ["Post jobs across multiple companies", "Manage all listings in one place", "Connect with pre-screened talent"],
    cta: "Create employer account",
    color: "group-hover:bg-[#e8eeff] group-hover:text-[#3b55c4]",
    badge: "bg-[#e8eeff] text-[#3b55c4]",
  },
] as const
</script>

<template>
  <div class="w-full max-w-xl">
    <Transition name="step" mode="out-in">
      <!-- ── Role picker ──────────────────────────────── -->
      <div v-if="!role" key="picker">
        <div class="mb-8 flex flex-col items-center gap-3 text-center">
          <NuxtLink to="/" class="flex items-center gap-2.5 text-ink">
            <span class="grid size-10 place-items-center rounded-xl bg-ink text-white">
              <BriefcaseBusiness class="size-5" />
            </span>
            <span class="font-display text-xl font-semibold">SaintHR</span>
          </NuxtLink>
          <div>
            <h1 class="font-display text-2xl font-semibold text-ink">Join SaintHR</h1>
            <p class="mt-1.5 text-sm text-muted">How would you like to use SaintHR?</p>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            v-for="r in ROLES"
            :key="r.id"
            class="group flex flex-col items-start gap-4 rounded-2xl border border-line bg-panel p-6 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-[0_12px_40px_rgba(16,30,68,0.10)]"
            type="button"
            @click="role = r.id"
          >
            <div :class="['flex size-11 items-center justify-center rounded-xl bg-paper text-muted transition-all duration-200', r.color]">
              <component :is="r.icon" class="size-5" />
            </div>
            <div>
              <p class="font-display text-lg font-semibold text-ink">{{ r.title }}</p>
              <p class="mt-0.5 text-sm text-muted">{{ r.tagline }}</p>
            </div>
            <ul class="flex flex-col gap-2">
              <li v-for="perk in r.perks" :key="perk" class="flex items-start gap-2 text-xs text-muted">
                <span class="mt-0.5 size-1.5 shrink-0 rounded-full bg-green" />
                {{ perk }}
              </li>
            </ul>
            <span class="mt-auto flex items-center gap-1.5 text-xs font-semibold text-ink/60 transition group-hover:text-ink">
              Get started <ArrowUpRight class="size-3.5" />
            </span>
          </button>
        </div>

        <p class="mt-5 text-center text-sm text-muted">
          Already have an account?
          <NuxtLink to="/auth/login" class="font-semibold text-ink transition hover:text-green">Sign in</NuxtLink>
        </p>
      </div>

      <!-- ── Signup form ──────────────────────────────── -->
      <div v-else key="form" class="mx-auto w-full max-w-md">
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
              <div :class="['mb-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold', ROLES.find(r => r.id === role)?.badge]">
                <component :is="ROLES.find(r => r.id === role)?.icon" class="size-3.5" />
                {{ ROLES.find(r => r.id === role)?.title }}
              </div>
              <h1 class="font-display text-2xl font-semibold text-ink">
                {{ role === "employer" ? "Create your employer account" : "Create your profile" }}
              </h1>
              <p class="mt-1.5 text-sm text-muted">
                {{ role === "employer" ? "Set up your account, then add your companies." : "Find vetted HR roles from top employers." }}
              </p>
            </div>
          </div>

          <form class="flex flex-col gap-4" @submit.prevent="handleSubmit">
            <label class="flex flex-col gap-1.5">
              <span class="text-xs font-semibold text-ink">Your full name</span>
              <div class="flex items-center gap-3 rounded-xl border border-line bg-paper px-4 py-3 transition-colors focus-within:border-ink/40">
                <UserRound class="size-4 shrink-0 text-muted" />
                <input
                  v-model="form.name"
                  class="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted"
                  placeholder="Ada Johnson"
                  type="text"
                  required
                >
              </div>
            </label>

            <label class="flex flex-col gap-1.5">
              <span class="text-xs font-semibold text-ink">
                {{ role === "employer" ? "Work email" : "Email address" }}
              </span>
              <input
                v-model="form.email"
                class="rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink outline-none placeholder:text-muted transition-colors focus:border-ink/40"
                :placeholder="role === 'employer' ? 'you@company.com' : 'you@example.com'"
                type="email"
                required
              >
            </label>

            <label class="flex flex-col gap-1.5">
              <span class="text-xs font-semibold text-ink">Password</span>
              <div class="flex items-center gap-3 rounded-xl border border-line bg-paper px-4 py-3 transition-colors focus-within:border-ink/40">
                <input
                  v-model="form.password"
                  class="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted"
                  placeholder="At least 8 characters"
                  :type="showPassword ? 'text' : 'password'"
                  required
                >
                <button
                  class="text-muted transition hover:text-ink"
                  type="button"
                  @click="showPassword = !showPassword"
                >
                  <EyeOff v-if="showPassword" class="size-4" />
                  <Eye v-else class="size-4" />
                </button>
              </div>
            </label>

            <label class="flex cursor-pointer items-start gap-3">
              <input v-model="agreed" class="mt-0.5 accent-green" type="checkbox">
              <span class="text-xs leading-5 text-muted">
                I agree to SaintHR's
                <span class="font-semibold text-ink">Terms of Service</span>
                and
                <span class="font-semibold text-ink">Privacy Policy</span>
              </span>
            </label>

            <button
              :class="[
                'flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-200',
                agreed && !loading ? 'bg-ink text-white hover:bg-ink-2' : 'cursor-not-allowed bg-line text-muted',
              ]"
              type="submit"
              :disabled="!agreed || loading"
            >
              <span v-if="loading" class="size-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              <ArrowUpRight v-else class="size-4" />
              {{ loading ? "Creating account..." : ROLES.find(r => r.id === role)?.cta }}
            </button>
          </form>

          <p class="mt-6 text-center text-sm text-muted">
            Already have an account?
            <NuxtLink to="/auth/login" class="font-semibold text-ink transition hover:text-green">Sign in</NuxtLink>
          </p>
        </div>

        <button
          class="mt-4 flex w-full items-center justify-center gap-1.5 text-sm font-semibold text-muted transition hover:text-ink"
          type="button"
          @click="role = null"
        >
          <ArrowLeft class="size-4" /> Change account type
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.step-enter-active,
.step-leave-active {
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}
.step-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.step-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
