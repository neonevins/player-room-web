<script setup>
import { ref }             from 'vue'
import MyHeader     from '../../components/header.vue'
import MyMain       from '../../components/MyMain.vue'

const count = ref(0)
</script>

<template>
  <MyHeader />
  <MyMain />
</template>

<style lang="less" scoped>

</style>
