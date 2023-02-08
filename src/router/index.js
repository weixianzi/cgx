import { createRouter, createWebHistory } from 'vue-router'

let routes = [
  {
    path:"/login",
    component:()=>import(/* webpackChunkName:"login" */"@/pages/login/index.vue")
  },
  {
    path:"/",
    component:()=>import(/* wepackChunkName:"home" */"@/components/container/index.vue")
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
