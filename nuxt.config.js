
const axios = require('axios')
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      // { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  // api:  https://www.nuxtjs.cn/api/configuration-generate
  generate: {
    subFolders: false,
    async routes() {
      let tagList = [];
      let result = await axios.get('http://localhost:3000/get-md/list');
      let list = result.data;
      let arr = list.map(item => {
        item.tags.forEach(tag => {
          if(!tagList.includes(tag)) tagList.push(tag)
        })
        return `/blogs/${item.id}`
      })
      tagList.forEach(tag => {
        arr.push(`/tags/${tag}`)
      })
      console.log(arr, 'all-router.........')
      return arr
    }
  },
  hooks: {
    generate: {
      async done() {
        console.log('builder-done.......')
        // 要等到详情页请求接口打包完成，再关闭服务
        await axios.get('http://localhost:3000/get-md/exit')
      }
    }
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    // './assets/css/base.scss'
  ],
  styleResources: {
    scss: './assets/css/base.scss'
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    './plugins/minxin.js'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/style-resources'
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
