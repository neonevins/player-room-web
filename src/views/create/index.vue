<script setup>
import { ref } from 'vue'
import MyHeader from '../../components/header.vue'
import MyCreate from './MyCreate.vue'

const count = ref(0)
</script>

<template>
  <MyHeader />
  <MyCreate />
</template>

<style lang="less" scoped>

</style>
