
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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  // api:  https://www.nuxtjs.cn/api/configuration-generate
  generate: {
    async routes() {
      let result = await axios.get('http://localhost:3000/get-md/list')
      // await axios.get('http://localhost:3000/get-md/exit')
      let list = result.data
      return list.map(item => {
        return `/blogs/${item.id}`
      })
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
