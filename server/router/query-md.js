let Router = require('koa-router');
let fs = require('fs');
let fm = require('front-matter')
let hljs = require('highlight.js');
let MarkdownIt = require('markdown-it');
let main = require('../index')

let router = new Router({
  prefix: '/get-md'
});

let md = new MarkdownIt({
  html:         false,        // 在源码中启用 HTML 标签
  xhtmlOut:     false,        // 使用 '/' 来闭合单标签 （比如 <br />）。
  breaks:       false,        // 转换段落里的 '\n' 到 <br>。
  langPrefix:   'language-',  // 给围栏代码块的 CSS 语言前缀。对于额外的高亮代码非常有用。
  linkify:      false,        // 将类似 URL 的文本自动转换为链接。
  typographer:  false,
  quotes: '“”‘’',
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }
    return ''; // 使用额外的默认转义
  }
});


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
    fs.readFile(__dirname + '/' + path, options, (err, data) => {
      if(err) rej(err);
      res(data)
    })
  })
}

// 参考 https://stackoverflow.com/questions/14626636/how-do-i-shutdown-a-node-js-https-server-immediately
router.get('/exit', async (ctx, next) => {
  if(ctx.url !== '/get-md/exit') next()
  let { server } = main
  await server.close();
  // setImmediate(function(){server.emit('close')});
  // await process.exit(1);
  ctx.body = '停止服务'
})

router.get('/list', async (ctx, next) => {
  if(ctx.url !== '/get-md/list') next()
  let dirPath = "../../markdown";

  let fileList = await readDir(dirPath)

  let allList = fileList.map(fileName => {
    let path = `../../markdown/${fileName}`
    return readFile(path, 'utf8')
  })

  let contentList = await Promise.all(allList);
  allMdfiles = contentList.map(content => {
    return fm(content).attributes
  })
  ctx.body = allMdfiles
})

router.get('/:id', async (ctx, next) => {
  let markdownData;
  let path = `../../markdown/${ctx.params.id}.md`
  markdownData = await readFile(path, 'utf8')
  ctx.body = {
    attrs: fm(markdownData).attributes,
    detail: md.render(fm(markdownData).body)
  };
})

module.exports = router