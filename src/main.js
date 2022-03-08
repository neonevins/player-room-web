import { createApp } from 'vue'
import App           from './App.vue'
import router        from "./router"
import ElementPlus   from 'element-plus'
import 'element-plus/dist/index.css'
import { getToken }  from "./utils"

const app = createApp(App)

const init = async () => {
  let token = await getToken()
  console.log(token)
}

try {
  await init()
}catch (e) {
  console.log(e)
}

app
  .use(router)
  .use(ElementPlus)
  .mount('#app')
