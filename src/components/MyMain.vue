<script>
import RoomCard from '../views/home/RoomCard.vue'
import { ref, reactive, onMounted, toRefs }  from 'vue'
import {getRoomList} from '../http/api'
export default {
  name: 'MyMain',
  components: {
    RoomCard,
  },
  setup() {
    let state = reactive({
      roomData: [],
      activeName: ref('news')
    })

    const handleClick = (tab, event) => {
      console.log(tab, event)
    }

    onMounted( async () => {
      const res = await getRoomList({
        start: 0,
        count: 20,
      })
      console.log(res)
      state.roomData = res.data.list || [];
    })
    return {
      ...toRefs(state),
      handleClick,
    }
  }
}

</script>

<template>
  <div id="main">
    <el-button class="fast-join">快速加入</el-button>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane class="pane" label="最新发布" name="news">
        <RoomCard v-for="item in roomData" :val="item"/>
      </el-tab-pane>
      <el-tab-pane class="pane" label="最热门" name="hots">hots</el-tab-pane>
    </el-tabs>
  </div>
</template>
<style scoped lang="less">
#main {
  position: relative;
  margin: 30px auto;
  width: 1366px;
  height: 100%;
  .fast-join {
    position: absolute;
    right: 0;
    z-index: 1;
  }
  .el-tabs {
    /deep/ .el-tabs__nav-wrap::after {
      height: 0;
    }
  }
  .pane {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .room-card {
      margin: 20px 0;
    }
  }
}
</style>
