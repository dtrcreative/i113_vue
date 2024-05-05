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
import VueParticles from "@tsparticles/vue3";
import {useLangsStore} from "@/components/settings/languages/js/languagesStore";
import {loadSlim} from "@tsparticles/slim";

export function registerPlugins(app) {
  loadFonts()
  app
    .use(router)
    .use(vuetify)
    .use(createPinia())
    .use(VueParticles, {
      init: async engine => {
        await loadSlim(engine);
      },
    })

  app.config.globalProperties.lang = useLangsStore()
  app.config.globalProperties.lang.init()
}
