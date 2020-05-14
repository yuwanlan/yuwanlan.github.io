let Router = require('koa-router');
let fs = require('fs');
let fm = require('front-matter')
let hljs = require('highlight.js');
let MarkdownIt = require('markdown-it');
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
  // console.log(__dirname + '/' + path, '====readFile-path')
  return new Promise((res, rej) => {
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
  console.log('get-list-start')
  if(ctx.url !== '/get-md/list') next()
  let dirPath = "../../markdown";

  let fileList;
  console.log('read-dir-start')
  await readDir(dirPath).then(res => {
    fileList = res
  })
  console.log('read-dir-end')

  let allList = fileList.map(fileName => {
    let path = `../../markdown/${fileName}`
    return readFile(path, 'utf8')
  })

  await Promise.all(allList).then(contentList => {
    allMdfiles = contentList.map(content => {
      return fm(content).attributes
    })
  }).catch(err => {
    throw Error('遍历所有失败' + err);
  })
  console.log('read-file-end')

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
  let path = `../../markdown/${ctx.params.id}.md`
  await readFile(path, 'utf8').then(res => [
    markdownData = res

  ]).catch(err => {
    console.log(err)
  })
  ctx.body = markdownData;
})

module.exports = router