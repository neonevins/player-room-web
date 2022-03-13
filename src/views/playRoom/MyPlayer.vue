<template>
  <div>
    <canvas ref="canvas" id="canvas-player" width="1280" height="720" @click="fullScreen"></canvas>
    <video class="video" :currentTime="currentTime" ref="myPlayer" autoplay controls width="0" height="0" :src="src"></video>
  </div>
</template>

<script>
class Danmu{
  constructor(msg) {
    this.msg = msg
    this.width = msg.trim().length * 25
    this.x = 1280
    this.y = Math.random() * 700
    this.dead = false
  }
  render(ctx) {
    ctx.font = `25px '微软雅黑'`;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
    ctx.shadowBlur = 6;
    ctx.fillStyle = `#${localStorage.getItem('token').slice(0, 6)}`;
    ctx.fillText(this.msg, this.x ,this.y)
    this.x -= 2
    if (this.x < -this.width) this.dead = true
  }
}

export default {
  props: ['src', 'currentTime'],
  data() {
    return {
      muted: true,
      ctx: null,
      damuPool: [],
    }
  },
  watch: {
  },
  mounted() {
    this.initCanvas()
    this.$refs.myPlayer.oncanplay = () => {
      this.$refs.myPlayer.muted = window.muted;
      this.$refs.myPlayer.play();
    }
  },
  methods: {
    fullScreen() {
      this.$refs.canvas.webkitRequestFullScreen()
    },
    initCanvas() {
      this.ctx = this.$refs.canvas.getContext('2d')
      this.draw();
    },
    draw() {
      this.ctx.drawImage(this.$refs.myPlayer, 0, 0, 1280, 720)
      this.renderDMPool()
      requestAnimationFrame(() => this.draw())
    },
    renderDMPool() {
      this.damuPool.forEach(danmu => {
        danmu.render(this.ctx)
      })
      this.damuPool = this.damuPool.filter(danmu => !danmu.dead)
    },
    sendDM(msg) {
      this.damuPool.push(new Danmu(msg))
    }
  }
}
</script>

<style scoped>
.video {
  opacity: 1;
}
</style>
