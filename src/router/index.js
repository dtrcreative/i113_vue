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
    path: "/events",
    component: () => import('@/layouts/default/Main.vue'),
    children: [
      {path: '',  name: 'Events', component: () => import('@/views/EventsView.vue'),},
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
