export default defineNuxtConfig({
  compatibilityDate: "2026-05-18",
  extends: ["../../layers/shared-auth", "../../layers/shared-utils"],
  srcDir: "app",
  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },
  dir: {
    public: "../../public",
  },
  modules: ["@nuxt/eslint", "@pinia/nuxt", "pinia-plugin-persistedstate/nuxt"],
  postcss: {
    plugins: {
      "@tailwindcss/postcss": {},
    },
  },
  app: {
    head: {
      title: "SaintHR Careers",
      meta: [
        {
          name: "description",
          content:
            "SaintHR Careers is a dedicated job search, candidate profile, and hiring workspace.",
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      mainSiteUrl: process.env.NUXT_PUBLIC_MAIN_SITE_URL ?? "http://localhost:3000",
    },
  },
})
