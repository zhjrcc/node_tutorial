import mockUsers from "../utils/constants.mjs"

const login = (req, res) => {
  const {
    body: { username, password },
  } = req
  const findUser = mockUsers.find((user) => user.username === username)
  if (!findUser || findUser.password !== password) return res.sendStatus(401)
  // 将user保存到session中
  req.session.user = findUser
  return res.status(200).send(findUser)
}

const getStatus = (req, res) => {
  // req.session.id === req.sessionID
  req.sessionStore.get(req.session.id, (err, sessionData) => {
    if(err) throw err
    console.log(sessionData)
  })
  return req.session.user
    ? res.status(200).json({
        msg: "已登录",
        user: req.session.user,
      })
    : res.sendStatus(401)
}

export { login, getStatus }
