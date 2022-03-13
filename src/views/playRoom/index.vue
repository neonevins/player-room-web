<template>
  <el-button class="btn" @click="showDialog">查看页面信息</el-button>
  <h3 class="title">{{pageInfo.title}} {{playInfo}}</h3>
  <PageInfoDialog ref="dialog" @close="show = false" :show="show" :id="id"/>
<!--  <player ref="player" class="player" :currentTime="currentTime" :src="playLink"></player>-->
  <my-player :currentTime="currentTime" ref="myPlayer" autoplay :src="playLink" :muted="muted"></my-player>
  <el-button @click="tongbu">同步</el-button>
  <el-input v-model="msg" placeholder="请输入文明弹幕" @keydown.enter.native="send"/>
</template>

<script>
import PageInfoDialog                             from './pageInfoDialog.vue'
import player                                     from "./player.vue"
import MyPlayer                                     from "./MyPlayer.vue"
import { getRoomDetail, join_wss, getRoomStatus, sendDM } from "../../http/api.js"

export default {
  name: 'playRoom',
  components: {
    PageInfoDialog,
    player,
    MyPlayer,
  },
  computed: {
    muted() {
      return window.muted
    },
    playInfo() {
      console.log(this.detail?.from_data?.list?.[this.pageInfo.liIndex]?.title)
      const firstTitle = this.detail?.data?.from_data?.list?.[this.pageInfo.liIndex]?.title || '';
      const subTitle = this.detail?.data?.from_data?.list?.[this.pageInfo.liIndex]?.li?.[this.pageInfo.itemIndex]?.title || "";
      return `${firstTitle}-${subTitle}`
    }
  },
  data() {
    return {
      pageInfo: {
        title: '',
        itemIndex: 0,
        liIndex: 0,
      },
      playLink: '',
      currentTime: 0,
      id: '',
      show: false,
      video: this.$refs.video,
      detail: null,
      msg: '',

      // 房间里面的两个socket
      socketMap: {
        chatSocket: null,
        playSocket: null,
      },
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getRoomDetail();
    this.tongbu();
  },
  methods: {
    send(v) {
      console.log(this.msg)
      sendDM({msg: this.msg})
        .then(res => {
          console.log(res)
          this.$notify({
            title: res.data.msg,
            type: 'warning',
          })
        })
      this.msg = ''
    },
    showDialog() {
      this.show = true
    },
    tongbu() {
      window.muted = false
      getRoomStatus({room_id: this.id}).then(data => {
        const detail = data.data
        console.log(detail)
        this.pageInfo.itemIndex = detail.itemIndex;
        this.pageInfo.liIndex = detail.liIndex;
        if (detail.playLink) {
          this.playLink = detail.playLink
          if (detail.startDate) {
            this.currentTime = (detail.currentDate - detail.startDate) / 1000
            console.log(this.currentTime)
          }
        }
        this.zergUserJoinWss(detail.playWs, 'playSocket')
        this.zergUserJoinWss(detail.chatWs, 'chatSocket')
      })
    },
    getRoomDetail(){
      console.log(this.id)
      getRoomDetail({ room_id: this.id })
        .then(detail => {
          this.detail = detail;
          console.log(detail)
          this.pageInfo.title = detail.data.title
          if (detail.playLink) {
            console.log( detail.currentDate , detail.startDate)
            console.log(detail.playLink)
            this.playLink = detail.playLink
            if (detail.startDate) {
              this.currentTime = (detail.currentDate - detail.startDate) / 1000
            }
          }
        })
    },
    zergUserJoinWss (wss, socketType) {
      if (this.socketMap[socketType]) {
        this.socketMap[socketType].onopen = null
        this.socketMap[socketType].onmessage = null
      }

      this.socketMap[socketType] = new window.WebSocket(wss)
      this.socketMap[socketType].onopen = () => {
        console.log('链接成功:' + wss)
        this.socketMap[socketType].onmessage = (res) => {
          const result = JSON.parse(res.data)
          const data = result.data
          if (result.code === 101) { // 状态码101表示加入wss服务器通知
            join_wss(data).then(console.log)
          }

          if (result.code === 201) {
            this.playLink = data.playLink
          }
          if (result.code === 202) {
            this.currentTime = (result.data.currnet - result.data.start) / 1000
          }

          // 接收弹幕
          if (result.code === 301) {
            this.$refs.myPlayer.sendDM(result.data.msg)
          }
          console.log('接受', result)
          // 加入房间
          if (result.code === 102) {
            this.$notify({
              title: result.data.msg,
              type: 'success',
            })
          }
        }
      }
    }
  }
}
</script>


<style lang="less" scoped>
.btn {
  position: fixed;
  z-index: 100;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
}
.player {
  width: 1666px;
}
.title {
  width: 1666px;
  text-align: center;
}
.page-info {
  .select-one {
    display: flex;
    flex-wrap: wrap;
    li{
      margin-right: 30px;
    }
  }
}
</style>
