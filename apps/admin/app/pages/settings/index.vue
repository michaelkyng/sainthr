<script setup lang="ts">
import { Plug } from '@lucide/vue';
import Card from '~/components/ui/Card.vue';
import CardHeader from '~/components/ui/CardHeader.vue';
import CardTitle from '~/components/ui/CardTitle.vue';
import CardDescription from '~/components/ui/CardDescription.vue';
import CardContent from '~/components/ui/CardContent.vue';
import CardFooter from '~/components/ui/CardFooter.vue';
import Button from '~/components/ui/Button.vue';
import Input from '~/components/ui/Input.vue';
import Switch from '~/components/ui/Switch.vue';
import TabsList from '~/components/ui/TabsList.vue';
import TabsTrigger from '~/components/ui/TabsTrigger.vue';
import Separator from '~/components/ui/Separator.vue';

defineOptions({ name: 'AdminSettingsPage' });
useHead({ title: 'Settings – SaintHR Admin' });

const activeTab = ref('general');

const tabs = [
  { id: 'general', label: 'General' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'security', label: 'Security' },
  { id: 'integrations', label: 'Integrations' },
];

const notifications = reactive([
  { label: 'New application received', desc: 'Notify when a candidate submits an application', enabled: true },
  { label: 'Interview scheduled', desc: 'Notify when an interview is booked', enabled: true },
  { label: 'Offer accepted', desc: 'Notify when a candidate accepts an offer', enabled: false },
  { label: 'New employer registered', desc: 'Notify when a new employer signs up', enabled: true },
]);

const integrations = reactive([
  { name: 'Slack', desc: 'Post hiring updates to your Slack workspace', connected: true },
  { name: 'Google Calendar', desc: 'Sync interview schedules to Google Calendar', connected: false },
  { name: 'LinkedIn', desc: 'Import candidates directly from LinkedIn', connected: false },
  { name: 'Greenhouse ATS', desc: 'Sync applications with Greenhouse', connected: true },
]);

const orgName = ref('SaintHR');
const supportEmail = ref('support@sainthr.com');
const adminUrl = ref('admin.sainthr.com');
const timezone = ref('Africa/Lagos (WAT, UTC+1)');
</script>

<template>
  <div class="flex flex-col gap-6">
    <!-- Page description card -->
    <Card>
      <CardHeader>
        <CardTitle>Workspace controls</CardTitle>
        <CardDescription>
          Update organisation defaults, security, notifications, and connected tools.
        </CardDescription>
      </CardHeader>
    </Card>

    <!-- Tabs -->
    <TabsList>
      <TabsTrigger
        v-for="tab in tabs"
        :key="tab.id"
        :value="tab.id"
        :active="activeTab"
        @select="activeTab = $event"
      >
        {{ tab.label }}
      </TabsTrigger>
    </TabsList>

    <!-- General -->
    <div v-if="activeTab === 'general'">
      <Card>
        <CardHeader>
          <CardTitle class="text-base">Organisation Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-medium text-muted">Organisation Name</label>
              <Input v-model="orgName" placeholder="Organisation name" />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-medium text-muted">Support Email</label>
              <Input v-model="supportEmail" type="email" placeholder="support@example.com" />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-medium text-muted">Admin URL</label>
              <Input v-model="adminUrl" placeholder="admin.example.com" />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-xs font-medium text-muted">Timezone</label>
              <select
                v-model="timezone"
                class="flex h-10 w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-green focus:ring-2 focus:ring-green/10"
              >
                <option>Africa/Lagos (WAT, UTC+1)</option>
                <option>UTC</option>
                <option>Europe/London (GMT)</option>
              </select>
            </div>
          </div>
        </CardContent>
        <CardFooter class="justify-end">
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>

    <!-- Notifications -->
    <div v-if="activeTab === 'notifications'">
      <Card>
        <CardHeader>
          <CardTitle class="text-base">Email Notifications</CardTitle>
        </CardHeader>
        <CardContent class="pt-0">
          <div class="flex flex-col">
            <div
              v-for="(item, i) in notifications"
              :key="item.label"
            >
              <Separator v-if="i > 0" />
              <div class="flex items-center justify-between py-4">
                <div>
                  <p class="text-sm font-medium text-ink">{{ item.label }}</p>
                  <p class="text-xs text-muted">{{ item.desc }}</p>
                </div>
                <Switch v-model="item.enabled" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Security -->
    <div v-if="activeTab === 'security'" class="flex flex-col gap-5">
      <Card>
        <CardHeader>
          <CardTitle class="text-base">Password &amp; Authentication</CardTitle>
        </CardHeader>
        <CardContent class="flex flex-col gap-4">
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-medium text-muted">Current Password</label>
            <Input type="password" placeholder="Current password" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-medium text-muted">New Password</label>
            <Input type="password" placeholder="New password" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-xs font-medium text-muted">Confirm New Password</label>
            <Input type="password" placeholder="Confirm new password" />
          </div>
        </CardContent>
        <CardFooter class="justify-end">
          <Button>Update Password</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardContent class="flex items-center justify-between py-5">
          <div>
            <p class="font-medium text-ink">Two-Factor Authentication</p>
            <p class="mt-0.5 text-xs text-muted">Add an extra layer of security to your account</p>
          </div>
          <Button variant="secondary">Enable 2FA</Button>
        </CardContent>
      </Card>
    </div>

    <!-- Integrations -->
    <div v-if="activeTab === 'integrations'" class="grid gap-4 lg:grid-cols-2">
      <Card
        v-for="intg in integrations"
        :key="intg.name"
        class="flex items-center justify-between gap-4 p-5"
      >
        <div class="flex items-center gap-4">
          <span class="grid size-11 shrink-0 place-items-center rounded-2xl border border-line bg-panel-soft">
            <Plug class="size-4 text-muted" />
          </span>
          <div>
            <p class="font-medium text-ink">{{ intg.name }}</p>
            <p class="text-xs text-muted">{{ intg.desc }}</p>
          </div>
        </div>
        <Button
          :variant="intg.connected ? 'ghost' : 'default'"
          size="sm"
          :class="intg.connected ? 'text-coral hover:bg-coral/10 hover:text-coral' : ''"
          @click="intg.connected = !intg.connected"
        >
          {{ intg.connected ? 'Disconnect' : 'Connect' }}
        </Button>
      </Card>
    </div>
  </div>
</template>
