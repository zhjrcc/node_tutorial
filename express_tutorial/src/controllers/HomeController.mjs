export const getHome = (req, res) => {
  res.cookie("user", "zhjrcc", { maxAge: 60000 * 30 })
  res.cookie("signedUser", "zhjrcc", { maxAge: 60000 * 30, signed: true })
  res.status(200).send("<H1>HOME</H1>")
}
