import { createApp } from 'vue'
import Repos from './views/Repos.vue'
import { userid } from './env'
import { updateRecentRepos } from './storage'

(async() => {
  if (!userid)
    return

  const styleEl = document.createElement('link')
  styleEl.setAttribute('rel', 'stylesheet')
  styleEl.setAttribute('href', browser.runtime.getURL('dist/contentScripts/style.css'))
  document.head.appendChild(styleEl)

  console.log('Hi', userid)

  const nav = document.querySelector('nav')!
  const repos = document.createElement('div')
  nav.prepend(repos)
  createApp(Repos).mount(repos)

  await updateRecentRepos()
})()
