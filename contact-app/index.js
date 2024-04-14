const express =require('express')
const dotenv = require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5001;

app.use(express.json())
app.use('/api/contacts', require('./routers/contactRouter'))

app.listen(PORT, () => {
  console.log(`服务器运行在: ${PORT}`)
})
