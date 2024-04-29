import express from "express"
import dotenv from "dotenv"

dotenv.config()
const app = express()

const PORT = process.env.PORT || 3001

app.get("/", (req, res) => {
  res.status(200).send({
    msg: "Hello Express",
  })
})

app.get("/api/users", (req, res) => {
  res.status(200).send([
    {id: 1, username:'zhjrcc', email: 'zjrhello@gmail.com'},
    {id: 2, username: 'jack', email: 'jack@outlook.com'},
    {id: 3, username: 'lily', email: 'lily@qq.com'}
  ])
})

app.get('/api/products', (req, res) => {
  res.status(200).send([
    {id:1, name: '广州白切鸡', price: '99元'}
  ])
})

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`)
})
