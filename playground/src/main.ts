import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
// import { monitorPef } from 'lazy-js-utils'
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

// console.log(randomDate())
// monitorPef()
// window.onclick = () => {
//   copy('hello')
// }
// timeCost(() => {
//   for (let i = 0; i < 1000; i++)
//     log(i)
// })

// console.log(calNum.sub(0.1, 0.2, 0.2))
// console.log(calNum.mul(0.1, 0.2, 0.2))

// console.log(formateNum(123456789.123456789, 3, 'floor'))
// console.log(uppercaseNum(-122.12))
// console.log(trim('  g  xx ', 'all').length)
// console.log(getDevice())
// getLocation().then((res) => {
//   console.log('res:', res)
// }).catch((err) => {
//   console.log('error:', err)
// })
// console.log(uuid())
// getTiming()
// console.log(formateDate(new Date(), 'yyyy-MM-dd hh:mm:ss'))
// console.log(uuid(8, 16))
// jsCookie.set('test', 'test', 1)
// console.log(jsCookie.get('test'))
// jsCookie.remove('test')
// console.log(jsCookie.get('test'))

// vFetch.get({
//   url: "http://localhost:5001/t"
// }).then(res => {
//   console.log(res)
// }, err => {
//   console.log(err)
// })

// const axios = vFetch.create({
//   baseURL: 'http://localhost:5001/t',
// })
// console.log(axios)
// axios({
//   method: 'GET',
//   url: 'nihao',
// }).then((res: any) => {
//   console.log(res)
// })

// axios({
//   method: 'GET',
//   url: 'nihao',
// }).then((res: any) => {
//   console.log(res)
// })

// axios({
//   method: 'GET',
//   url: 'nihao1',
// }).then((res: any) => {
//   console.log(res)
// })
