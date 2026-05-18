export default defineNuxtConfig({
  compatibilityDate: "2026-05-18",
  srcDir: "app",
  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },
  dir: {
    public: "../../public",
  },
  modules: ["@nuxt/eslint"],
  postcss: {
    plugins: {
      "@tailwindcss/postcss": {},
    },
  },
  app: {
    head: {
      title: "SaintHR Admin",
      meta: [
        {
          name: "description",
          content: "SaintHR Admin — internal dashboard for managing jobs, candidates, and HR operations.",
        },
      ],
    },
  },
  runtimeConfig: {
    public: {
      mainSiteUrl: process.env.NUXT_PUBLIC_MAIN_SITE_URL ?? "http://localhost:3000",
      careersUrl: process.env.NUXT_PUBLIC_CAREERS_URL ?? "http://localhost:3001",
    },
  },
})
