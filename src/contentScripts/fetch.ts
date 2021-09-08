import pLimit from 'p-limit'
import { RECENT_ISSUE_TTL } from './constants'
import { userid } from './env'
import { updateIssue } from './issues'
import { issues, pulls } from './storage'
import { Issue } from './types'

export interface Activity {
  repo: {
    name: string
  }
}

export async function fetchRecentActivity(pages = 100): Promise<Activity[]> {
  return await fetch(`https://api.github.com/users/${userid}/events?per_page=${pages}`)
    .then(r => r.json())
}

export async function fetchIssueUpdate(issue: Issue, force = false) {
  if (!force && issue.lastUpdated && issue.lastUpdated > Date.now() - RECENT_ISSUE_TTL)
    return issue

  const data = await fetch(`https://api.github.com/repos/${issue.repo}/issues/${issue.number}`)
    .then(r => r.json())

  if (data?.state) {
    issue.title = data.title
    issue.state = data.state
    issue.lastUpdated = Date.now()
    updateIssue(issue, false)
  }
  return issue
}

export async function fetchRecentRepos() {
  const activity = await fetchRecentActivity(100)

  const repos = new Set<string>()
  activity.forEach(i => repos.add(i.repo.name))

  return Array.from(repos)
}

export async function refreshIssues() {
  const limit = pLimit(5)

  const all = [
    ...issues.value.recent,
    ...issues.value.pinned,
    ...pulls.value.recent,
    ...pulls.value.pinned,
  ]

  await Promise.allSettled(all.map(i => limit(() => fetchIssueUpdate(i))))

  triggerRef(issues)
  triggerRef(pulls)
}
