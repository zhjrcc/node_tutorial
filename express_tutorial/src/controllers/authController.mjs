import mockUsers from "../utils/constants.mjs";

export const getAuth = (req, res) => {
  const {body: {username, password}} = req;
  const findUser = mockUsers.find((user) => { user.username === username})
  if (!findUser || findUser.password !== password) return res.sendStatus(401)
  req.session.user = findUser;
  return res.status(200).send(findUser)
}
