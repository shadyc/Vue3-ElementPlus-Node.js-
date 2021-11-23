import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import login from '../views/login.vue'
import Home from '../views/Home.vue'
import welcome from '../components/welcome.vue'
import Users from '../components/user/Users.vue'
import DataModidy from '../components/dataStatistics/dataModify.vue'
import writePromise from '../components/promisePractice/writePromise.vue'
import pageTest from '../components/dataStatistics/pageTest.vue'
import limitsList from '../components/limitsManage/limitsList.vue'
import roleList from '../components/limitsManage/roleList.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    //重定向
    redirect: '/login',
    // component:  () => import('../views/login.vue')
    component: login//component两种写法
  },
  {
    path: '/login',
    name: 'login',
    // component: () => import('../views/login.vue'),
    component: login,//component两种写法
      meta: {
        title: '登录'
      }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/welcome', 
    children: [{path: '/welcome', component: welcome},
               {path: '/users', component: Users},
               {path: '/dataModidy', component: DataModidy},
               {path: '/writePromise', component: writePromise},
               {path: '/pageTest', component: pageTest},
               {path: '/rights', component: limitsList},
               {path: '/roles', component: roleList},]

  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//路由导航守卫，接收一个回调函数，三个参数分表代表to:通往的页面，from:从哪个路径跳转而来，next:跳转到哪个页面
// next(/login) 强制跳转
router.beforeEach((to,from,next) => {
      if(to.path === '/login') return next()
      //获取token
      let token = window.localStorage.getItem('token')
      if(!token)
      return next('/login') 
      next()
})

export default router
