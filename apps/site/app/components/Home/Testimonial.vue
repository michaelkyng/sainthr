<script setup lang="ts">
import { ArrowUpRight, ChevronLeft, ChevronRight, Star } from "@lucide/vue"

defineOptions({
  name: "HomeTestimonialSection",
})

const { heading2, containerWidth } = useTailwindConfig()
const { careersUrl } = useAppLinks()
const carousel = ref<HTMLElement | null>(null)
const currentIndex = ref(0)

const cardItems = [
  {
    image: "/person1.png",
    name: "Michael Johnson",
    position: "CEO, Framify",
    review:
      '"Saint HR helped us find the perfect real estate agents for our growing business. Their recruitment process was efficient, and the candidates they provided were not only highly skilled but also a great cultural fit. Thanks to their support, our team is now stronger and more aligned with our company values!"',
    rating: 5,
  },
  {
    image: "/person2.png",
    name: "John Keneth",
    position: "CEO, Metropole",
    review:
      '"Saint HR helped us find the perfect real estate agents for our growing business. Their recruitment process was efficient, and the candidates they provided were not only highly skilled but also a great cultural fit. Thanks to their support, our team is now stronger and more aligned with our company values!"',
    rating: 4,
  },
  {
    image: "/person3.png",
    name: "James Williams",
    position: "CEO, Doortech",
    review:
      '"Saint HR helped us find the perfect real estate agents for our growing business. Their recruitment process was efficient, and the candidates they provided were not only highly skilled but also a great cultural fit. Thanks to their support, our team is now stronger and more aligned with our company values!"',
    rating: 4,
  },
]

const scrollByCard = (direction: "left" | "right") => {
  if (!carousel.value) return
  const next = direction === "right"
    ? (currentIndex.value + 1) % cardItems.length
    : (currentIndex.value - 1 + cardItems.length) % cardItems.length
  currentIndex.value = next
  carousel.value.scrollTo({
    left: next * carousel.value.clientWidth,
    behavior: "smooth",
  })
}

let autoplayTimer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  autoplayTimer = setInterval(() => scrollByCard("right"), 5000)
})

onUnmounted(() => {
  if (autoplayTimer) clearInterval(autoplayTimer)
})

const pauseAutoplay = () => {
  if (autoplayTimer) clearInterval(autoplayTimer)
}
</script>

<template>
  <section class="w-full bg-secondary/60">
    <div :class="['flex w-full flex-col gap-14 section-pad', containerWidth]">
      <div class="flex w-full flex-col justify-between gap-5 md:flex-row md:items-end">
        <div class="max-w-2xl">
          <p v-reveal class="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">Proof</p>
          <h2 v-reveal="80" :class="heading2">
            Trusted by teams that need hiring to feel clear and accountable
          </h2>
        </div>
        <BaseButton v-reveal="160" :to="careersUrl" variant="outline" class="w-fit px-6! py-4!">
          <span class="text-sm md:text-base">View All Reviews</span>
          <ArrowUpRight class="size-4" />
        </BaseButton>
      </div>

      <div v-reveal="120" class="relative max-w-full rounded-2xl border border-border bg-white p-4 shadow-[0_24px_70px_rgba(16,30,68,0.1)] md:p-6" @mouseenter="pauseAutoplay">
        <div
          ref="carousel"
          class="hide-scrollbar flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
        >
          <article
            v-for="item in cardItems"
            :key="item.name"
            class="relative flex size-full shrink-0 basis-full snap-start flex-col gap-8 p-2 lg:flex-row lg:items-center lg:p-5 xl:gap-14"
          >
            <div class="flex items-start justify-start xl:items-center xl:justify-center">
              <img
                :src="item.image"
                :alt="item.name"
                class="h-fit w-40 shrink-0 rounded-xl object-contain"
              >
            </div>
            <div class="flex flex-col gap-4">
              <p class="font-display text-lg font-medium leading-8 text-primary md:text-xl lg:text-2xl">
                {{ item.review }}
              </p>
              <div class="flex gap-1">
                <Star
                  v-for="index in item.rating"
                  :key="index"
                  class="size-4 fill-amber-400 text-amber-400"
                />
              </div>
              <div class="mt-4 flex flex-col gap-1">
                <h3 class="font-display font-semibold text-primary md:text-lg lg:text-xl">
                  {{ item.name }}
                </h3>
                <p class="text-sm text-muted-foreground">{{ item.position }}</p>
              </div>
            </div>
          </article>
        </div>

        <div class="mt-5 flex items-center justify-between">
          <div class="flex gap-1.5">
            <button
              v-for="(_, i) in cardItems"
              :key="i"
              :class="[
                'h-1.5 rounded-full transition-all duration-300',
                currentIndex === i ? 'w-6 bg-primary' : 'w-1.5 bg-primary/25',
              ]"
              type="button"
              :aria-label="`Go to testimonial ${i + 1}`"
              @click="() => { currentIndex = i; carousel?.scrollTo({ left: i * (carousel?.clientWidth ?? 0), behavior: 'smooth' }); pauseAutoplay() }"
            />
          </div>
          <div class="flex gap-2">
            <button
              class="grid size-9 place-items-center rounded-full border border-primary/20 bg-white text-primary transition-all duration-200 hover:bg-accent hover:border-primary/40"
              type="button"
              aria-label="Previous testimonial"
              @click="() => { scrollByCard('left'); pauseAutoplay() }"
            >
              <ChevronLeft class="size-4" />
            </button>
            <button
              class="grid size-9 place-items-center rounded-full border border-primary/20 bg-white text-primary transition-all duration-200 hover:bg-accent hover:border-primary/40"
              type="button"
              aria-label="Next testimonial"
              @click="() => { scrollByCard('right'); pauseAutoplay() }"
            >
              <ChevronRight class="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
