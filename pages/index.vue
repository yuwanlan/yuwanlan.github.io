<template>
  <div class="index">
    <div class="container">
      <div class="content">
        <template v-for="(item, index) in list">
          <div class="blog-item" :key="index">
            <div class="blog-item-header">
              <a :href="`/blogs/${item.id}`" class="item-header-title">{{ item.title }}</a>
              <p class="item-header-time">{{ item.time || '待添加' }}</p>
            </div>
            <div class="blog-item-description">
              <p class="des" v-html="item.description"></p>
            </div>
          </div>
        </template>
      </div>
      <Tag />
    </div>
  </div>
</template>

<script>
import Tag from '../components/tags'
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
  components: {
    Tag
  },
  methods: {
  },
  mounted() {
    this.$store.commit('app/setBlogList', this.list)
    // this.$axios.get('/get-md/exit')
  }
}
</script>

<style lang="scss" scoped>
.index {
  .container {
    display: flex;
    justify-content: space-between;
    .content {
      overflow-y: scroll;
      width: 930px;
      .blog-item {
        display: block;
        padding: 40px 0;
        .blog-item-header {
          .item-header-title {
            display: block;
            font-size: 20px;
            margin-bottom: 10px;
          }
          .item-header-time {
            color: #aaa;
            display: block;
            font-size: 14px;
            margin-bottom: 10px;
          }
        }
        .blog-item-description {
          margin-bottom: 40px;
          .des {
            font-size: 16px;
            margin-bottom: 10px;
          }
        }
      }
      .blog-item + .blog-item {
        border-top: 1px solid #eee;
      }
    }
  }
}
</style>
