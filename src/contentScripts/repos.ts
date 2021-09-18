import { RECENT_REPO_TTL } from './constants'
import { fetchRecentRepos, repositoryExists } from './fetch'
import { repos } from './storage'

export async function updateRecentRepos(force = false) {
  if (!force && repos.value.lastUpdated && repos.value.lastUpdated > Date.now() - RECENT_REPO_TTL)
    return repos

  repos.value.recent = await fetchRecentRepos()
  repos.value.lastUpdated = Date.now()

  return repos
}

export function togglePinnedRepo(repo: string) {
  if (!repos.value.pinned.includes(repo))
    repos.value.pinned.unshift(repo)
  else
    repos.value.pinned = repos.value.pinned.filter(x => x !== repo)
}

export async function togglePinnedRepoIfExists(repo: string) {
  if (!await repositoryExists(repo))
    return false
  togglePinnedRepo(repo)
  return true
}
