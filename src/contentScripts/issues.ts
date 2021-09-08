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

export function togglePinnedIssue(issue: Issue) {
  const target = getTargetCollection(issue)

  if (target.pinned.find(i => i.id === issue.id))
    target.pinned = target.pinned.filter(i => i.id !== issue.id)
  else
    target.pinned.unshift(issue)
}

export function removeIssue(issue: Issue) {
  const target = getTargetCollection(issue)
  target.pinned = target.pinned.filter(i => i.id !== issue.id)
  target.recent = target.recent.filter(i => i.id !== issue.id)
}

export function updateIssue(issue: Issue, hoist = true) {
  const target = getTargetCollection(issue)
  const existing = target.recent.find(i => i.id === issue.id)

  if (existing) {
    Object.assign(existing, issue)
    if (hoist) {
      const index = target.recent.indexOf(existing)
      target.recent.splice(index, 1)
      target.recent.unshift(existing)
    }
  }
  else {
    target.recent.unshift(issue)
    if (target.recent.length > MAX_RECENT_ISSUES)
      target.recent.splice(MAX_RECENT_ISSUES, target.recent.length - MAX_RECENT_ISSUES)
  }
}

function getTargetCollection(issue: Issue) {
  return issue.type === 'issues'
    ? issues.value
    : pulls.value
}
