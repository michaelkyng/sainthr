<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    variant?: "default" | "outline" | "secondary" | "ghost" | "link"
    to?: string
    type?: "button" | "submit" | "reset"
    class?: string
  }>(),
  {
    variant: "default",
    type: "button",
    to: undefined,
    class: "",
  },
)

const variants: Record<NonNullable<typeof props.variant>, string> = {
  default: "bg-primary text-primary-foreground shadow-[0_18px_45px_rgba(16,30,68,0.22)] hover:bg-primary/90",
  outline:
    "border border-primary/20 bg-white/70 text-primary shadow-xs backdrop-blur hover:border-primary/40 hover:bg-accent hover:text-accent-foreground",
  secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
  ghost: "text-primary hover:bg-accent hover:text-accent-foreground",
  link: "text-primary hover:border-b hover:border-primary rounded-none",
}

const classes = computed(() =>
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] cursor-pointer",
    variants[props.variant],
    props.class,
  ].join(" "),
)
</script>

<template>
  <NuxtLink v-if="to" :to="to" :class="classes">
    <slot />
  </NuxtLink>
  <button v-else :type="type" :class="classes">
    <slot />
  </button>
</template>
