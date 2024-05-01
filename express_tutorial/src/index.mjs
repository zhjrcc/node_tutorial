import express from "express"
import { config } from "dotenv"
import routes from './routes/index.mjs'
import { logging } from "./middleware/logging.mjs"

config()
const app = express()
const PORT = process.env.PORT || 3001

app.use(logging)
app.use(express.json())
app.use(routes)

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`)
})
