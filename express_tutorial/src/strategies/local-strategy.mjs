import passport from "passport"
import { Strategy } from "passport-local"
import { User } from "../mongoose/schema/user.mjs"
import { comparePassword } from "../utils/helper.mjs"

passport.serializeUser((user, done) => {
  console.log('serializeUser')
  done(null, user.id)
})

// passport.deserializeUser(async (id, done) => {
//   try {
//     console.log('deserializeUser')
//     const findUser = await User.findById(id)
//     if (!findUser) throw new Error("User not found")
//     done(null, findUser)
//   } catch (err) {
//     done(err, null)
//   }
// })

export default passport.use(
  new Strategy(
    { usernameField: "username" },
    async (username, password, done) => {
      try {
        const findUser = await User.findOne({ username })
        // if (!findUser || findUser.password !== password)
        if (!comparePassword(password, findUser.password))
          throw new Error("Unauthorized")
        console.log(findUser)
        done(null, findUser)
      } catch (err) {
        done(err, null)
      }
    }
  )
)
