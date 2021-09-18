import { createApp } from 'vue'
import NavBar from './views/NavBar.vue'
import { userid } from './env'
import { updateRecentRepos } from './repos'
import { scanIssue } from './issues'
import { refreshIssues } from './fetch'
import { log } from './log'
import { initContext } from '~/options'

(async() => {
  if (!userid)
    return

  const styleEl = document.createElement('link')
  styleEl.setAttribute('rel', 'stylesheet')
  styleEl.setAttribute('href', browser.runtime.getURL('dist/contentScripts/style.css'))
  document.head.appendChild(styleEl)

  log('Hello', userid)

  const nav = document.querySelector('nav')!
  createApp(NavBar).mount(nav)

  await initContext()

  // listen to github page loaded event
  document.addEventListener('pjax:end', () => scanIssue())
  scanIssue()

  await updateRecentRepos()
  refreshIssues()
})()
