import { h } from 'vue'
import type { App } from 'vue'
import DefaultTheme from 'vitepress/theme'
import CustomFooter from './components/CustomFooter.vue'
import { BoltIcon, LightBulbIcon, BookOpenIcon } from '@heroicons/vue/24/outline'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => h(CustomFooter),
    })
  },
  enhanceApp({ app }: { app: App }) {
    app.component('BoltIcon', BoltIcon)
    app.component('LightBulbIcon', LightBulbIcon)
    app.component('BookOpenIcon', BookOpenIcon)
  },
}
