import passport from "passport"
import { Strategy } from "passport-discord"
import { discordUser } from "../mongoose/schema/discord-user.mjs"

passport.serializeUser((user, done) => {
  console.log("serializeUser")
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  try {
    console.log("deserializeUser")
    const findUser = await discordUser.findById(id)
    if (!findUser) throw new Error("User not found")
    done(null, findUser)
  } catch (err) {
    done(err, null)
  }
})

passport.use(
  new Strategy(
    {
      clientID: "1238668521416822825",
      clientSecret: "YwKj7fgzqvFOi15M0oCepRDzecVEgfl7",
      callbackURL: "http://localhost:3000/api/auth/discord/redirect",
      scope: ["identify"],
    },
    async (acessToken, refreshToken, profile, done) => {
      let findUser
      try {
        findUser = await discordUser.findOne({ discordId: profile.id })
      } catch (error) {
        return done(error, null)
      }
      try {
        if (!findUser) {
          const newUser = new discordUser({
            username: profile.username,
            discordId: profile.id,
          })
          const newSaveUser = await newUser.save()
          return done(null, newSaveUser)
        }
        return done(null, findUser)
      } catch (error) {
        return done(error, null)
      } finally {
        console.log(findUser)
      }
    }
  )
)
