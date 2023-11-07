import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from '../router/index'

createApp(App).use(ElementPlus)
createApp(App).use(router).mount('#app').$nextTick(() => {
  // Remove Preload scripts loading
  postMessage({ payload: 'removeLoading' }, '*')

  // Use contextBridge
  window.ipcRenderer.on('main-process-message', (_event: any, message: any) => {
    console.log(message)
  })
})
// createApp(App).mount('#app').$nextTick(() => {
//     // Remove Preload scripts loading
//     postMessage({ payload: 'removeLoading' }, '*')
  
//     // Use contextBridge
//     window.ipcRenderer.on('main-process-message', (_event: any, message: any) => {
//       console.log(message)
//     })
//   })



