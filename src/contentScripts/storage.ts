import { useStorage } from '@vueuse/core'
import { Issue } from './types'

export const RECENT_REPO_TTL = 1000 * 60 * 30 // 30 minutes
const APP_NAME = 'doorcat'

export const repos = useStorage<{
  lastUpdated: number
  recent: string[]
  pinned: string[]
}>(`${APP_NAME}:repos`, {
  lastUpdated: 0,
  recent: [],
  pinned: [],
})

export const issues = useStorage<{
  recent: Issue[]
  pinned: Issue[]
}>(`${APP_NAME}:issues`, {
  recent: [],
  pinned: [],
})

export const pulls = useStorage<{
  recent: Issue[]
  pinned: Issue[]
}>(`${APP_NAME}:pulls`, {
  recent: [],
  pinned: [],
})

// TODO: move to options pages and pass by messages
export const options = ref({
  showAvatar: true,
  showOwnerName: true,
  githubDev: true,
})
