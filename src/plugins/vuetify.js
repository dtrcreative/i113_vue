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
    'primary-darken-1': '#3700B3',
    secondary: '#03DAC6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
  image: {

  }
}
const darkTheme = {
  dark: true,
  colors: {
    background: '#111311',
    surface: 'rgba(30,38,30,0.63)',
    primary: '#00800b',
    'primary-darken-1': '#005406',
    secondary: '#85d269',
    'secondary-darken-1': '#588845',
    error: '#B00020',
    info: '#50d5b2',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
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


