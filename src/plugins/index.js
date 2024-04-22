/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import {loadFonts} from './webfontloader'
import {createPinia} from 'pinia'
import vuetify from './vuetify'
import router from '../router'
// import {useLangStore} from "@/components/settings/language/js/languageStore";

export function registerPlugins(app) {
  loadFonts()
  app
    .use(router)
    .use(vuetify)
    .use(createPinia())

  // app.config.globalProperties.lang = useLangStore()
  // app.config.globalProperties.lang.init()
}
