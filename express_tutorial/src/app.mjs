import express from "express"
import { config } from "dotenv"
import routes from './routes/index.mjs'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import { logging } from "./middleware/logging.mjs"

config()
const app = express()
const PORT = process.env.PORT || 3001

app.use(session({
  secret: 'zjr110...',
  saveUninitialized: false,
  resave: false,
  cookie: {
    maxAge: 60000*10,
  }
}))
app.use(express.json())
app.use(cookieParser("testSigedCookie"))
app.use(logging)

app.use(routes)

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`)
})
