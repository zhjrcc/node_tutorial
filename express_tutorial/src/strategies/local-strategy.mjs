import passport from "passport"
import { Strategy } from "passport-local"
import mockUsers from "../utils/constants.mjs"

passport.serializeUser((user, done) => {
  console.log(user)
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  console.log("id" + id)
  const findUser = mockUsers.find((user) => user.id === id)
  done(null, findUser)
})

export default passport.use(
  new Strategy({ usernameField: "username" }, (username, password, done) => {
    try {
      const findUser = mockUsers.find((user) => user.username === username)
      if (!findUser || findUser.password !== password)
        throw new Error("Unauthorized")
      done(null, findUser)
    } catch (err) {
      done(err, null)
    }
  })
)
