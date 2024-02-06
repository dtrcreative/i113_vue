/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify} from 'vuetify'

const light = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#dcdcdc',
    primary: 'rgb(48,185,58)',
    secondary: 'rgba(74,126,58,0.44)',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
  image: {
    banner: '@/assets/img/vbanner-green.jpg'
  }
}
const dark = {
  dark: true,
  colors: {
    background: '#111311',
    surface: '#1E261EA0',
    primary: 'rgba(0,128,11,0.28)',
    secondary: '#3c6c2a',
    error: '#B00020',
    info: '#50d5b2',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
  image: {
    banner: '@/assets/img/vbanner-green.jpg'
  }
}

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark, light
    },
    icons:{
      defaultSet: 'mdi'
    }
  },
})


