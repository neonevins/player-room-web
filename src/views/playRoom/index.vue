<template>
  <el-button class="btn" @click="showDialog">查看页面信息</el-button>
  <PageInfoDialog ref="dialog" @close="show = false" :show="show" :id="id"/>
  <player :currentTime="currentTime" :src="playerUrlDemo"></player>
  <el-button @click="tongbu">同步</el-button>
</template>

<script>
import PageInfoDialog                             from './pageInfoDialog.vue'
import player                                     from "./player.vue"
import { getRoomDetail, join_wss, getRoomStatus } from "../../http/api.js"

export default {
  name: 'playRoom',
  components: {
    PageInfoDialog,
    player
  },
  data() {
    return {
      // playerUrlDemo: 'https://1251316161.vod2.myqcloud.com/007a649dvodcq1251316161/f48b6e475285890807430053078/d5vMkD3bqfUA.mp4',
      playerUrlDemo: '',
      currentTime: 0,
      id: '',
      show: false,
      src: '',
      video: this.$refs.video
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getRoomDetail();
  },
  methods: {
    showDialog() {
      this.show = true
    },
    tongbu() {
      getRoomStatus({room_id: this.id}).then(data => {
        const detail = data.data
        console.log(detail)
        if (detail.playLink) {
          // this.$refs.video.oncanplay = function() {
          //   this.play()
          // }
          this.src = detail.playLink
          if (detail.startDate) {
            this.currentTime = (detail.currentDate - detail.startDate) / 1000
          }
        }
        this.zergUserJoinWss(detail.playWs)
        this.zergUserJoinWss(detail.chatWs)
      })
      // this.onclick = null
    },
    getRoomDetail(){
      getRoomDetail({ room_id: this.id })
        .then(detail => {
          console.log(detail)
          if (detail.playLink) {
            console.log( detail.currentDate , detail.startDate)
            // this.video.oncanplay = function() {
            //   this.play()
            // }
            console.log(detail.playLink)
            this.playerUrlDemo = detail.playLink
            if (detail.startDate) {
              this.currentTime = (detail.currentDate - detail.startDate) / 1000
            }
          }
          console.log(detail.playWs)
          console.log(detail.chatWs)
        })
    },
    zergUserJoinWss (wss) {
      const ws = new window.WebSocket(wss)
      console.log(ws)
      ws.onopen = function() {
        console.log('链接成功:' + wss)
        ws.onmessage = function(res) {
          console.log(res)
          const result = JSON.parse(res.data)
          const data = result.data
          if (result.code === 101) { // 状态码101表示加入wss服务器通知
            join_wss(data).then(console.log)
          }

          if (result.code === 201) {
            // this.video.oncanplay = function() {
            //   this.play()
            // }
            this.playerUrlDemo = result.data.playLink
          }
            console.log('接受', result)
        }
      }
    }
  }
}
</script>


<style lang="less" scoped>
.btn {
  position: absolute;
  z-index: 100;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
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
