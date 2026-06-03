<script setup lang="ts">
import { ArrowUpRight, Building2, Check, Loader2, UserRound } from "@lucide/vue"

defineOptions({ name: "AuthContinuePage" })
definePageMeta({ layout: "auth" })

useHead({ title: "Continue – SaintHR" })

type Role = "candidate" | "employer"
const isRole = (v: unknown): v is Role => v === "candidate" || v === "employer"

const route = useRoute()
const auth = useSharedAuth()

const status = ref<"loading" | "choose">("loading")

// A specific destination the user was originally heading to (deep link bounced
// through login). We let that page's own middleware pick the active context.
const redirectTarget = computed(() => {
  const t = route.query.redirect_url
  return typeof t === "string" && t.startsWith("/") && !t.startsWith("/auth")
    ? t
    : null
})

// The role the user just signed up as (passed by the signup flow).
const intendedRole = computed<Role | null>(() =>
  isRole(route.query.role) ? route.query.role : null,
)

const ROLE_CARDS = [
  {
    id: "candidate" as Role,
    icon: UserRound,
    title: "Job Seeker",
    tagline: "Browse and apply to HR roles",
    color: "group-hover:bg-mint group-hover:text-green",
  },
  {
    id: "employer" as Role,
    icon: Building2,
    title: "Employer",
    tagline: "Post jobs and manage hiring",
    color: "group-hover:bg-[#e8eeff] group-hover:text-[#3b55c4]",
  },
] as const

const availableCards = computed(() =>
  ROLE_CARDS.filter(card => auth.roles.value.includes(card.id)),
)

const choose = async (r: Role) => {
  auth.setActiveRole(r)
  await navigateTo(auth.homeFor(r))
}

onMounted(async () => {
  const ready = await ensureAuthReady()
  if (!ready) return

  if (!auth.isSignedIn.value) {
    await navigateTo({
      path: "/auth/login",
      query: redirectTarget.value ? { redirect_url: redirectTarget.value } : {},
    })
    return
  }

  // Promote the signup hint into an authoritative role (backend), or ensure a
  // default exists. Skip the round-trip for returning users who already have
  // roles and aren't carrying a fresh signup hint.
  if (intendedRole.value || auth.roles.value.length === 0) {
    await auth.bootstrap(intendedRole.value)
  }

  // Fresh signup: enter the role they just created (this sets the context).
  if (intendedRole.value && auth.hasRole(intendedRole.value)) {
    await choose(intendedRole.value)
    return
  }

  // Deep link: treat it as a login-time choice — set the context that matches
  // the destination's section (if they hold that role), then hand off. If they
  // don't hold it, the section's middleware will redirect them appropriately.
  if (redirectTarget.value) {
    const wanted: Role = redirectTarget.value.startsWith("/company") ? "employer" : "candidate"
    if (auth.hasRole(wanted)) auth.setActiveRole(wanted)
    await navigateTo(redirectTarget.value)
    return
  }

  // Multiple roles → always ask which role to act as, at login.
  if (auth.roles.value.length > 1) {
    status.value = "choose"
    return
  }

  // Exactly one role → its home. No recognised role → public jobs board.
  if (auth.roles.value.length === 1) {
    await navigateTo(auth.homeFor(auth.roles.value[0]!))
    return
  }

  await navigateTo("/jobs")
})
</script>

<template>
  <div class="w-full max-w-xl">
    <!-- Working: bootstrapping / resolving destination -->
    <div
      v-if="status === 'loading'"
      class="mx-auto flex w-full max-w-md flex-col items-center gap-4 rounded-3xl border border-white/20 bg-panel/95 p-10 text-center shadow-[0_28px_90px_rgba(0,0,0,0.28)] backdrop-blur"
    >
      <span class="grid size-12 place-items-center rounded-2xl bg-ink text-white">
        <Loader2 class="size-5 animate-spin" />
      </span>
      <div>
        <h1 class="font-display text-xl font-semibold text-ink">
          Setting up your account…
        </h1>
        <p class="mt-1.5 text-sm text-muted">
          Just a moment while we get things ready.
        </p>
      </div>
    </div>

    <!-- Multi-role chooser -->
    <div v-else>
      <div class="mb-8 flex flex-col items-center gap-3 text-center">
        <h1 class="font-display text-2xl font-semibold text-ink">
          Continue as…
        </h1>
        <p class="text-sm text-muted">
          You have access to more than one workspace. Pick one to continue —
          you can switch anytime.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          v-for="card in availableCards"
          :key="card.id"
          class="group flex flex-col items-start gap-4 rounded-2xl border border-line bg-panel p-6 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-[0_12px_40px_rgba(16,30,68,0.10)]"
          type="button"
          @click="choose(card.id)"
        >
          <div
            :class="['flex size-11 items-center justify-center rounded-xl bg-paper text-muted transition-all duration-200', card.color]"
          >
            <component :is="card.icon" class="size-5" />
          </div>
          <div>
            <p class="font-display text-lg font-semibold text-ink">
              {{ card.title }}
            </p>
            <p class="mt-0.5 text-sm text-muted">
              {{ card.tagline }}
            </p>
          </div>
          <span class="mt-auto flex items-center gap-1.5 text-xs font-semibold text-ink/60 transition group-hover:text-ink">
            <Check v-if="auth.activeRole.value === card.id" class="size-3.5 text-green" />
            Continue <ArrowUpRight class="size-3.5" />
          </span>
        </button>
      </div>
    </div>
  </div>
</template>
