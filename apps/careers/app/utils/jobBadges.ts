import type { JobLocationType } from "~/composables/useJobs"

export type JobStatus = "active" | "draft" | "closed"

export const JOB_STATUS_COLORS: Record<JobStatus, string> = {
  active: "bg-mint text-green",
  draft: "bg-[#fff3e0] text-[#b35a00]",
  closed: "bg-line text-muted",
}

export const JOB_LOCATION_TYPE_COLORS: Record<JobLocationType, string> = {
  remote: "bg-mint text-green",
  hybrid: "bg-[#e8eeff] text-[#3b55c4]",
  "on-site": "bg-paper text-muted",
}
