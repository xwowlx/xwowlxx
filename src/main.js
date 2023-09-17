import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
// import {Row,Button} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
import './api/mock'
Vue.config.productionTip = false
Vue.use(ElementUI);
import Cookie from 'js-cookie';
// 按需引入
// Vue.use(Row)
// Vue.use(Button)
// 添加全局导航守卫
router.beforeEach((to, from,next) => {
  // ...
  // 返回 false 以取消导航
  const token=Cookie.get("token")
  if(!token && to.name!=='login' ){
   next({name:'login'})
  }else if(token&&to.name==='login'){
    next({name:'home'})
  }else{
    next()
  }
 
})
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
