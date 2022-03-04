import { createRouter,createWebHistory} from "vue-router";
import { checkLogin } from './utils.js'

// 路由信息
const routes = [
  {
    path: "/",
    name: "home",
    component:  () => import('../views/home/index.vue'),
    exact: true,
  },
  {
    path: "/create",
    name: "create",
    component:  () => import('../views/create/index.vue'),
  },
  {
    path: "/login",
    name: "login",
    component:  () => import('../views/login/index.vue'),
  },

];

// 导出路由
const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  console.log(to.name)
  if (!to.name) next('login')
  if (to.name !== 'login' ) {
    if (checkLogin().userName) {
      next()
    } else {
      alert('else')
      next('login')
    }
  }
  next()
})

export default router;
