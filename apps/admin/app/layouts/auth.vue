<template>
  <div
    class="admin-shell-grid relative flex min-h-screen items-center justify-center overflow-hidden bg-sidebar p-5"
  >
    <div
      class="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_30%_20%,rgba(207,238,225,0.28),transparent_34%),radial-gradient(circle_at_70%_10%,rgba(233,120,95,0.18),transparent_30%)]"
    />
    <slot />
  </div>
</template>
