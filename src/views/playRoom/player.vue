<template>
  <div>
    <div id="player-container">
      <div ref="player" id="player"></div>
    </div>
  </div>

</template>

<script>
import DPlayer from 'dplayer';

export default {
  name: 'player',
  props: {
    src: {
      type: String,
      default: '',
    },
    currentTime: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      dp: null,
      video: null,
    };
  },
  mounted() {
    this.addToPlay();
  },
  methods: {
    addToPlay() {
      this.dp = new DPlayer({
        element: this.$refs.player,
        video: {
          url: this.src,
        },
        autoplay: true,
        volume: 0,
      })
      this.video = this.dp.video
      this.dp.on('canplay', () => {
        this.dp.video.muted = window.muted;
        this.dp.video.play()
      })
      let promise = new Promise((resolve, reject) => {
        if (this.video.duration) { resolve(this.video.duration) }
        this.dp.on('canplay', () => {
          resolve(this.video.duration)
        })
        this.dp.on('error', (d) => {
          reject('获取视频时长失败')
        })
        setTimeout((msg) => {
          if (this.video.duration) {
            resolve(this.video.duration)
          } else {
            reject('获取视频时长超时')
          }
        }, 15000)
      })
    },
  },
  watch: {
    src(v) {
      this.addToPlay()
    },
    currentTime(v) {
      this.dp.seek(v);
    },
  }
}
</script>

<style>

</style>
