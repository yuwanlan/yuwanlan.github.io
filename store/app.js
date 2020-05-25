const app = {
  namespace: true,
  state: () => ({
    blogList: [],
  }),
  mutations: {
    setBlogList (state, list) {
      state.blogList = list;
    }
  }
}

export default app