// Composables
import {createRouter, createWebHistory} from 'vue-router'
import userHelper from "@/components/auth/services/user.helper";

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

// router.beforeEach((to, from, next) => {
//   if((userHelper.getUser().expires_at) < (new Date().getTime() / 1000) && (to.name !== 'Home')) {
//     next({name: 'Home'})
//     userHelper.cleanLocalStorage()
//   }
//   else next()
// })

export default router
