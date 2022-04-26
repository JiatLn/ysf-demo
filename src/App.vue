<template>
  <Home v-if="isHome" />
  <Layout v-else />
</template>

<script setup lang="ts">
  import Layout from '@/layout/index.vue';
  import Home from '@/pages/Home/index.vue';

  const router = useRoute();

  const isHome = computed((): boolean => {
    return router.name === 'Home';
  });
</script>

<style lang="scss" scoped></style>
