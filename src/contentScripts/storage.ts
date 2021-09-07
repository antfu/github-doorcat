import { useStorage } from '@vueuse/core'
import { fetchRecentRepos } from './fetch'

const RECENT_REPO_TTL = 1000 * 60 * 30 // 30 minutes

export const pinnedRepos = useStorage<string[]>('gh-dashboard:pinned-repos', [])
export const recentRepos = useStorage<{
  lastUpdated: number
  repos: string[]
}>('gh-dashboard:recent-repos', {
  lastUpdated: 0,
  repos: [],
})

// TODO: move to options pages and pass by messages
export const options = ref({
  showAvatar: true,
  showOwnerName: false,
  githubDev: true,
})

export async function updateRecentRepos(force = false) {
  if (!force && recentRepos.value.lastUpdated && recentRepos.value.lastUpdated > Date.now() - RECENT_REPO_TTL)
    return recentRepos

  const repos = await fetchRecentRepos()
  recentRepos.value = {
    lastUpdated: Date.now(),
    repos,
  }
  return recentRepos
}
