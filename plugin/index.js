import TheRoot from '../components/TheRoot.js'
import { module }from '../store'
import { mediaModule } from '../store/media'
import { routes } from '../router/routes'
import registerPlugin from './registerPlugin'

const MAIN_MODULE_KEY = 'wp_rest_content'
const MEDIA_MODULE_KEY = 'wpr_media'

export default {
  async install (Vue, options) {
    try {
      // Config
      // Is it proper
      if (!('config' in options)) {
        throw new Error('No config provided!')
      }
      if (!('url' in options.config)) {
        throw new Error('No API\'s URL provided!')
      }
      // Register it in app
      Vue.prototype.$wp = {}
      Vue.prototype.$wp.config = options.config;

      // Do we have store?
      if (!('store' in options)) {
        throw new Error('No VueX store provided in config!')
      }
      const store = options.store

      // Global access to TheRoot component
      Vue.component('Sections', TheRoot)

      // Register VueX modules
      store.registerModule(MAIN_MODULE_KEY, module)
      store.registerModule(MEDIA_MODULE_KEY, mediaModule)

      // Do we have router?
      if (!('router' in options)) {
        throw new Error('No router instance provided in config!')
      }

      const router = options.router
      router.addRoutes(routes)

      await Promise.all([
        store.dispatch('wp_rest_content/loadMenu', {
          menuSlugs: options.config.menus,
          lang: 'pl'
        }),
        store.dispatch('wp_rest_content/loadMeta', {
          lang: 'pl'
        }),
        store.dispatch('wpr_media/loadMedia', {
          lang: 'pl'
        })
      ])

      if('plugins' in options) {
        // Register plugins
        if(Array.isArray(options.plugins)) {
          for(let plugin of options.plugins) {
            registerPlugin(Vue, plugin)
          }
        } else {
          registerPlugin(Vue, options.plugins)
        }
      }
    } catch(e) {
      console.error(e.message)
    }
  }
}