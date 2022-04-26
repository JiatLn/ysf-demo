<template>
  <van-tabbar v-model="active">
    <van-tabbar-item icon="wap-home-o">首页</van-tabbar-item>
    <van-tabbar-item icon="shop-o">商城</van-tabbar-item>
    <van-tabbar-item icon="shopping-cart-o">购物车</van-tabbar-item>
    <van-tabbar-item icon="user-o">个人</van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
  const active = ref(0);
</script>

<style scoped lang="scss"></style>
