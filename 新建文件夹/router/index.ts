// import { createRouter, createWebHashHistory,RouteRecordRaw} from 'vue-router'
// import Home from '../src/components/home.vue'
// const routes : Array<RouteRecordRaw>=[
//     {
//         path:'/',
//         component:'Home',
//         redirect:'/'
// }
// ]
// export default createRouter({
//     history: createWebHashHistory(),
//     routes
//     })
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',   // 别名，可以定义很多个
    component: () => import('../src/components/login/login.vue'),
    // 重定向
    // redirect: '/welcome',
      },
      {
       path:'/home',
       component: ()=>import('../src/components/home.vue')
      }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router