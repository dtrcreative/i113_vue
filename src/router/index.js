// Composables
import {createRouter, createWebHistory} from 'vue-router'
import userHelper from "@/components/auth/services/user.helper";

const routes = [
  {
    path: "/",
    name: 'login',
    component: () => import('@/layouts/default/Login.vue'),
    children: []
  },
  {
    path: '/callback',
    name: 'RedirectCallBack',
    component: () => import('@/views/RedirectCallBack.vue'),
  },
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
        name: 'events',
        component: () => import('@/components/microservices/events/EventsMainView.vue'),
        children: [
          {
            path: 'calendar',
            name: 'Calendar',
            component: () => import('@/components/microservices/events/calendar/CalendarView'),
          },
          {
            path: 'birthdays',
            name: 'Birthdays',
            component: () => import('@/components/microservices/events/birthdays/BirthdayView'),
          },
          {
            path: 'events',
            name: 'Events',
            component: () => import('@/components/microservices/events/events/EventsView'),
          },
        ]
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  if (userHelper.getUser() === null &&
    (to.name !== 'login') &&
    (to.name !== 'RedirectCallBack')) {
    next({name: 'login'})
  } else {
    if (userHelper.getUser() !== null && (userHelper.getUser().expires_at) < (new Date().getTime() / 1000) &&
      (to.name !== 'login') &&
      (to.name !== 'RedirectCallBack')) {
      userHelper.cleanUserData()
      userHelper.cleanStorage()
      next({name: 'login'})
    } else {
      next()
    }
  }
})

export default router
