<script setup lang="ts">
import { ArrowUpRight } from "@lucide/vue"

defineOptions({
  name: "HomeProjectsSection",
})

const { heading2, subHeading, containerWidth } = useTailwindConfig()
const { careersUrl } = useAppLinks()

const cardItems = [
  {
    title: "Building a Stronger Team: Real Estate Talent Acquisition",
    industry: "Real Estate",
    description:
      "Focused on recruiting top-tier agents, property managers, and administrative staff to support business growth in real estate.",
    services: ["Recruitment", "Team Building", "Administrative Support"],
  },
  {
    title: "Building Financial Expertise: Banking & Finance Talent Solutions",
    industry: "Banking & Finance",
    description:
      "Focused on attracting top talent in the finance sector and offering industry-specific training in financial analysis, compliance, and customer service.",
    services: ["Recruitment", "Industry Training", "Compliance"],
  },
  {
    title: "Caring for Talent: Healthcare Recruitment & Compliance Training",
    industry: "Healthcare",
    description:
      "Focused on recruiting healthcare professionals and providing essential compliance training to meet industry standards.",
    services: ["Recruitment", "Compliance Training", "Staff Development"],
  },
  {
    title: "Tech Talent Surge: IT Recruitment & Skill Development",
    industry: "Technology & IT",
    description:
      "Focused on recruiting IT professionals and providing skill development programs to keep teams ahead of technological advancements.",
    services: ["IT Recruitment", "Skill Development", "Upskilling"],
  },
]

const tabs = ["All", "Real Estate", "Banking & Finance", "Healthcare", "Technology & IT"]

const activeTab = ref("All")
const projects = computed(() =>
  activeTab.value === "All"
    ? cardItems
    : cardItems.filter((project) => project.industry === activeTab.value),
)
</script>

<template>
  <section class="w-full bg-background">
    <div :class="['flex w-full flex-col gap-14 section-pad', containerWidth]">
      <div class="flex w-full flex-col justify-between gap-5 md:flex-row md:items-end">
        <div class="max-w-2xl">
          <p v-reveal class="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">Case work</p>
          <h2 v-reveal="80" :class="heading2">
            Businesses we've empowered with tailored HR solutions
          </h2>
        </div>
        <BaseButton v-reveal="160" :to="careersUrl" variant="outline" class="w-fit px-6! py-4!">
          <span class="text-sm md:text-base">Join Us</span>
          <ArrowUpRight class="size-4" />
        </BaseButton>
      </div>

      <div v-reveal="120" class="flex w-full flex-col gap-8 lg:flex-row lg:gap-12">
        <div class="hide-scrollbar flex shrink-0 flex-row overflow-x-auto rounded-xl border border-border bg-white p-2 shadow-sm lg:flex-col">
          <button
            v-for="item in tabs"
            :key="item"
            :class="[
              'whitespace-nowrap rounded-lg px-4 py-3 text-start transition-all duration-300 lg:min-w-52',
              subHeading,
              activeTab === item
                ? 'bg-primary text-white'
                : 'text-muted-foreground hover:bg-accent hover:text-primary',
            ]"
            type="button"
            @click="activeTab = item"
          >
            {{ item }}
          </button>
        </div>

        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <TransitionGroup name="cards">
            <article
              v-for="(project, index) in projects"
              :key="project.title"
              :class="[
                'flex min-h-[240px] flex-col gap-4 rounded-2xl border border-border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_22px_60px_rgba(16,30,68,0.1)]',
                index === 1 || index === 2 ? 'md:row-span-2' : 'md:row-span-1',
              ]"
            >
              <div class="flex flex-col gap-2">
                <p class="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">{{ project.industry }}</p>
                <h3 class="font-display text-lg font-semibold text-primary">
                  {{ project.title }}
                </h3>
                <p class="text-sm leading-7 text-muted-foreground">{{ project.description }}</p>
              </div>
              <div class="mt-auto flex flex-wrap gap-2">
                <span
                  v-for="service in project.services"
                  :key="service"
                  class="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                >
                  {{ service }}
                </span>
              </div>
            </article>
          </TransitionGroup>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cards-move,
.cards-enter-active,
.cards-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.cards-enter-from,
.cards-leave-to {
  opacity: 0;
  transform: scale(0.96) translateY(10px);
}

.cards-leave-active {
  position: absolute;
}
</style>
