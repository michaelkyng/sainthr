<script setup lang="ts">
import { type VariantProps, cva } from 'class-variance-authority';
import { cn } from '~/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-ink/10 text-ink',
        green: 'bg-green/10 text-green',
        mint: 'bg-mint text-ink',
        coral: 'bg-coral/10 text-coral',
        gold: 'bg-gold/10 text-gold',
        sky: 'bg-sky/10 text-sky',
        plum: 'bg-plum/10 text-plum',
        outline: 'border border-line text-muted',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

type BadgeVariants = VariantProps<typeof badgeVariants>;

const props = defineProps<{
  variant?: BadgeVariants['variant'];
  class?: string;
}>();
</script>

<template>
  <span :class="cn(badgeVariants({ variant }), props.class)">
    <slot />
  </span>
</template>
