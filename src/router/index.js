// Composables
import {createRouter, createWebHistory} from 'vue-router'
import userService from "@/components/auth/services/user.service";

const routes = [
  // {
  //   path: "/",
  //   name: 'login',
  //   component: () => import('@/layouts/default/Login.vue'),
  //   children: []
  // },
  // {
  //   path: '/callback',
  //   name: 'RedirectCallBack',
  //   component: () => import('@/views/RedirectCallBack.vue'),
  // },
  {
    path: '/main',
    name: 'Main',
    component: () => import('@/layouts/default/Main.vue'),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
      {
        path: '/profile',
        name: 'Profile',
        component: () => import('@/views/Profile.vue'),
      },
      {
        path: '/settings',
        name: 'Settings',
        component: () => import('@/views/Settings.vue'),
      },
    ],
  },

  {
    path: '/panda',
    component: () => import('@/layouts/default/Main.vue'),
    children: [
      {
        path: '',
        name: 'Panda',
        component: () => import('@/components/microservices/panda/PandaMainView.vue'),
      },
    ]
  },
  {
    path: "/events",
    component: () => import('@/layouts/default/Main.vue'),
    children: [
      {
        path: '',
        name: 'Events',
        component: () => import('@/components/microservices/events/EventsMainView.vue'),
      },
    ]
  },
  {
    path: "/",
    component: () => import('@/pages/AuthPage.vue'),
    children: [
      {
        path: '/',
        name: 'Login',
        component: () => import('@/components/auth2/LoginView.vue'),
      },
      {
        path: '/reg',
        name: 'reg',
        component: () => import('@/components/auth2/RegView.vue'),
      },
      {
        path: '/reinit',
        name: 'reinit',
        component: () => import('@/components/auth2/ui/RestorePasswordView'),
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  // if (userService.getUser() === null &&
  //   (to.name !== 'login') &&
  //   (to.name !== 'RedirectCallBack')) {
  //   next({name: 'login'})
  // } else {
  //   if (userService.getUser() !== null && (userService.getUser().expires_at) < (new Date().getTime() / 1000) &&
  //     (to.name !== 'login') &&
  //     (to.name !== 'RedirectCallBack')) {
  //     userService.cleanUserData()
  //     userService.cleanStorage()
  //     next({name: 'login'})
  //   } else {
      next()
    // }
  // }
})

export default router
