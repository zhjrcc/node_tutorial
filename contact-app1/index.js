const express = require("express")
const errorHandler = require("./middleware/errHandler")
const dotenv = require("dotenv").config()
const connectDB = require("./config/dbConnection")

connectDB()
const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use("/api/contacts", require("./routers/contactRoutes"))
app.use("/api/users", require("./routers/userRoutes"))
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`服务器运行在localhost:${PORT}`)
})
