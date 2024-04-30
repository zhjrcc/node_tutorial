import express, { request } from "express"
import dotenv from "dotenv"
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

const loggingMiddleware = (req, res, next) => {
  console.log(`${req.method} - ${req.url}`)
  next()
}
// 自定义中间件
const resolveIndexByUserId = (req, res, next) => {
  const {
    params: { id },
  } = req
  const parsedId = parseInt(id)
  if (isNaN(parsedId)) return res.sendStatus(400)
  const findUserIndex = mockUsers.findIndex((user) => user.id === parsedId)
  if (findUserIndex === -1) return res.sendStatus(404)
  req.findUserIndex = findUserIndex
  next()
}
// 中间件在程序中的位置很重要，中间件位置后面的路由都将会先经过中间件，而中间件之前的则不会经过中间件
// app.use(loggingMiddleware)
app.use(express.json())

const mockUsers = [
  { id: 1, username: "zhjrcc", email: "zjrhello@gmail.com" },
  { id: 2, username: "jack", email: "jack@outlook.com" },
  { id: 3, username: "lily", email: "lily@qq.com" },
]

app.get("/", (req, res) => {
  res.status(200).send({
    msg: "Hello Express",
  })
})

app.post("/api/users", (req, res) => {
  console.log(req.body)
  const { body } = req
  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body }
  mockUsers.push(newUser)
  res.status(201).send(newUser)
})

app.get("/api/users", loggingMiddleware, (req, res) => {
  // console.log(req.query)
  const {
    query: { filter, value },
  } = req
  if (!filter || !value) {
    return res.status(200).send(mockUsers)
  }
  const filterUser = mockUsers.filter((user) => user[filter].includes(value))
  return res.status(200).send(filterUser)
})

app.get("/api/products", (req, res) => {
  res.status(200).send([{ id: 1, name: "广州白切鸡", price: "99元" }])
})

app.get("/api/users/:id", resolveIndexByUserId, (req, res) => {
  // console.log(req.params)
  const {findUserIndex} = req;
  const findUser = mockUsers[findUserIndex]
  res.status(200).send(findUser)
})

app.put("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req
  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body }
  return res.sendStatus(200)
})

app.patch("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body }
  return res.sendStatus(200)
})

app.delete("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const {findUserIndex} = req
  mockUsers.splice(findUserIndex, 1)
  res.status(200).send(mockUsers)
})

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`)
})
