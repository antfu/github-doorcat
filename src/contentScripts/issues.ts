import { issues } from './storage'
import { Issue } from './types'

const MAX_RECENT_ISSUES = 20

export function scanIssue() {
  const [owner, name, type, code] = window.location.pathname.slice(1).split(/\//g)

  if (!['issues', 'pull'].includes(type) || !code)
    return

  const repo = `${owner}/${name}`
  const title = document.querySelector('.js-issue-title')?.textContent || ''
  const stateEl = document.querySelector('.State')!

  const state = stateEl.classList.contains('State--open')
    ? 'open'
    : stateEl.classList.contains('State--closed')
      ? 'closed'
      : stateEl.classList.contains('State--merged')
        ? 'merged'
        : 'unknown'

  updateIssue({
    state,
    repo,
    number: +code,
    type: type as any,
    title,
    lastUpdated: Date.now(),
  })
}

function updateIssue(issue: Issue) {
  const existing = [...issues.value.pinned, ...issues.value.recent].find(i => i.repo === issue.repo && i.number === issue.number)

  if (existing)
    Object.assign(existing, issue)
  else
    issues.value.recent.unshift(issue)

  if (issues.value.recent.length > MAX_RECENT_ISSUES)
    issues.value.recent.splice(MAX_RECENT_ISSUES, issues.value.recent.length - MAX_RECENT_ISSUES)
}
