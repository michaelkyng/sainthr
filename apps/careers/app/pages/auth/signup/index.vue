<script setup lang="ts">
import { ArrowLeft, ArrowUpRight, BriefcaseBusiness, Building2, UserRound } from "@lucide/vue"

defineOptions({ name: "CareersSignupPage" })
definePageMeta({ layout: "auth", middleware: "guest" })

useHead({ title: "Join SaintHR – Create your account" })

const route = useRoute()

type Role = "candidate" | "employer"
const SIGNUP_ROLE_KEY = "sainthr:signup-role"
const role = ref<Role | null>(null)

const parseRole = (v: unknown): Role | null =>
  v === "employer" || v === "candidate" ? v : null

onMounted(() => {
  const fromQuery = parseRole(route.query.role)
  const fromStorage = parseRole(sessionStorage.getItem(SIGNUP_ROLE_KEY))
  role.value = fromQuery ?? fromStorage
})

watch(role, (next) => {
  if (!import.meta.client) return
  if (next) sessionStorage.setItem(SIGNUP_ROLE_KEY, next)
  else sessionStorage.removeItem(SIGNUP_ROLE_KEY)
})

// Route through /auth/continue so the backend can promote the signup role hint
// into an authoritative role before we land on the role's home.
const redirectUrl = computed(() => `/auth/continue?role=${role.value ?? "candidate"}`)

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
      <!-- Role picker -->
      <div v-if="!role" key="picker">
        <div class="mb-8 flex flex-col items-center gap-3 text-center">
          <NuxtLink to="/" class="flex items-center gap-2.5 text-ink">
            <span class="grid size-10 place-items-center rounded-xl bg-ink text-white">
              <BriefcaseBusiness class="size-5" />
            </span>
            <span class="font-display text-xl font-semibold">SaintHR</span>
          </NuxtLink>
          <div>
            <h1 class="font-display text-2xl font-semibold text-ink">
              Join SaintHR
            </h1>
            <p class="mt-1.5 text-sm text-muted">
              How would you like to use SaintHR?
            </p>
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
              <p class="font-display text-lg font-semibold text-ink">
                {{ r.title }}
              </p>
              <p class="mt-0.5 text-sm text-muted">
                {{ r.tagline }}
              </p>
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
          <NuxtLink to="/auth/login" class="font-semibold text-ink transition hover:text-green">
            Sign in
          </NuxtLink>
        </p>
      </div>

      <!-- Signup form -->
      <div v-else key="form" class="mx-auto w-full max-w-md">
        <AuthSignupForm
          :role="role"
          :redirect-url="redirectUrl"
          sign-in-url="/auth/login"
        />

        <UiButton variant="ghost" size="sm" class="mt-4 w-full" @click="role = null">
          <ArrowLeft class="size-4" /> Change account type
        </UiButton>
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
