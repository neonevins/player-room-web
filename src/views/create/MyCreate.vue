<script setup>
import { ref, reactive } from 'vue'
const ruleForm = reactive({
  roomName: '',
  usePwd: true,
  roomPwd: '',
})

const rules = reactive({
  roomName: [
    {
      required: true,
      message: '请输入房间名',
      trigger: 'blur',
    },
  ],
  roomPwd: [
    {
      required: ruleForm.usePwd,
      message: '请输入密码',
      trigger: 'blur',
    },
  ],
});

const tableData = [
  {
    name: '2016-05-03',
    duration: 'Tom',
    addTime: 'No. 189, Grove St, Los Angeles',
  },
  {
    name: '2016-05-02',
    duration: 'Tom',
    addTime: 'No. 189, Grove St, Los Angeles',
  },
  {
    name: '2016-05-04',
    duration: 'Tom',
    addTime: 'No. 189, Grove St, Los Angeles',
  },
  {
    name: '2016-05-01',
    duration: 'Tom',
    addTime: 'No. 189, Grove St, Los Angeles',
  },
]


</script>

<template>
  <el-form
    class="create-form"
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    :size="formSize"
  >
    <div class="room-block underline">
      <p class="title">房间信息</p>
      <div class="room-form">
        <el-form-item label="房间名" prop="roomName">
          <el-input :input-style="{width: '300px'}" placeholder="请输入房间名" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="usePwd">
          <el-switch v-model="ruleForm.usePwd"></el-switch>
        </el-form-item>
        <el-form-item prop="roomPwd">
          <el-input :input-style="{width: '300px'}"  placeholder="请输入房间密码" v-model="ruleForm.roomPwd"></el-input>
        </el-form-item>
        <el-form-item label="公开" prop="delivery">
          <el-switch v-model="ruleForm.delivery"></el-switch>
        </el-form-item>
      </div>
    </div>
    <div class="room-block">
      <p class="title">
        影片信息
        <el-button class="right" round>+添加影片</el-button>
      </p>
      <div class="room-table">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="name" label="影片名" width="300" />
          <el-table-column prop="duration" label="影片时长" width="300" />
          <el-table-column prop="addTime" label="添加时间" width="300"/>
          <el-table-column prop="action" label="" width="">
            <a href="">删除</a>
          </el-table-column>
        </el-table>
      </div>
      <div class="submit">
        <el-button round>创建房间</el-button>
      </div>
    </div>
  </el-form>
</template>

<style lang="less" scoped>
.create-form {
  position: relative;
  margin: 30px auto 0;
  width: 1080px;
  height: 100%;
  .underline {
    border-bottom: 1px #ccc dashed;
  }
  .room-block {
    .title {
      font-size: 18px;
      text-indent: 25px;
      border-left: 6px #999 solid;
    }
    .right {
      float: right;
    }
    .room-form {
      padding: 60px 0 60px 160px;
    }
  }
  .submit {
    margin-top: 20px;
    text-align: center;
    .el-button {
      width: 120px;
      height: 40px;
    }
  }
}
</style>
