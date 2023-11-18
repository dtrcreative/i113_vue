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
      {
        path: '',
        name: 'events',
        component: () => import('@/components/microservices/events/EventsMainView.vue'),
        children:[
          {path: 'birthdays',  name: 'Birthdays', component: () => import('@/components/microservices/events/UI/birthdays/BirthdayView'),},
          {path: 'events',  name: 'Events', component: () => import('@/components/microservices/events/UI/events/EventsView'),},
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
  // console.log(userHelper.isUserExist())
  // if(userHelper.isUserExist()){
  //   console.log("expires " + ((userHelper.getUser().expires_at) > (new Date().getTime() / 1000) && (to.name !== 'Home')))
  //   // if((userHelper.getUser().expires_at) > (new Date().getTime() / 1000) && (to.name !== 'Home')) {
  //   //   next({name: 'Home'})
  //   //   userHelper.cleanLocalStorage()
  //   // }else{
  //   //   next()
  //   // }
  // }else{
  //   next({name: 'Home'})
  // }
  console.log(!userHelper.isUserExist())
  // if(!userHelper.isUserExist()){
  //   console.log("redirect")
  //   next({name: 'Home'})
  // }
  next()
})

export default router
