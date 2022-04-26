<template>
  <van-tabbar v-model="active" route>
    <van-tabbar-item icon="wap-home-o" :to="{ name: 'Home' }">首页</van-tabbar-item>
    <van-tabbar-item icon="shop-o" :to="{ name: 'Store' }">商城</van-tabbar-item>
    <van-tabbar-item icon="shopping-cart-o" :to="{ name: 'ShoppingCart' }">购物车</van-tabbar-item>
    <van-tabbar-item icon="user-o" :to="{ name: 'UserCenter' }">个人</van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
  const active = ref(0);
</script>

<style scoped lang="scss"></style>
