import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'
import Home from '../views/Home'
Vue.use(VueRouter)

const adminRules = {path:'/admin',component: () => import('@/views/Admin')}
const activityRules = {path:'/activity',component: () => import('@/views/Activity')}
const roleRules = {path:'/role',component: () => import('@/views/Role')}
const userRules = {path:'/user',component: () => import('@/views/User')}

const rulesMapping = {
  '/admin':adminRules,
  '/role':roleRules,
  '/activity':activityRules,
  '/user':userRules
}

const routes = [
  {
    path:'/login',
    component:() => import('@/views/login')
  },
  {
    path:'/',
    component:() => import('@/layout/layout'),
    redirect:'/admin',
    children:[
      {
        path:'/home',
        component:Home
      }
    ]
  }
]

// const originalPush = VueRouter.prototype.push
// const originalReplace = VueRouter.prototype.replace

// VueRouter.prototype.push = function push (location, onResolve, onReject) {
//   if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
//   return originalPush.call(this, location).catch(err => err)
// }

// VueRouter.prototype.replace = function push (location, onResolve, onReject) {
//   if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
//   return originalReplace.call(this, location).catch(err => err)
// }


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to,from,next) => {
  if(to.path === '/login'){
    console.log('logins')
    next()
  }else{
    const token  = sessionStorage.getItem('token')
    if(!token){
      next('/login')
    }else{
      next()
    }
  }
})


export function dynamicRouter(){
  const currentRoutes = router.options.routes
  const menuList = store.state.adminInfo.menuList
  menuList.forEach((item) => {
    const temp = rulesMapping[item.page_url]
    currentRoutes[1].children.push(temp)
  })
  console.log(currentRoutes)
  router.addRoutes(currentRoutes)

}

export default router
