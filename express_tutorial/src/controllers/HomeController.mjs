export const getHome = (req, res) => {
  console.log(req.session)
  console.log(req.session.id);
  // visited为true才会保存到sessionData中，才会保存到cookie中
  req.session.visited = true;
  res.cookie("user", "zhjrcc", { maxAge: 60000 * 30 })
  res.cookie("signedUser", "zhjrcc", { maxAge: 60000 * 30, signed: true })
  res.status(200).send("<H1>HOME</H1>")
}
