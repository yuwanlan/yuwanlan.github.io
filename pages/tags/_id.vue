<template>
  <div class="tag-list">
    <div class="container">
      <h1 class="tag-list-title">{{ currentTag.tag }}</h1>
      <template v-for="(item, index) in currentTag.contentList">
        <a :href="`/blogs/${item.id}`" class="list-line" :key="index">
          <span class="time">{{ item.time || '无' }}</span>
          {{ item.title }}
        </a>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: 'tag-list',
  async asyncData(context) {
    let { $axios, route, store } = context;

    let result = await $axios.get('/get-md/list')
    let blogList = result.data

    let allTAgs = {};
    blogList.forEach(item => {
      item.tags.forEach(tag => {
        if(!allTAgs[tag]) allTAgs[tag] = []
        allTAgs[tag].push(item)
      })
    })
    let tag = route.params.id
    return {
      currentTag: {
        tag,
        contentList: allTAgs[tag]
      }
    }
  },
  data() {
    return {
      
    }
  },
  computed: {
    ...mapState('app', [
      'blogList'
    ]),
  }
}
</script>

<style lang="scss" scoped>
.tag-list {
  .container {
    box-sizing: border-box;
    padding: 32px 100px;
    .tag-list-title {
      font-size: 30px;
      margin-bottom: 15px;
    }
    .list-line {
      display: block;
      color: #333;
      margin: 15px 0;
      .time {
        font-size: 14px;
        color: $default-color-gray;
        margin-right: 15px;
      }
    }
  }
}
</style>