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

const lightTheme = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#dcdcdc',
    primary: '#6200EE',
    secondary: '#03DAC6',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
  image: {
    banner: '@/assets/img/vbanner-green.jpg'
  }
}
const darkTheme = {
  dark: true,
  colors: {
    background: '#111311',
    surface: '#1E261EA0',
    primary: '#00800b',
    secondary: '#85d269',
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
    defaultTheme: 'darkTheme',
    themes: {
      darkTheme, lightTheme
    },
  },
})


