import mockUsers from "../utils/constants.mjs"

const login = (req, res) => {
  // req.session.visited = true;
  return res.status(200).send(req.user)
}

const getStatus = (req, res) => {
  return req.user ? res.send(req.user) : res.sendStatus(401)
}
const logout = (req, res) => {
  if (!req.user) return res.sendStatus(401)
  req.logout((err) => {
    if (err) return res.sendStatus(400)
    return res.sendStatus(200)
  })
}

export { login, getStatus, logout }
