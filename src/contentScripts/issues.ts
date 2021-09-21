import { issues, pulls } from './storage'
import { options } from '~/options'
import { Issue } from '~/types'

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
  const pinned = target.pinned.find(i => i.id === issue.id)

  if (pinned) {
    if (options.value.unpinClosed && isClosed(issue))
      togglePinnedIssue(issue)
    else
      Object.assign(pinned, issue)
  }

  if (existing) {
    if (options.value.excludeClosed && isClosed(issue)) {
      const index = target.recent.indexOf(existing)
      target.recent.splice(index, 1)
      return
    }

    Object.assign(existing, issue)
    if (hoist) {
      const index = target.recent.indexOf(existing)
      target.recent.splice(index, 1)
      target.recent.unshift(existing)
    }
  }
  else {
    if (options.value.excludeClosed && isClosed(issue))
      return

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

export function isClosed(issue: Issue) {
  return issue.state === 'closed' || issue.state === 'merged'
}

export function getRecent(type: 'issues' | 'pull') {
  const target = type === 'issues'
    ? issues.value
    : pulls.value
  const pinnedIds = target.pinned.map(i => i.id)
  return target.recent
    .filter(
      (i) => {
        if (pinnedIds.includes(i.id))
          return false
        if (options.value.excludeClosed && isClosed(i))
          return false
        return true
      })
    .slice(0, 10)
}
