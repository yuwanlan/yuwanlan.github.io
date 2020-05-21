const Koa = require('koa')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

const getMd = require('./router/query-md');

const app = new Koa()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'
let _server;

async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  await nuxt.ready()
  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  _server = app.listen(port, host)

  app.use(getMd.routes())

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
  // exports._server = _server;
  // _server.close(() => {
  //   console.log('=_serverc.lose')
  //   process.exit(1);
  // })
  exports.close = _server.close.bind(_server)
}

start()


