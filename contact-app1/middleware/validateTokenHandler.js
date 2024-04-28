const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

const validateToken = asyncHandler(async (req, res, next) => {
  try {
    let token = ""
    let authHeader = req.headers.Authorization || req.headers.authorization
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1]
      jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (err, decode) => {
        if (err) {
          res.status(401)
          throw new Error("用户未授权")
        }
        req.user = decode.user
        next()
      })
    } else {
      res.status(401)
      throw new Error("用户未授权")
    }
  } catch (err) {
    throw err
  }
})

module.exports = validateToken
