//程序的入口文件，ts文件，是main.ts
//引入createApp函数，创建对应的应用，产生应用的实例对象
import { createApp } from 'vue'
//引入App组件(所有组件的父级组件，也叫根组件)
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import './assets/fonts/iconfont.css'

//创建app应用返回对应的实例对象，调用mount方法进行挂载到id为app的div上去(public下的index.html中)
const app = createApp(App)
installElementPlus(app)
app.use(store).use(router).mount('#app')