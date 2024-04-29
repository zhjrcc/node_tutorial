import express from "express"
import dotenv from "dotenv"
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

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
  const {body} = req
  const newUser = {id: mockUsers[mockUsers.length - 1].id + 1, ...body}
  mockUsers.push(newUser)
  res.status(201).send(newUser)
})

app.get("/api/users", (req, res) => {
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

app.get("/api/users/:id", (req, res) => {
  // console.log(req.params)
  const parsedId = parseInt(req.params.id)
  if (isNaN(parsedId)) res.sendStatus(400)
  const findUser = mockUsers.find((user) => user.id === parsedId)
  if (!findUser) res.sendStatus(404)
  res.send(findUser)
})

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`)
})
