import { useStorage } from '@vueuse/core'
import { fetchRecentRepos } from './fetch'

const RECENT_REPO_TTL = 1000 * 60 * 30 // 30 minutes

export const repos = useStorage<{
  lastUpdated: number
  recent: string[]
  pinned: string[]
}>('gh-dashboard:repos', {
  lastUpdated: 0,
  recent: [],
  pinned: [],
})

// TODO: move to options pages and pass by messages
export const options = ref({
  showAvatar: true,
  showOwnerName: false,
  githubDev: true,
})

export async function updateRecentRepos(force = false) {
  if (!force && repos.value.lastUpdated && repos.value.lastUpdated > Date.now() - RECENT_REPO_TTL)
    return repos

  repos.value.recent = await fetchRecentRepos()
  repos.value.lastUpdated = Date.now()

  return repos
}
