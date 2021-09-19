import { RECENT_REPO_TTL } from './constants'
import { fetchRecentRepos, repositoryExists } from './fetch'
import { repos } from './storage'
import { Details } from './types'

export async function updateRecentRepos(force = false) {
  if (!force && repos.value.lastUpdated && repos.value.lastUpdated > Date.now() - RECENT_REPO_TTL)
    return repos
  const items = await fetchRecentRepos()
  const obj = {} as Details
  repos.value.recent = items
  repos.value.lastUpdated = Date.now()

  items.forEach((item) => {
    obj[item] = {
      alias: item,
    }
  })
  repos.value.details = obj
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

export function changeRepoName(repo: string) {
  // eslint-disable-next-line no-alert
  const customedName = prompt('Enter your custom repository name:')
  if (customedName && repos.value.details[repo])
    // 需要赋值新对象才能触发 watch 重新 render 更新名字
    repos.value.details[repo] = { alias: customedName }
}
