<template>
  <div class="index">
    <div class="container">
      <template v-for="(item, index) in list">
        <a :href="`/blogs/${item.id}`" :key="index">{{ item.title }}</a>
      </template>
    </div>
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
    let list = result.data
    return {
      list
    }
  },
  methods: {
    handleDetail(item) {
      this.$router.push(`/blogs/${item.id}`)
    }
  },
  mounted() {
    // this.$axios.get('/get-md/list')
  }
}
</script>

<style lang="scss" scoped>
.index {
  
}
</style>
