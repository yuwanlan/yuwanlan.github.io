let Router = require('koa-router');
let fs = require('fs');
let marked = require('marked');

let allMdfiles = []

let readDir = function(path, options = null) {
  return new Promise((res, rej) => {
    fs.readdir(__dirname + '/' + path, options, (err, files) => {
      if(err) rej(err);
      res(files)
    })
  })
}
let readFile = function(path, options = null) {
  return new Promise((res, rej) => {
    console.log(__dirname + '/' + path, '==filer-path')
    fs.readFile(__dirname + '/' + path, options, (err, data) => {
      if(err) rej(err);
      res(data)
    })
  })
}

let router = new Router({
  prefix: '/get-md'
});

router.get('/list', async (ctx, next) => {
  if(ctx.url !== '/get-md/list') next()
  let dirPath = "../../markdown";
  await readDir(dirPath).then(res => {
    allMdfiles = res
  })
  ctx.body = {
    "module": {
      list: allMdfiles
    },
    "code": 200,
    "message": "执行成功。"
  };
})

router.get('/:id', async (ctx, next) => {
  let markdownData;
  let path = `../../markdown/${ctx.params.id}`
  await readFile(path, 'utf8').then(res => [
    markdownData = res
  ]).catch(err => {
    console.log(err)
  })
  ctx.body = marked(markdownData);
})

module.exports = router