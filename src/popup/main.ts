import { createApp } from 'vue'
import App from './Popup.vue'
import '../styles'
import { initContext } from '~/options'

initContext('popup')

const app = createApp(App)
app.mount('#app')
