import { initContext } from '~/options'

initContext('background')

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error
  import('/@vite/client')
  import('./contentScriptHMR')
}
