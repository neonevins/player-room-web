<script setup>
import { ref, reactive }  from 'vue'
import http               from "../../http/http"
import { reactiveScreen } from "../../utils/index"

const screenSize = ref('left');
const resize = function() {
  if (reactiveScreen()) {
    console.log('resize')
    screenSize.value = 'top'
  } else {
    screenSize.value = 'left'
  }
}
window.onresize = resize
resize();
const ruleFormRef = ref();
const formData = reactive({
  name: '',
  pwd: '',
})

const rules = reactive({
  name: [{ required: true, trigger: 'blur' }],
  pwd: [{ required: true, trigger: 'blur' }],
})

const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log(formData)
      http.post('abc' , formData)
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}

</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>LOGO</span>
      </div>
    </template>
    <el-form
      class="form"
      :label-position="screenSize"
      label-width="100px"
      :rules="rules"
      :model="formData"
      style="max-width: 460px"
      ref="ruleFormRef"
    >
      <el-form-item label="用户名:" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="pwd">
        <el-input type="password" v-model="formData.pwd"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
        <el-button @click="resetForm(ruleFormRef)">游客登录</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped lang="less">
.box-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }
  .box-card {
    width: 480px;
  }
}
@media screen and (max-width: 640px) {
  .box-card {
    width: 100vw;
    height: 100vh;
  }
  .form {
    height: 100%;
  }
  .el-card {
    /deep/ .el-card__body {
      transform: translateY(30vh);
    }
  }
}
</style>
