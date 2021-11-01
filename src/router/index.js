import Vue from 'vue'

// import VueRouter from 'vue-router'
import VueRouter from '../vuerouter/index.js'
import Index from '../pages/index/Index.vue'
import Home from '../pages/home/index.vue'
import Login from '../pages/login/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Index
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/login',
    component: Login
  }
]
const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router 