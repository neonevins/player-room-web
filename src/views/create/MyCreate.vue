<script setup>
import { ref, reactive } from 'vue'
import { createRoom }    from '../../http/api.js'
import { ElMessage }     from "element-plus"
import { useRouter }     from "vue-router"

const ruleFormRef = ref(null);
const router = useRouter()

const ruleForm = reactive({
  title: '',
  des: '',
  open: 1,
  from: 1,
  from_id: '',
})
// createRoom({
//   title: '请输入房间名',
//   des: '请输入房间描述',
//   from: 1,
//   from_id: '20070011',
//   open: 1
// })

const create = (ruleFormRef) => {
  ruleFormRef.validate((valid) => {
    if (valid) {
      console.log(ruleForm)
      createRoom(ruleForm)
        .then(res => {
          console.log(res)
          const {id} = res.data;
          ElMessage.success('创建成功')
          router.push(`/playRoom?id=${id}`)
        })
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const rules = reactive({
  from_id: [
    {
      required: true,
      message: '请输入from_id',
      trigger: 'blur',
    },
  ],
  title: [
    {
      required: true,
      message: '请输入房间名',
      trigger: 'blur',
    },
  ],
});

// const tableData = [
//   {
//     name: '2016-05-03',
//     duration: 'Tom',
//     addTime: 'No. 189, Grove St, Los Angeles',
//   },
//   {
//     name: '2016-05-02',
//     duration: 'Tom',
//     addTime: 'No. 189, Grove St, Los Angeles',
//   },
//   {
//     name: '2016-05-04',
//     duration: 'Tom',
//     addTime: 'No. 189, Grove St, Los Angeles',
//   },
//   {
//     name: '2016-05-01',
//     duration: 'Tom',
//     addTime: 'No. 189, Grove St, Los Angeles',
//   },
// ]


</script>

<template>
  <el-form
    class="create-form"
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
  >
    <div class="room-block underline">
      <p class="title">房间信息</p>
      <div class="room-form">
        <el-form-item label="房间名" prop="title">
          <el-input :input-style="{width: '300px'}" placeholder="请输入房间名" v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="房间描述" prop="des">
          <el-input :input-style="{width: '300px'}" placeholder="请输入房间描述" v-model="ruleForm.des"></el-input>
        </el-form-item>
        <el-form-item label="数据源头" prop="from_id">
          <el-input :input-style="{width: '300px'}" placeholder="请输入数据源头" v-model="ruleForm.from_id"></el-input>
        </el-form-item>
        <el-form-item label="是否公开" prop="open">
          <el-switch :active-value="1" :inactive-value="0" v-model="ruleForm.open"></el-switch>
        </el-form-item>
      </div>
    </div>
    <div class="room-block">
<!--      <p class="title">-->
<!--        影片信息-->
<!--        <el-button class="right" round>+添加影片</el-button>-->
<!--      </p>-->
<!--      <div class="room-table">-->
<!--        <el-table :data="tableData" style="width: 100%">-->
<!--          <el-table-column prop="name" label="影片名" width="300" />-->
<!--          <el-table-column prop="duration" label="影片时长" width="300" />-->
<!--          <el-table-column prop="addTime" label="添加时间" width="300"/>-->
<!--          <el-table-column prop="action" label="" width="">-->
<!--            <a href="">删除</a>-->
<!--          </el-table-column>-->
<!--        </el-table>-->
<!--      </div>-->
      <div class="submit">
        <el-button round @click="create(ruleFormRef)">创建房间</el-button>
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
