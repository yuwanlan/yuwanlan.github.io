<template>
  <div class="blog-detail">
    <div class="container">
      <div class="markdown-body" v-html="detail"></div>
    </div>
  </div>
</template>

<script>
import '../../assets/css/solarized-operator.css'
import '../../assets/css/github-markdown.css'
export default {
  name: 'blog-detail',
  head() {
    return {
      title: ``,
      meta: [
        { hid: 'header-component-Keywords', name: 'keywords', content: `` },
        { hid: 'header-component-Description', name: 'description', content: `` }
      ]
    }
  },
  async asyncData(context) {
    let { $axios, route } = context;
    let result = await $axios(`/get-md/${route.params.id}`)
    let { attrs, detail } = result.data
    return {
      attrs,
      detail
    }
  },
  mounted() {
    console.log(this.attrs, '=attrs')
    console.log(this.detail, '=detail')
  }
}
</script>

<style lang="scss" scoped>
.blog-detail {

}
</style>