// Composables
import {createRouter, createWebHistory} from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Main.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: '/callback',
        name: 'RedirectCallBack',
        component: () => import('@/views/RedirectCallBack.vue'),
      }
    ],
  },
  {
    path: "/profile",
    component: () => import('@/layouts/default/Main.vue'),
    children: [
      {path: '',  name: 'Profile', component: () => import('@/views/ProfileView.vue'),},
    ]
  },
  {
    path: "/birthdays",
    component: () => import('@/layouts/default/Main.vue'),
    children: [
      {path: '',  name: 'Profile', component: () => import('@/views/BirthdayView.vue'),},
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
