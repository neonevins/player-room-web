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
async function run() {
  try {
    await init()
  }catch (e) {
    console.log(e)
  }
}

run();
app
  .use(router)
  .use(ElementPlus)
  .mount('#app')


window.muted = true
document.body.onclick = () => window.muted = false
