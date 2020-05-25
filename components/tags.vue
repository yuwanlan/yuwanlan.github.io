<template>
  <div class="tags">
    <h1 class="tags-title">标签</h1>
    <ul class="tags-box">
      <li class="tag-item" v-for="(item, index) in tagList" :key="index" @click="handleGoTagContentList(item)">
        <a class="tag" href="#">{{ item.tag }}</a>
        <p class="tag-count">{{ item.contentList.length }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'tags',
  computed: {
    ...mapState('app', [
      'blogList'
    ]),
    tagList() {
      let list = [];
      let allTAgs = {};
      this.blogList.forEach(item => {
        item.tags.forEach(tag => {
          if(!allTAgs[tag]) allTAgs[tag] = []
          allTAgs[tag].push(item)
        })
      })
      for(let tag in allTAgs) {
        list.push({
          tag: tag,
          contentList: allTAgs[tag]
        })
      }
      return list
    }
  },
  methods: {
    handleGoTagContentList(item) {
      this.$store.commit('app/setCurrentTag', item);
      this.$router.push(`/tags/${item.tag}`);
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  width: 190px;
  margin-top: 40px;
  .tags-title {
    font-weight: 400;
    color: #333;
    border-bottom: 1px solid #ddd;
    padding-bottom: 5px;
    margin-bottom: 16px;
  }
  .tags-box {
    display: flex;
    flex-wrap: wrap;
    .tag-item {
      letter-spacing: 0;
      line-height: 21px;
      padding: 0 10px 7px 0;
      display: inline-block;
      .tag {
        display: inline-block;
        font-size: 14px;
      }
      .tag-count {
        vertical-align: super;
        display: inline-block;
        font-size: 10px;
        opacity: .6;
        margin-left: -4px;
      }
    }
  }
}
</style>