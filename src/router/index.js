import Vue from 'vue'
import VueRouter from 'vue-router'



Vue.use(VueRouter)




const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('../views/Home.vue')
      },
      {
        path: 'Nav',
        name: 'Nav',
        component: () => import('../views/Nav.vue')
      },
      {
        path: 'qr',
        name: 'QR',
        component: () => import('../views/QR.vue')
      },
      {
        path: 'life',
        name: 'Life',
        component: () => import('../views/Life.vue')
      },
      {
        path: 'my',
        name: 'My',
        component: () => import('../views/My.vue')
      },

    ]
  },
  {
    path: '/subway',
    name: 'Subway',
    component: () => import('../views/subway.vue')
  },
  {
    path: '/real',
    name: 'Real',
    component: () => import('../views/Real.vue')
  },
  {
    path: '/make',
    name: 'Make',
    component: () => import('../views/Make.vue')
  },
  {
    path: '/service',
    name: 'Service',
    component: () => import('../views/Service.vue')
  },
  {
    path: '/customer',
    name: 'Customer',
    component: () => import('../views/Customer.vue')
  },
  
  {
    path: '*',
    redirect: {
      name: 'QR'
    }
  }
]

const router = new VueRouter({
  routes
})

export default router

