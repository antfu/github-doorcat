import pLimit from 'p-limit'
import { headers } from '../options'
import { RECENT_ISSUE_TTL } from './constants'
import { userid } from './env'
import { removeIssue, updateIssue } from './issues'
import { issues, pulls } from './storage'
import { Issue } from './types'

const API_ENTRY = 'https://api.github.com'

export interface Activity {
  repo: {
    name: string
  }
}

export async function fetchRecentActivity(pages = 100): Promise<Activity[]> {
  return await fetch(
    `${API_ENTRY}/users/${userid}/events?per_page=${pages}`,
    {
      headers: headers.value,
    },
  )
    .then(r => r.json())
}

export async function fetchIssueUpdate(issue: Issue, force = false) {
  if (!force && issue.lastUpdated && issue.lastUpdated > Date.now() - RECENT_ISSUE_TTL)
    return issue

  const response = await fetch(
    `${API_ENTRY}/repos/${issue.repo}/issues/${issue.number}`,
    {
      headers: headers.value,
    },
  )

  if (response.status === 410) {
    removeIssue(issue)
    return issue
  }

  const data = await response.json()

  if (data?.state) {
    issue.title = data.title
    issue.state = data.state
    issue.lastUpdated = Date.now()
    updateIssue(issue, false)
  }

  return issue
}

export async function fetchRecentRepos() {
  try {
    const activity = await fetchRecentActivity(100)
    const repos = new Set<string>()
    activity.forEach(i => repos.add(i.repo.name))
    return Array.from(repos)
  }
  catch (e) {
    console.error('[Doorcat]', e)
    return []
  }
}

export async function refreshIssues() {
  const limit = pLimit(5)

  const all = [
    ...issues.value.recent,
    ...issues.value.pinned,
    ...pulls.value.recent,
    ...pulls.value.pinned,
  ]

  try {
    await Promise.allSettled(all.map(i => limit(() => fetchIssueUpdate(i))))
  }
  catch (e) {
    console.error('[Doorcat]', e)
  }

  triggerRef(issues)
  triggerRef(pulls)
}

export async function repositoryExists(repository: string) {
  try {
    const response = await fetch(
      `${API_ENTRY}/repos/${repository}`,
      {
        headers: headers.value,
      },
    )
    return response.status === 200
  }
  catch (e) {
    return false
  }
}
