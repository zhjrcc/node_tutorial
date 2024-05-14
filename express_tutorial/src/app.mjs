import express from "express"
import { config } from "dotenv"
import routes from "./routes/index.mjs"
import cookieParser from "cookie-parser"
import session from "express-session"
import { logging } from "./middleware/logging.mjs"
import passport from "passport"
// import "./strategies/local-strategy.mjs"
import "./strategies/discord-strategy.mjs"
import mongoose from "mongoose"
import MongoStore from "connect-mongo"
config()
const app = express()
const PORT = process.env.PORT || 3001

// client_id = 1238668521416822825
// client_secret = YwKj7fgzqvFOi15M0oCepRDzecVEgfl7
// redirect = localhost:3000/api/auth/discord/redirect

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
    // true，保存每一个session
    saveUninitialized: false,
    // true，重新保存每一个session，即使没对session做出修改
    resave: true,
    cookie: {
      maxAge: 60000 * 10,
    },
    store: MongoStore.create({
      client: mongoose.connection.getClient()
    })
  })
)
app.use(express.json())
app.use(cookieParser("testSigedCookie"))
app.use(logging)

app.use(passport.session())
app.use(passport.initialize())

app.use(routes)
app.get('/api/auth/discord', passport.authenticate('discord'))
app.get('/api/auth/discord/redirect', passport.authenticate('discord'), (req, res) => {
  res.send({session: req.session, user: req.user})
})

app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`)
})
