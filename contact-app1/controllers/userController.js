const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
// @描述 用户注册处理
// @路由 POST /api/users/register
// @权限 公开
const registerUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body
  if (!username || !email || !password) {
    res.status(400)
    throw new Error("请填写所有字段")
  }
  const userAvailable = await User.findOne({ email })
  if (userAvailable) {
    res.status(400)
    throw new Error("用户已存在")
  }
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = await User.create({
    email,
    username,
    password: hashedPassword,
  })
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email })
  } else {
    res.status(400)
    throw new Error("用户数据错误")
  }
})

// @描述 用户登录
// @路由 POST /api/users/login
// @权限 公开
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    res.status(400)
    throw new Error("请填写邮箱和密码")
  }
  const user = await User.findOne({ email })
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = await jwt.sign(
      {
        user: {
          username: user.username,
          id: user.id,
          email: user.email,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      {
        expiresIn: "30m"
      }
    )
    res.status(200).json({
      accessToken,
    })
  } else {
    res.status(401)
    throw new Error('邮箱或者密码错误')
  }
})

// @描述 显示当前用户信息
// @路由 GET /api/users/currentUser
// @权限 私有
const currentUser = asyncHandler(async (req, res, next) => {
  res.status(200).json(req.user)
})

module.exports = {
  registerUser,
  loginUser,
  currentUser,
}
