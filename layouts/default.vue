<template>
  <div class="default-layout">
    <Head />
    <div class="container">
      <nuxt />
    </div>
  </div>
</template>

<script>
import Head from '../components/head'
export default {
  name: 'default',
  components: {
    Head
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.default-layout {
  .container {
    display: flex;
    justify-content: space-between;
  }
}
</style>
