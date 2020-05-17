<template>
  <div class="container">
    <p v-for="(item, index) in list" :key="index" @click="handleDetail(item)">{{ item.title }}</p>
  </div>
</template>

<script>
export default {
  name: 'index',
  head() {
    return {
      title: `one price`,
      meta: [
        { hid: 'header-component-Keywords', name: 'keywords', content: `nuxt, 博客` },
        { hid: 'header-component-Description', name: 'description', content: `余挽澜的nuxt博客` }
      ]
    }
  },
  async asyncData(context) {
    let { $axios } = context;
    let result = await $axios.get('/get-md/list')
    let list = ((result.data || {}).module || {}).list || []
    return {
      list
    }
  },
  methods: {
    handleDetail(item) {
      console.log(item)
      this.$router.push(`/blogs/${item.id}`)
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
}
</style>
