import { createApp } from 'vue'
import App from './Menu.vue'
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
  const container = document.createElement('div')
  nav.prepend(container)
  createApp(App).mount(container)

  await updateRecentRepos()
})()
