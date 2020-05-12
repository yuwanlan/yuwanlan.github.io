let Router = require('koa-router');
let fs = require('fs');

let allMdfiles = []

let readDir = function(path) {
  return new Promise((res, rej) => {
    fs.readdir(__dirname + '/' + path, (err, files) => {
      if(err) rej(err);
      res(files)
    })
  })
}
let readFile = function(path) {
  return new Promise((res, rej) => {
    fs.readFile(__dirname + '/' + path, (err, data) => {
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
  console.log(allMdfiles, '==allMdfiles')
  ctx.body = {
    "module": {
      list: allMdfiles
    },
    "code": 200,
    "message": "执行成功。"
  };
})

router.get('/:id', async (ctx, next) => {
  let data;
  let path = '../../markdown'
  await readFile(path).then(res => [
    console.log(res, '==默认格式'),
    data = String(res)
  ]).catch(err => {
    console.log(err)
  })
  console.log(data, '==data')
  ctx.body = data;
})

module.exports = router