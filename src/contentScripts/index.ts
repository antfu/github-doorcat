import { createApp } from 'vue'
import Repos from './views/Repos.vue'
import Pulls from './views/Pulls.vue'
import Issues from './views/Issues.vue'
import { userid } from './env'
import { updateRecentRepos } from './storage'
import { scanIssue } from './issues'

(async() => {
  if (!userid)
    return

  const styleEl = document.createElement('link')
  styleEl.setAttribute('rel', 'stylesheet')
  styleEl.setAttribute('href', browser.runtime.getURL('dist/contentScripts/style.css'))
  document.head.appendChild(styleEl)

  console.log('Hi', userid)

  const nav = document.querySelector('nav')!

  const pullsEl = nav.children[1] as HTMLLinkElement
  const issuesEl = nav.children[2] as HTMLLinkElement
  nav.removeChild(pullsEl)
  nav.removeChild(issuesEl)

  const issues = document.createElement('div')
  const pulls = document.createElement('div')
  const repos = document.createElement('div')
  nav.prepend(issues)
  nav.prepend(pulls)
  nav.prepend(repos)
  createApp(Issues, { href: issuesEl.href }).mount(issues)
  createApp(Pulls, { href: pullsEl.href }).mount(pulls)
  createApp(Repos).mount(repos)

  // listen to github page loaded event
  document.addEventListener('pjax:end', () => scanIssue())
  scanIssue()

  await updateRecentRepos()
})()
