const getAllProducts = (req, res) => {
  console.log(req.headers.cookie)
  console.log(req.cookies)
  if (req.cookies.region && req.cookies.region === "JP")
    return res.status(200).send([{ id: 1, name: "Snicker", price: "99元" }])
  else
    return res.status(400).send("你所在的地区暂无产品")
}

export { getAllProducts }
