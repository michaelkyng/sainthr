<script setup lang="ts">
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  Sparkles,
  TrendingUp,
  UserCheck,
  Users,
  FileText,
} from '@lucide/vue';
import Card from '~/components/ui/Card.vue';
import CardHeader from '~/components/ui/CardHeader.vue';
import CardTitle from '~/components/ui/CardTitle.vue';
import CardContent from '~/components/ui/CardContent.vue';
import CardFooter from '~/components/ui/CardFooter.vue';
import Badge from '~/components/ui/Badge.vue';
import Button from '~/components/ui/Button.vue';
import Separator from '~/components/ui/Separator.vue';
import AdminStatCard from '~/components/admin/StatCard.vue';
import AdminPipelineBar from '~/components/admin/PipelineBar.vue';
import AdminActivityFeed from '~/components/admin/ActivityFeed.vue';

defineOptions({ name: 'AdminDashboardPage' });
useHead({ title: 'Dashboard – SaintHR Admin' });

const stats = [
  { label: 'Open Jobs', value: '24', delta: '+3 this week', icon: BriefcaseBusiness, iconColor: 'text-sky', iconFill: 'bg-sky/10' },
  { label: 'Candidates', value: '1,284', delta: '+47 this week', icon: Users, iconColor: 'text-green', iconFill: 'bg-green/10' },
  { label: 'Applications', value: '386', delta: '+21 this week', icon: FileText, iconColor: 'text-gold', iconFill: 'bg-gold/10' },
  { label: 'Hired', value: '12', delta: '+2 this month', icon: UserCheck, iconColor: 'text-coral', iconFill: 'bg-coral/10' },
];

const pipeline = [
  { label: 'New', value: 96, color: 'bg-gold' },
  { label: 'Screening', value: 68, color: 'bg-sky' },
  { label: 'Interview', value: 42, color: 'bg-plum' },
  { label: 'Offer', value: 18, color: 'bg-coral' },
  { label: 'Hired', value: 12, color: 'bg-green' },
];

const recentActivity = [
  { action: 'New application', detail: 'Jane Doe applied for Senior Designer', time: '2m ago' },
  { action: 'Job posted', detail: 'Full Stack Engineer - Remote', time: '1h ago' },
  { action: 'Interview scheduled', detail: 'Mark T. - Product Manager role', time: '3h ago' },
  { action: 'Offer accepted', detail: 'Sarah K. joined as HR Analyst', time: 'Yesterday' },
  { action: 'New application', detail: 'Chris A. applied for DevOps Lead', time: 'Yesterday' },
];

const priorityJobs = [
  { title: 'Senior Frontend Developer', company: 'TechNova Ltd', applicants: 48, fit: '92%' },
  { title: 'Product Manager', company: 'Meridian Finance', applicants: 31, fit: '86%' },
  { title: 'DevOps Engineer', company: 'Greenfield Energy', applicants: 17, fit: '79%' },
];

const barHeights = ['h-16', 'h-24', 'h-20', 'h-32', 'h-28', 'h-36', 'h-40'];
const barColors = ['bg-line', 'bg-green/30', 'bg-sky/30', 'bg-green', 'bg-gold/50', 'bg-coral/60', 'bg-ink'];
</script>

<template>
  <div class="flex flex-col gap-6">

    <!-- Hero card -->
    <Card>
      <div class="grid gap-6 p-5 lg:grid-cols-[1.4fr_0.8fr] lg:p-6">
        <div class="flex flex-col justify-between gap-8">
          <div>
            <div class="inline-flex items-center gap-2 rounded-full border border-green/20 bg-mint/70 px-3 py-1 text-xs font-bold text-green">
              <Sparkles class="size-3.5" />
              14 candidates need review today
            </div>
            <h2 class="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              Keep every requisition moving with one focused admin view.
            </h2>
          </div>
          <div class="flex flex-wrap gap-3">
            <Button>
              Review applications
              <ArrowUpRight class="size-4" />
            </Button>
            <Button variant="secondary">
              <CalendarDays class="size-4" />
              Schedule interviews
            </Button>
          </div>
        </div>

        <!-- Mini chart -->
        <div class="rounded-2xl border border-line bg-panel-soft p-4 shadow-[0_12px_36px_rgba(16,30,68,0.04)]">
          <div class="flex items-center justify-between">
            <p class="text-sm font-semibold text-ink">Hiring goal</p>
            <Badge variant="green">82%</Badge>
          </div>
          <div class="mt-6 grid grid-cols-7 items-end gap-2">
            <div
              v-for="(h, i) in barHeights"
              :key="i"
              :class="['rounded-t-xl', h, barColors[i]]"
            />
          </div>
          <div class="mt-4 flex items-center justify-between text-xs font-medium text-muted">
            <span>Weekly target</span>
            <span>+18 hires projected</span>
          </div>
        </div>
      </div>
    </Card>

    <!-- Stat cards -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <AdminStatCard
        v-for="stat in stats"
        :key="stat.label"
        :label="stat.label"
        :value="stat.value"
        :delta="stat.delta"
        :icon="stat.icon"
        :icon-color="stat.iconColor"
        :icon-fill="stat.iconFill"
      />
    </div>

    <!-- Pipeline + Priority jobs -->
    <div class="grid gap-6 xl:grid-cols-[1fr_0.85fr]">
      <Card>
        <CardHeader class="flex-row items-center justify-between pb-2">
          <CardTitle>Pipeline Health</CardTitle>
          <span class="text-xs font-semibold text-muted">386 total</span>
        </CardHeader>
        <CardContent>
          <AdminPipelineBar :items="pipeline" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader class="flex-row items-center justify-between pb-2">
          <CardTitle>Priority Jobs</CardTitle>
          <Button variant="link" size="sm">View all</Button>
        </CardHeader>
        <CardContent class="flex flex-col gap-3">
          <div
            v-for="job in priorityJobs"
            :key="job.title"
            class="rounded-2xl border border-line bg-panel-soft p-4"
          >
            <div class="flex items-start justify-between gap-3">
              <div>
                <p class="text-sm font-semibold text-ink">{{ job.title }}</p>
                <p class="mt-1 text-xs text-muted">{{ job.company }} / {{ job.applicants }} applicants</p>
              </div>
              <Badge variant="green">{{ job.fit }}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Recent activity -->
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent class="pt-0">
        <AdminActivityFeed :items="recentActivity" />
      </CardContent>
    </Card>

  </div>
</template>
