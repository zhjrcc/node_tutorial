const express = require('express')
require("dotenv").config();

const app = express()
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.json({
    message: '这里是网站首页'
  })
})

app.get('/users/:id', (req, res) => {
  res.json({
    message: `这里是用户${req.params.id}的主页`
  })
})

app.post('/users/:id', (req, res) => {
  res.json({
    message: `增加用户${req.params.id}`
  })
})

app.delete('/users/:id', (req, res) => {
  res.json({
    message: `删除用户${req.params.id}`
  })
})

app.put('/users/:id', (req, res) => {
  res.json({
    message: `更新用户${req.params.id}的信息`
  })
})

app.listen(port, () => {
  console.log(`服务器在localhost:${port}`)
})
