import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import { vFetch } from '../../src'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})
app.use(router)
app.mount('#app')

vFetch.interceptors.request.use((response) => {
  console.log(response)
  return response
}, (err) => {
  // console.log('err', err)
  return Promise.reject(err)
})
const instance = vFetch.create({
  baseURL: 'http://localhost:5001/',
})

instance({
  url: 'test',
}).then((res: any) => {
  // console.log(res)
  return res
})

// vFetch.get({
//   url: "http://localhost:5001/t"
// }).then(res => {
//   console.log(res)
// }, err => {
//   console.log(err)
// })
