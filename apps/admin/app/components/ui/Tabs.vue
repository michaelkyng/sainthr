<script setup lang="ts">
const model = defineModel<string>({ required: true });
</script>

<template>
  <div>
    <slot :active="model" :set="(v: string) => (model = v)" />
  </div>
</template>
