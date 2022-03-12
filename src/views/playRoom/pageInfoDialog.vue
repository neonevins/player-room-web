<template>
  <el-dialog
      v-model="show"
      title="文件信息"
      width="80%"
  >
    <div class="page-info">
      <p>{{roomInfo.title}}</p>
      <p>{{roomInfo.from_data.title}}</p>
      <img :src="roomInfo.from_data.poster" alt="">
      <p>{{roomInfo.from_data.des}}</p>
      <ul class="list">
        <li v-for="(album, liIndex) in roomInfo.from_data.list">
          <p>{{album.title}}</p>
          <ul class="select-one">
            <li v-for="(item, itemIndex) in album.li">
              <a class="link" @click.stop="switch_play(liIndex, itemIndex)">{{item.title}}</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="handleClose">关闭</el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script>
import { getRoomDetail, switchPlay } from "../../http/api"

export default {
  name: 'pageInfoDialog',
  props: ['id', 'show'],
  data() {
    return {
      roomInfo: {
        title: '',
        from_data: {
          title: '',
          poster: '',
          des: '',
          list: []
        },
      },
    }
  },
  mounted() {
  },
  watch: {
    show(v) {
      if (v) {
        console.log('goshow')
        getRoomDetail({room_id: this.id})
          .then(res => {
            console.log(res.data)
            this.roomInfo = res.data
            console.log(this.roomInfo)
          })
      }

    },
  },
  methods: {
    handleClose() {
      this.$emit('close');
    },
    handleOpen() {
      this.show = true
    },
    switch_play(liIndex, itemIndex) {
      if (!this.roomInfo.isMaster) {
        this.$message('请联系房主切换播放哟~')
        return;
      }
      switchPlay({liIndex, itemIndex})
        .then(console.log)
    }
  },
}
</script>



<style lang="less" scoped>
.page-info {
  .select-one {
    display: flex;
    flex-wrap: wrap;
    li{
      margin-right: 30px;
    }
  }
  .link {
    cursor: pointer;
    color: dodgerblue;
    &:hover {
      color: darkblue;
    }
  }
}
</style>
