<script setup lang="ts">
import { SwitchRoot, SwitchThumb, type SwitchRootEmits, type SwitchRootProps, useForwardPropsEmits } from "reka-ui"
import { cn } from "~/lib/utils"

const props = defineProps<SwitchRootProps & { class?: string }>()
const emits = defineEmits<SwitchRootEmits>()

const delegated = computed(() => {
  const { class: _c, ...rest } = props
  return rest
})
const forwarded = useForwardPropsEmits(delegated, emits)
</script>

<template>
  <SwitchRoot
    v-bind="forwarded"
    :class="cn(
      'inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent bg-line transition-colors duration-200 data-[state=checked]:bg-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 disabled:cursor-not-allowed disabled:opacity-50',
      props.class,
    )"
  >
    <SwitchThumb
      class="pointer-events-none block size-5 translate-x-0 rounded-full bg-white shadow-sm ring-0 transition-transform duration-200 data-[state=checked]:translate-x-5"
    />
  </SwitchRoot>
</template>
