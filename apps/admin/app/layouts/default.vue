<template>
  <div class="relative flex min-h-screen overflow-hidden bg-paper">
    <div
      class="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top_left,rgba(36,118,90,0.14),transparent_34%),radial-gradient(circle_at_top_right,rgba(233,120,95,0.11),transparent_30%)]"
    />
    <AdminSidebar />
    <div class="relative flex min-w-0 flex-1 flex-col overflow-y-scroll h-screen">
      <AdminHeader />
      <nav
        class="relative flex gap-2 overflow-x-auto border-b border-line/70 bg-paper/90 px-4 py-3 sm:px-6 lg:hidden"
      >
        <NuxtLink
          class="shrink-0 rounded-full border border-line bg-white px-3 py-1.5 text-sm font-semibold text-muted"
          to="/dashboard"
          >Dashboard</NuxtLink
        >
        <NuxtLink
          class="shrink-0 rounded-full border border-line bg-white px-3 py-1.5 text-sm font-semibold text-muted"
          to="/jobs"
          >Jobs</NuxtLink
        >
        <NuxtLink
          class="shrink-0 rounded-full border border-line bg-white px-3 py-1.5 text-sm font-semibold text-muted"
          to="/candidates"
          >Candidates</NuxtLink
        >
        <NuxtLink
          class="shrink-0 rounded-full border border-line bg-white px-3 py-1.5 text-sm font-semibold text-muted"
          to="/applications"
          >Applications</NuxtLink
        >
        <NuxtLink
          class="shrink-0 rounded-full border border-line bg-white px-3 py-1.5 text-sm font-semibold text-muted"
          to="/employers"
          >Employers</NuxtLink
        >
        <NuxtLink
          class="shrink-0 rounded-full border border-line bg-white px-3 py-1.5 text-sm font-semibold text-muted"
          to="/settings"
          >Settings</NuxtLink
        >
      </nav>
      <main class="flex-1 overflow-y-auto px-4 py-5 sm:px-6 lg:px-8 lg:py-7">
        <slot />
      </main>
    </div>
  </div>
</template>
