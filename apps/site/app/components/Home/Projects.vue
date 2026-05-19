<script setup lang="ts">
import { ArrowUpRight, ChevronLeft, ChevronRight } from "@lucide/vue"

defineOptions({
  name: "HomeProjectsSection",
})

const { heading2, containerWidth } = useTailwindConfig()
const { careersUrl } = useAppLinks()

const CARDS_PER_PAGE = 4

const cardItems = [
  {
    title: "Building a Stronger Team: Real Estate Talent Acquisition",
    industry: "Real Estate",
    image: "https://picsum.photos/seed/realestate1/600/360",
    description:
      "Focused on recruiting top-tier agents, property managers, and administrative staff to support business growth in real estate.",
    services: ["Recruitment", "Team Building", "Administrative Support"],
  },
  {
    title: "Building Financial Expertise: Banking & Finance Talent Solutions",
    industry: "Banking & Finance",
    image: "https://picsum.photos/seed/banking1/600/360",
    description:
      "Focused on attracting top talent in the finance sector and offering industry-specific training in financial analysis, compliance, and customer service.",
    services: ["Recruitment", "Industry Training", "Compliance"],
  },
  {
    title: "Caring for Talent: Healthcare Recruitment & Compliance Training",
    industry: "Healthcare",
    image: "https://picsum.photos/seed/healthcare1/600/360",
    description:
      "Focused on recruiting healthcare professionals and providing essential compliance training to meet industry standards.",
    services: ["Recruitment", "Compliance Training", "Staff Development"],
  },
  {
    title: "Tech Talent Surge: IT Recruitment & Skill Development",
    industry: "Technology & IT",
    image: "https://picsum.photos/seed/techtalent1/600/360",
    description:
      "Focused on recruiting IT professionals and providing skill development programs to keep teams ahead of technological advancements.",
    services: ["IT Recruitment", "Skill Development", "Upskilling"],
  },
  {
    title: "Scaling Agency Operations: Real Estate HR Framework",
    industry: "Real Estate",
    image: "https://picsum.photos/seed/realestate2/600/360",
    description:
      "Partnered with a fast-growing real estate agency to build a resilient HR framework, reducing turnover by 40% within six months.",
    services: ["HR Strategy", "Talent Retention", "Onboarding"],
  },
  {
    title: "Executive Search: CFO & Finance Leadership Placement",
    industry: "Banking & Finance",
    image: "https://picsum.photos/seed/banking2/600/360",
    description:
      "Delivered executive search and placement for senior finance leadership roles across three regional banking institutions.",
    services: ["Executive Search", "Leadership Placement", "Headhunting"],
  },
  {
    title: "Nursing Excellence: Healthcare Staff Development Programme",
    industry: "Healthcare",
    image: "https://picsum.photos/seed/healthcare2/600/360",
    description:
      "Designed and rolled out a structured staff development programme for nursing teams across two private hospital groups.",
    services: ["Staff Development", "Training Design", "Performance Management"],
  },
  {
    title: "Digital Transformation: Full-Stack Engineering Talent Pipeline",
    industry: "Technology & IT",
    image: "https://picsum.photos/seed/techtalent2/600/360",
    description:
      "Built a full-stack engineering talent pipeline for a fintech startup scaling from 12 to 60 engineers in under a year.",
    services: ["Talent Pipeline", "Tech Recruitment", "Scaling"],
  },
]

const tabs = ["All", "Real Estate", "Banking & Finance", "Healthcare", "Technology & IT"]

const activeTab = ref("All")
const currentPage = ref(0)

const filteredProjects = computed(() =>
  activeTab.value === "All"
    ? cardItems
    : cardItems.filter(p => p.industry === activeTab.value),
)

const totalPages = computed(() => Math.ceil(filteredProjects.value.length / CARDS_PER_PAGE))

const pageProjects = computed(() => {
  const start = currentPage.value * CARDS_PER_PAGE
  return filteredProjects.value.slice(start, start + CARDS_PER_PAGE)
})

watch(activeTab, () => { currentPage.value = 0 })
</script>

<template>
  <section class="w-full bg-background">
    <div :class="['flex w-full flex-col gap-12 section-pad', containerWidth]">

      <div class="flex w-full flex-col gap-7">
        <div class="flex w-full flex-col justify-between gap-5 md:flex-row md:items-end">
          <div class="max-w-2xl">
            <p v-reveal class="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-muted-foreground">Case work</p>
            <h2 v-reveal="80" :class="heading2">
              Businesses we've empowered with tailored HR solutions
            </h2>
          </div>
          <BaseButton v-reveal="160" :to="careersUrl" variant="outline" class="w-fit px-6! py-4!">
            <span class="text-sm md:text-base">Join Us</span>
            <ArrowUpRight class="size-4" />
          </BaseButton>
        </div>

        <div v-reveal="100" class="hide-scrollbar flex gap-2 overflow-x-auto pb-1">
          <button
            v-for="item in tabs"
            :key="item"
            :class="[
              'whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-all duration-200',
              activeTab === item
                ? 'bg-primary text-white shadow-sm'
                : 'border border-border bg-white text-muted-foreground hover:border-primary/30 hover:text-primary',
            ]"
            type="button"
            @click="activeTab = item"
          >
            {{ item }}
          </button>
        </div>
      </div>

      <div v-reveal="120" class="flex flex-col gap-8">
        <Transition name="fade" mode="out-in">
          <div :key="`${activeTab}-${currentPage}`" class="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <article
              v-for="(project, index) in pageProjects"
              :key="project.title"
              class="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-[0_16px_48px_rgba(16,30,68,0.08)]"
            >
              <div class="aspect-video overflow-hidden">
                <img
                  :src="project.image"
                  :alt="project.title"
                  class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                >
              </div>

              <div class="flex flex-col gap-5 p-6">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <span class="font-display text-xs font-semibold text-muted-foreground/40">{{ String(currentPage * CARDS_PER_PAGE + index + 1).padStart(2, "0") }}</span>
                    <span class="h-px w-5 bg-border" />
                    <span class="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{{ project.industry }}</span>
                  </div>
                  <span class="grid size-8 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-all duration-200 group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                    <ArrowUpRight class="size-3.5" />
                  </span>
                </div>

                <div class="flex flex-col gap-2">
                  <h3 class="font-display text-xl font-semibold leading-snug text-primary">
                    {{ project.title }}
                  </h3>
                  <p class="text-sm leading-7 text-muted-foreground">{{ project.description }}</p>
                </div>

                <div class="mt-auto flex flex-wrap gap-2">
                  <span
                    v-for="service in project.services"
                    :key="service"
                    class="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {{ service }}
                  </span>
                </div>
              </div>
            </article>
          </div>
        </Transition>

        <div v-if="totalPages > 1" class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <button
              v-for="i in totalPages"
              :key="i"
              :class="[
                'h-1.5 rounded-full transition-all duration-300',
                currentPage === i - 1 ? 'w-6 bg-primary' : 'w-1.5 bg-border hover:bg-muted-foreground/40',
              ]"
              type="button"
              @click="currentPage = i - 1"
            />
          </div>

          <div class="flex gap-2">
            <button
              :disabled="currentPage === 0"
              class="grid size-10 place-items-center rounded-full border border-border text-muted-foreground transition-all duration-200 hover:border-primary hover:bg-primary hover:text-white disabled:pointer-events-none disabled:opacity-35"
              type="button"
              @click="currentPage--"
            >
              <ChevronLeft class="size-4" />
            </button>
            <button
              :disabled="currentPage >= totalPages - 1"
              class="grid size-10 place-items-center rounded-full border border-border text-muted-foreground transition-all duration-200 hover:border-primary hover:bg-primary hover:text-white disabled:pointer-events-none disabled:opacity-35"
              type="button"
              @click="currentPage++"
            >
              <ChevronRight class="size-4" />
            </button>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
