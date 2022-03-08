<script setup>
import { defineProps } from 'vue';
import {useRouter} from 'vue-router'
const router = useRouter()

const {val} = defineProps({
  val: {
    title: String,
    des: String,
    create_date: String,
    master_id: Number,
  },
})

const fillZero = (n) => {
  n = n.toString()
  if (n.length > 1) { return n.toString() }
  return '0' + n
}
const date = function (dateString, _date) {
  const reg = /[y|m|d|h|i|s]/ig
  _date ? (_date instanceof Date || (_date = new Date(_date))) : (_date = new Date())
  dateString = dateString.replace(reg,  (val) => {
    val = val.toUpperCase()
    if (val === 'Y') { return _date.getFullYear().toString() }
    if (val === 'M') { return fillZero(_date.getMonth() + 1) }
    if (val === 'D') { return fillZero(_date.getDate()) }
    if (val === 'H') { return fillZero(_date.getHours()) }
    if (val === 'I') { return fillZero(_date.getMinutes()) }
    if (val === 'S') { return fillZero(_date.getSeconds()) }
    return ''
  })
  return dateString
}

const joinRoom = () => {
  console.log(val)
  router.push('/playRoom?id=' + val.id)
}

</script>

<template>
  <div class="room-card" @click="joinRoom">
    <div class="pic">暂无图像</div>
    <div class="title">{{ val.title }}</div>
    <div class="desc">{{ val.des }}</div>
    <div class="info">
      <span class="time">
        <svg class="icon" width="15" height="15" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-042ca774=""><path fill="currentColor" d="M512 896a384 384 0 100-768 384 384 0 000 768zm0 64a448 448 0 110-896 448 448 0 010 896z"></path><path fill="currentColor" d="M480 256a32 32 0 0132 32v256a32 32 0 01-64 0V288a32 32 0 0132-32z"></path><path fill="currentColor" d="M480 512h256q32 0 32 32t-32 32H480q-32 0-32-32t32-32z"></path></svg>
        {{ date('y/m/d', val.create_date) }}
      </span>
      <span class="visit">
        <svg class="icon" width="15" height="15" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-042ca774=""><path fill="currentColor" d="M595.2 128H320a192 192 0 00-192 192v576h384V352c0-90.496 32.448-171.2 83.2-224zM736 64c123.712 0 224 128.96 224 288S859.712 640 736 640H576v320H64V320A256 256 0 01320 64h416zM576 352v224h160c84.352 0 160-97.28 160-224s-75.648-224-160-224-160 97.28-160 224z"></path><path fill="currentColor" d="M736 448c-35.328 0-64-43.008-64-96s28.672-96 64-96 64 43.008 64 96-28.672 96-64 96z"></path></svg>
        {{ val.master_id }}访问量
      </span>
    </div>
  </div>
</template>
<style scoped lang="less">
.room-card {
  cursor: pointer;
  width: 240px;
  height: 220px;
  .pic {
    background-color: #ccc;
    height: 140px;
    border-radius: 10px;
    line-height: 140px;
    text-align: center;
  }
  .title {
    margin-top: 15px;
    font-weight: bold;
    font-size: 16px;
  }
  .desc {
    margin-top: 10px;
    font-size: 14px;
    color: #666;
  }
  .info {
    font-size: 12px;
    color: #888;
    color: #888;
    .time {
      margin-right: 18px;
    }
    .icon {
      vertical-align: -2px;
    }
  }
}
</style>
