import { createRouter,createWebHashHistory} from "vue-router";
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
    path: "/playRoom",
    name: "playRoom",
    component:  () => import('../views/playRoom/index.vue'),
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
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  console.log(to.name)
  if (!to.name) next('login')
  if (to.name !== 'login' ) {
    if (checkLogin().userName) {
      next()
    } else {
      next('login')
    }
    return;
  }
  next()
})

export default router;
