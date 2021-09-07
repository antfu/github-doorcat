import { issues, pulls } from './storage'
import { Issue } from './types'

const MAX_RECENT_ISSUES = 20

export function scanIssue() {
  const [owner, name, type, code] = window.location.pathname.slice(1).split(/\//g)

  if (!['issues', 'pull'].includes(type) || !code)
    return

  const repo = `${owner}/${name}`
  const title = document.querySelector('.js-issue-title')?.textContent || ''
  const stateEl = document.querySelector('.State')

  if (!title || !stateEl)
    return

  const state = stateEl.classList.contains('State--open')
    ? 'open'
    : stateEl.classList.contains('State--closed')
      ? 'closed'
      : stateEl.classList.contains('State--merged')
        ? 'merged'
        : 'unknown'

  updateIssue({
    id: `${repo}/${type}/${code}`,
    state,
    repo,
    number: +code,
    type: type as any,
    title,
    lastUpdated: Date.now(),
  })
}

function updateIssue(issue: Issue) {
  const existing = [...issues.value.recent, ...pulls.value.recent].find(i => i.id === issue.id)

  if (existing)
    return Object.assign(existing, issue)

  const target = issue.type === 'issues'
    ? issues.value.recent
    : pulls.value.recent

  target.unshift(issue)
  if (target.length > MAX_RECENT_ISSUES)
    target.splice(MAX_RECENT_ISSUES, target.length - MAX_RECENT_ISSUES)
}

export function togglePinnedIssue(issue: Issue) {
  const target = issue.type === 'issues'
    ? issues.value
    : pulls.value

  if (target.pinned.find(i => i.id === issue.id))
    target.pinned = target.pinned.filter(i => i.id !== issue.id)
  else
    target.pinned.unshift(issue)
}
