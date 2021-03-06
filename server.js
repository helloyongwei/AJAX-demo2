var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号!例如: node server.js 8888')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method


  console.log('含查询字符串的路径\n' + pathWithQuery)

  if(path === '/'){
    let page = fs.readFileSync('./index.html', 'utf8')
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(page)
    response.end()
  }else if (path === '/xxx') {
    response.statusCode = 200 
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(`{
        "name": "yong",
        "age": 20
    }`)
    response.end()
  } else {
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
    let callback = query.callback
    response.write(`
        ${callback}.call(undefined, '我访问失败了')
    `)
    response.end()
  }

})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请在浏览器打开 http://localhost:' + port)

