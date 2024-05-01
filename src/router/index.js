// Composables
import {createRouter, createWebHistory} from 'vue-router'
import {getUser} from "@/store/user.service";

const routes = [

  {
    path: '/main',
    name: 'Main',
    component: () => import('@/layouts/default/Main.vue'),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/pages/HomePage.vue'),
      },
      {
        path: '/profile',
        name: 'Profile',
        component: () => import('@/pages/ProfilePage.vue'),
      },
      {
        path: '/settings',
        name: 'Settings',
        component: () => import('@/pages/SettingsPage.vue'),
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
    path: "/events_new",
    component: () => import('@/layouts/default/Main.vue'),
    children: [
      {
        path: '',
        name: 'Events_new',
        component: () => import('@/components/microservices/events_new/EventsMainView.vue'),
      },
    ]
  },
  {
    path: "/",
    component: () => import('@/pages/AuthPage.vue'),
    children: [
      {
        path: '/',
        name: 'login',
        component: () => import('@/components/auth/LoginView.vue'),
      },
      {
        path: '/signup',
        name: 'signup',
        component: () => import('@/components/auth/SignupView.vue'),
      },
      {
        path: '/reinit',
        name: 'reinit',
        component: () => import('@/components/auth/ui/RestorePasswordView'),
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  let user = getUser();

  if(
    user === null &&
    (to.name !== 'login') &&
    (to.name !== 'signup') &&
    (to.name !== 'reinit'))
  {
    next({name: 'login'})
  }
  if(
    user !== null &&
    user.expireAt<(new Date().getTime() / 1000) &&
    (to.name !== 'login'))
  {
    next({name: 'login'})
  } else{
    next()
  }
})

export default router
