import Vue from 'vue'
import mall from '../views/mall.vue'
import pageOne from '../views/pageOne.vue'
import pageTwo from '../views/pageTwo.vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import user from '../views/user.vue'
import main from '../views/main.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  // 主路由
  {
    path:'/',
    component:main,
    redirect: '/Home',
    children:[
      { path: 'Home', component: Home },
    { path: 'user', component: user },
    { path: 'mall', component: mall  },
    { path: 'page1', component: pageOne  },
    { path: 'page2', component: pageTwo  },
    ]
  },
  {
    path:'/login',
    component:Login,
    name:'login',
    
  }
  ]
  const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
  })
  export default router