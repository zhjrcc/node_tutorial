const getAllProducts = (req, res) => {
  console.log(req.headers.cookie)
  console.log(req.cookies)
  console.log(req.signedCookies)
  if (req.signedCookies.signedUser && req.signedCookies.signedUser === "zhjrcc")
    return res.status(200).send([{ id: 1, name: "Snicker", price: "99元" }])
  else
    return res.status(403).send("请登录后再查看")
}

export { getAllProducts }
