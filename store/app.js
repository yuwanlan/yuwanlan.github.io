const app = {
  namespace: true,
  state: () => ({
    blogList: [],
    currentTag: {}
  }),
  mutations: {
    setBlogList (state, list) {
      state.blogList = list;
    },
    setCurrentTag (state, data) {
      state.currentTag = data;
    }
  }
}

export default app