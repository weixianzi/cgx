import { createRouter, createWebHistory } from 'vue-router'

let routes = [
  {
    path:"/login",
    component:()=>import(/* webpackChunkName:"login" */"@/pages/login/index.vue")
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
