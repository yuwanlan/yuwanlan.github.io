<template>
  <div class="default-layout">
    <Head />
      <nuxt />
  </div>
</template>

<script>
import Head from '../components/head'
export default {
  name: 'default',
  components: {
    Head,
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.default-layout {
}
</style>
