const http = require('node:http')
require('dotenv').config()

// 设置端口
const PORT = process.env.PORT || 3001;

// 创建服务器
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json')
  res.write(
    // 写入可以是buffer或者字符串，不能直接写入一个对象，否则报错，
    // 这里使用JSON.stringify转换为json数据。
    JSON.stringify({message: '你好，这里是我的第一个HTTP服务器'})
  )
  res.end()
})

// 服务器监听端口
server.listen(PORT, ()=> {
  console.log(`服务器localhost:${PORT}`)
})
