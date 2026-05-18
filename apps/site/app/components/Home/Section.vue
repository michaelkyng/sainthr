<script setup lang="ts">
defineOptions({
  name: "HomeSectionLayout",
})

withDefaults(
  defineProps<{
    inverse?: boolean
  }>(),
  {
    inverse: false,
  },
)

const { containerWidth } = useTailwindConfig()
</script>

<template>
  <section :class="containerWidth">
    <div
      :class="[
        'grid h-auto grid-cols-1 gap-10 section-pad lg:gap-14',
        inverse ? 'lg:grid-cols-[1fr_0.9fr]' : 'lg:grid-cols-[0.9fr_1fr]',
      ]"
    >
      <div class="flex flex-col gap-16">
        <slot name="left" />
      </div>
      <div class="flex flex-col gap-16">
        <slot name="right" />
      </div>
    </div>
  </section>
</template>
