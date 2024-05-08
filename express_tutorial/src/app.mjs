import express from "express"
import { config } from "dotenv"
import routes from "./routes/index.mjs"
import cookieParser from "cookie-parser"
import session from "express-session"
import { logging } from "./middleware/logging.mjs"
import passport from "passport"
import "./strategies/local-strategy.mjs"
import mongoose from "mongoose"

config()
const app = express()
const PORT = process.env.PORT || 3001

mongoose
  .connect(
    "mongodb://root:113647@localhost:27017/express_tutorial?authSource=admin"
  )
  .then(() => {
    console.log("Connect to MongoDB")
  })
  .catch((err) => {
    console.log(`Error: ${err}`)
  })

app.use(
  session({
    secret: "zjr110...",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 10,
    },
  })
)
app.use(express.json())
app.use(cookieParser("testSigedCookie"))
app.use(logging)
app.use(passport.session())
app.use(passport.initialize())

app.use(routes)

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`)
})
