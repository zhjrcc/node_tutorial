import express, { request } from "express"
import { config } from "dotenv"
import {
  query,
  validationResult,
  body,
  matchedData,
  checkSchema,
} from "express-validator"
import {
  userPostValidationSchema,
  userQueryValidationSchema,
} from "./utils/validationSchemas.mjs"
config()
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

//模拟的用户数据
const mockUsers = [
  { id: 1, username: "zhjrcc", email: "zjrhello@gmail.com" },
  { id: 2, username: "jack", email: "jack@outlook.com" },
  { id: 3, username: "lily", email: "lily@qq.com" },
]

// @desc GET /
app.get("/", loggingMiddleware, (req, res) => {
  res.status(200).send({
    msg: "Hello Express",
  })
})

// @desc GET /api/users?query
app.get("/api/users", checkSchema(userQueryValidationSchema), (req, res) => {
  console.log(req.query)
  const {
    query: { value },
  } = req

  const valiadtedResult = validationResult(req)
  console.log(valiadtedResult)
  if (!valiadtedResult.isEmpty()) return res.status(400).send(mockUsers)
  const data = matchedData(req)
  const { filter } = data
  const filterUser = mockUsers.filter((user) => {
    if (user[filter]) return user[filter].includes(value)
  })
  return res.status(200).send(filterUser)
})

// @desc POST /api/uers
app.post("/api/users", checkSchema(userPostValidationSchema), (req, res) => {
  const valiadtedResult = validationResult(req)
  console.log(valiadtedResult)

  if (!valiadtedResult.isEmpty()) return res.sendStatus(400)
  const { body } = req
  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body }
  mockUsers.push(newUser)
  res.status(201).send(newUser)
})

// @desc GET /api/products
app.get("/api/products", (req, res) => {
  res.status(200).send([{ id: 1, name: "Snicker", price: "99元" }])
})

// @desc GET /api/users/:id
app.get("/api/users/:id", resolveIndexByUserId, (req, res) => {
  console.log(req.params)
  const { findUserIndex } = req
  const findUser = mockUsers[findUserIndex]
  res.status(200).send(findUser)
})

// @desc PUT /api/users/:id
app.put("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req
  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body }
  return res.sendStatus(200)
})

// @desc PATCH /api/user/:id
app.patch("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body }
  return res.sendStatus(200)
})

// @desc DELETE /api/user/:id
app.delete("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req
  mockUsers.splice(findUserIndex, 1)
  res.status(200).send(mockUsers)
})

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`)
})
