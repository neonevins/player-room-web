<script setup>
import { ref } from 'vue';
import {useRouter} from 'vue-router'


let activeName = ref('hots')

const router = useRouter()

const navTo = function (name) {
  console.log(name)
  router.push({name})
}

</script>

<template>
  <div id="header">
    <div class="main">
      <div class="logo">LOGO</div>
      <div :class="{tab: true, active: $route.name === 'home'}" @click="navTo('home')">广场</div>
      <div :class="{tab: true, active: $route.name === 'create'}" @click="navTo('create')">创建</div>
      <div class="btns">
        <el-button class="register" type="primary" round>注册</el-button>
        <el-button class="login" type="primary" round>登录</el-button>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
@media screen and (max-width: 640px) {

}

#header {
  height: 80px;
  background-color: #fff;
  box-shadow: 0 0 10px #ddd;

}
.main {
  position: relative;
  margin: 0 auto;
  width: 1366px;
  height: 100%;
  .logo {
    float: left;
    font-size: 30px;
    line-height: 80px;
    width: 100px;
  }
  .tab {
    font-size: 18px;
    float: left;
    margin: 0 20px;
    line-height: 80px;
    cursor: pointer;
  }
  .active {
    border-bottom: 2px #222 solid;
  }
  .btns {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    .el-button {
      width: 100px;
      height: 40px;
      margin-top: 20px;
    }
    .register {
      background-color: transparent;
      color: #222;
      border-color: #ddd;
    }
    .login {
      background-color: #222;
      border-color: #ddd;
    }
  }
}
</style>
